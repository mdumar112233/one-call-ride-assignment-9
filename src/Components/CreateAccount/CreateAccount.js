import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import googleIcon from '../../images/googleIcon.png';
import './Login.css';
import { UserContext } from '../../App';
import { createAccountAndLogin, initializeFirebase } from './LoginManager';
import { Redirect, useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';


const CreateAccount = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignUp: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })




    initializeFirebase();


    const handleChange = e => {
        let  isInputValid;
        if(e.target.name === 'email'){
            isInputValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if(e.target.name === 'password'){
            isInputValid = e.target.value.length > 6;
        }
        if(isInputValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    
    const handleSubmit = e => {
        if(user.email && user.password){
            createAccountAndLogin(user.name,user.email, user.password)
            .then(res => {
                setUser(res);
            })
        }
        e.preventDefault();
    }

    const handleSignIn = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          const {displayName, email} = user;
          const signInUser = {name: displayName, email}; 
          setLoggedInUser(signInUser);
          history.replace(from);
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    }
    return (
        <div>
            <div className="login-section text-center">
                <h2 className='mb-4'>Create Account</h2>
                <form onSubmit={handleSubmit}>
                <input onBlur={handleChange} name='email' type="text" placeholder='your email' required/><br/><br/>
                <input onBlur={handleChange}  type="password" name='password' placeholder='your password' required /><br/><br/>
                <p style={{color:'red'}}>{user.error}</p>
                {
                    user.success && <p style={{color:'green'}}>user create successfully</p>
                }
                <input className='mb-4 create-log-btn' type="submit" value="Sign up"/> <div className='ml-3'>Already have an account?<Link to="/login">login</Link></div>
            </form>
            {
                user.isSignUp && <Redirect to='/login'/>
            }
                <div className="signIn mt-3">
                    <span> <img src={googleIcon} alt=""/></span><input className='login-btn' onClick={handleSignIn} type="button" value='Login with Google'/>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;