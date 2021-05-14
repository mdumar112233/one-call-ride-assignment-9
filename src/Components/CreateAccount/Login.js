import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import { initializeFirebase } from './LoginManager';
import './Login.css';
import { Link } from 'react-router-dom';
import googleIcon from '../../images/googleIcon.png';



const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };


    initializeFirebase();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });



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


    const handleSubmit = (e) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setLoggedInUser(newUserInfo);
                history.replace(from);
                setUser(newUserInfo);
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
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
        <div className='login-container text-center'>
            <div>
            <h2 className='text-center mb-4'>Login</h2>
            <form onSubmit={handleSubmit}>
                <input onBlur={handleChange} name='email' type="text" placeholder='your email' required/><br/><br/>
                <input onBlur={handleChange}  type="password" name='password' placeholder='your password' required /><br/><br/>
                <p style={{color:'red'}}>{user.error}</p>
                {
                    user.success && <p style={{color:'green'}}>user login successfully</p>
                }
                <input className='me-5 mb-4 create-log-btn' type="submit" value="login"/> <div>Don't have an account?<Link to='/createAccount'>Sign up</Link></div>
            </form>
            <div className="signIn login-user mt-3">
                    <span> <img src={googleIcon} alt=""/></span><input className='login-btn' onClick={handleSignIn} type="button" value='Login with Google'/>
            </div>
            </div>
        </div>
    );
};

export default Login;