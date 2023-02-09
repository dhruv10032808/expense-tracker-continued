import React, { useContext, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import AuthContext from '../../store/AuthContextProvider';
import classes from './AuthForm.module.css'
const AuthForm=()=>{
    const authCtx=useContext(AuthContext);
    const initialToken=localStorage.getItem('token')
    const navigate=useNavigate();
    const [token,setToken]=useState(initialToken)
    const[isLogin,setIsLogin]=useState(true);
   const emailInputRef=useRef('');
   const passwordInputRef=useRef('');
   const confirmPasswordInputRef=useRef('');
   if(token){
    navigate('/home')
   }
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
                setIsLogin(true);
                setToken(data.idToken);
                localStorage.setItem('token',data.idToken)
                authCtx.login(data.idToken,data.email);
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
   <Link to='/forgotpassword'><span>Forgot Password?</span></Link>
   </form>)
}
export default AuthForm;