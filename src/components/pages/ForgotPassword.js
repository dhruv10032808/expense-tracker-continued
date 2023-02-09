import React, { useRef,useState } from "react";
import {useNavigate} from 'react-router-dom'
import classes from './ForgotPassword.module.css'
const ForgotPassword=()=>{
   const[isLoading,setIsLoading]=useState(false);
   const navigate=useNavigate();
   const emailInputRef=useRef('')
   const submitHandler=(event)=>{
     event.preventDefault();
     setIsLoading(true);
     fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBHg6kh04-hUMuA19EUhRG4RuusNO4taTU',{
      method:'POST',
      body:JSON.stringify({
         requestType:"PASSWORD_RESET",
         email:emailInputRef.current.value
      }),
      headers:{
         'Content-Type':'application/json'
      }
     }).then((res)=>{
      setIsLoading(false);
      if(res.ok){
         return res.json().then((data)=>{
            console.log(data);
            alert("Link has been sent to your mail. Open to reset password");
            navigate('/')
         })
      }else{
         return res.json().then((data)=>{
            console.log(data);
         })
      }
     })
   }
   return (
   <form className={classes.auth} onSubmit={submitHandler}>
      <h1>Reset password</h1>
   <div>
    <label htmlFor='email'>Enter the email with which you have registered</label>
    <input type='email' id='email' placeholder="email" ref={emailInputRef}></input>
   </div>
   <button type='submit'>Send Link</button>
   {isLoading && <p>Sending request....</p>}
   </form>)
}
export default ForgotPassword;