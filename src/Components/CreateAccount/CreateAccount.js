import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useForm } from 'react-hook-form';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);


const CreateAccount = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
       
      return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="example" ref={register} />
        <br/> <br/>
      <input name="exampleRequired" ref={register({ required: true })} /> <br/><br/>
      <input type='password' name="example" ref={register} />

      {errors.exampleRequired && <span>This field is required</span>}
      <br/>
      <br/>
      {/* <input type="submit"/> */}
      <button type="submit">Create account</button>
    </form>
      )
};

export default CreateAccount;