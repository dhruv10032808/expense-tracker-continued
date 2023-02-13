import React, { useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { authActions } from '../../store/auth';
import classes from './AuthForm.module.css'
const AuthForm=()=>{
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const[isLogin,setIsLogin]=useState(true);
   const emailInputRef=useRef('');
   const passwordInputRef=useRef('');
   const confirmPasswordInputRef=useRef('');
   
   const authHandler=()=>{
    setIsLogin((prev)=>!prev);
   }
   const submitHandler=(event)=>{
      event.preventDefault();
      if(!isLogin){
      if(passwordInputRef.current.value!==confirmPasswordInputRef.current.value){
        alert('Passwords do not match');
        passwordInputRef.current.value='';
        confirmPasswordInputRef.current.value='';
       }
    }
       let url;
       if(!isLogin){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHg6kh04-hUMuA19EUhRG4RuusNO4taTU'
       }else{
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHg6kh04-hUMuA19EUhRG4RuusNO4taTU'
       }
      fetch(url,{
        method:'POST',
        body:JSON.stringify({
            email:emailInputRef.current.value,
            password:passwordInputRef.current.value,
            returnSecureToken:true
        }),
        headers: {
            "Content-Type": "application/json",
          }
      }).then((res)=>{
        if(res.ok){
            return res.json().then((data)=>{
                console.log(data);
                if (isLogin) {
                    dispatch(authActions.login({
                       token: data.idToken,
                       email:emailInputRef.current.value
                    }))
                    localStorage.setItem("token", data.idToken);
                    localStorage.setItem("email", emailInputRef.current.value)
                    navigate('/home');
                    return;
                  }
                  setIsLogin(true);
            })
        }else{
            return res.json().then((data)=>{
                alert(data.error.message);
            })
        }
      })
   }
   return (<form onSubmit={submitHandler} className={classes.auth}>
    <h1>{isLogin?'Login':'Sign up'}</h1>
    <div className={classes.control}>
   <label htmlFor="email">Email</label>
   <input type="email" id="email" ref={emailInputRef} required></input></div>
   <div className={classes.control}>
   <label htmlFor="password">Password</label>
   <input type="password" id="password" ref={passwordInputRef} required></input></div>
   {!isLogin && <div className={classes.control}>
   <label htmlFor="confirmPassword">Confirm Password</label>
   <input type="password" id="confirmPassword" ref={confirmPasswordInputRef} required></input></div>}
   <button type="submit" className={classes.actions}>{isLogin?'Login':'Sign up'}</button>
   <button type="submit" onClick={authHandler}>{!isLogin?'Have an account?Login':"Don't have an account?Sign up"}</button><br></br>
   {isLogin && <Link to='/forgotpassword'><span>Forgot Password?</span></Link>}
   </form>)
}
export default AuthForm;