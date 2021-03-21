import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);


const CreateAccount = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

    const handleChange = e => {
      let isFormValid;
     if(e.target.name === 'email'){
       isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
     }
     if(e.target.name === 'password'){
       const isPasswordValid = e.target.value.length > 6;
       const passwordHasNumber = /\d{1}/.test(e.target.value)
       isFormValid = isPasswordValid && passwordHasNumber;
     }
     if(isFormValid){
      const userInfo = {...user};
      userInfo[e.target.name] = e.target.value;
      setUser(userInfo);
     }

    }
    const submitHandle = e => {
      if(newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const userInfo = {...user};
          userInfo.error = '';
          userInfo.success = true;
          setUser(userInfo);
          userNameUpdate(user.name);
          console.log(res.user);
        })
        .catch(error => {
          const userInfo = {...user};
          userInfo.error = error.message;
          userInfo.success = false;
          setUser(userInfo);
        });
      }



      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            const userInfo = {...user};
            userInfo.error = '';
            userInfo.success = true;
            setUser(userInfo);
          })
          .catch((error) => {
            const userInfo = {...user};
            userInfo.error = error.message;
            userInfo.success = false;
            setUser(userInfo);
          });
      }
      e.preventDefault();
    };
    
    const userNameUpdate = name => {
      const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
        }).then(() => {

        }).catch(error => {
          const userInfo = {...user};
          userInfo.error = error.message;
          userInfo.success = false;
          setUser(userInfo);
        });

    }
       
      return (
        <div>
            <form onSubmit={submitHandle}>
              {
                newUser && <input name='name' onBlur={handleChange} type="text" placeholder='Enter your name' required /> 
              }
              <br/><br/>
              <input type="email" name='email' onBlur={handleChange} placeholder='Enter your email' required /><br/><br/>
              <input type="password" name='password' onBlur={handleChange} placeholder='Enter your password' required /><br/><br/>

              <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
          </form>
          <p>Already  have an account?</p><input type="checkbox" onChange={() => setNewUser(!newUser)} name='newUser' />
          <label htmlFor="newUser">new user sign up</label>
          <p style={{color: 'red'}}>{user.error}</p>
          {
            user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</p>
          }
        </div>
    )
};

export default CreateAccount;