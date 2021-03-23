import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './CreateAccount.css';
import { Link } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);


const CreateAccount = () => {
  const [newUser, setNewUser] = useState(true);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

    const[loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn = () => {
      firebase.auth().signInWithPopup(provider)
      .then(res  => {
        const {email, displayName}  = res.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email
        }
        setLoggedInUser(signInUser);
        history.replace(from);
        setUser(signInUser);
      }).catch((error) => {
    
        const userInfo = {...user};
        userInfo.error = error.message;
        userInfo.error = error.email;
        userInfo.success = false;
        setUser(userInfo);
      });
    }


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
      if(!newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const userInfo = {...user};
          userInfo.error = '';
          userInfo.success = true;
          setUser(userInfo);
          userNameUpdate(res.user.name);
          console.log(res.user);
        })
        .catch(error => {
          const userInfo = {...user};
          userInfo.error = error.message;
          userInfo.success = false;
          setUser(userInfo);
        });
      }



      if(newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            const userInfo = {...user};
            userInfo.error = '';
            userInfo.success = true;
            setUser(userInfo);
            setLoggedInUser(userInfo);
            history.replace(from);
            console.log(res.user);
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
        }).then(res  => {
          
        }).catch(error => {
          const userInfo = {...user};
          userInfo.error = error.message;
          userInfo.success = false;
          setUser(userInfo);
        });

    }
       
      return (
        <div>
          <div className="sub-container">
            <div className="create-account">
            <h4>{newUser ? 'Create account': 'log in' }</h4><br/>
          <form onSubmit={submitHandle}>
              {
                newUser &&  <input name='name' onBlur={handleChange} type="text" placeholder='Enter your name' required/>
              }
              <br/><br/>
              <input type="email" name='email' onBlur={handleChange} placeholder='Enter your email' required /><br/><br/>
              <input type="password" name='password' onBlur={handleChange} placeholder='Enter your password' required /><br/>
              <p style={{color: 'red'}}>{user.error}</p>

              <input className='create-log-btn' type="submit" onClick={() => setNewUser(!newUser)} value={newUser ? 'Create an account' : 'log in'} />
          </form>
          <br/>
              <div className='account-btn'>
                <div><p>Already  have an account?</p></div>
                  <Link><a  onClick={() => setNewUser(!newUser)}  href="">{!newUser ? 'Create an account': 'log in'}</a></Link>
              </div>
          
          {
            user.success && <p style={{color: 'green'}}>User {!newUser ? 'created' : 'Logged In'} successfully</p>
          }
            <br/>
          {
            !user.isSignIn && <button className='google-btn' onClick={handleSignIn}>Create an account with google</button>
          }


               </div>
            </div>
        </div>
    )
};

export default CreateAccount;