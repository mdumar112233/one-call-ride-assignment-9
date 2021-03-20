import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useForm } from 'react-hook-form';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);


const CreateAccount = () => {
    // const { register, handleSubmit, watch, errors } = useForm();

    const handleChange = e => {
     console.log(e.target.name, e.target.value); 
    }
    const submitHandle = () => {

    };
       
      return (
    // <form onSubmit={submitHandle}>
    //     <p>hello</p>
    //     <br/> <br/>
    //   <input onBlur={handleChange} type='email' name="exampleRequired" ref={register({ required: true })} /> <br/><br/>
    //   <input onBlur={handleChange} type='password' name="example" ref={register} />

    //   {errors.exampleRequired && <span>This field is required</span>}
    //   <br/>
    //   <br/>
    //   <input type="submit"/>
    // </form>
    <form onSubmit={submitHandle}>
      <input type="email" name='email' onBlur={handleChange} placeholder='enter your email' required /><br/><br/>
      <input type="password" name='password' onBlur={handleChange} placeholder='enter your email' required /><br/><br/>
      <input type="submit" value='submit' />
    </form>
      
    )
};

export default CreateAccount;