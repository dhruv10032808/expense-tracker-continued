import React from "react";
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";
const EmailVerification=()=>{
    const token= useSelector((state) => state.auth.token);
    const navigate=useNavigate()
    const verifyEmailHandler=()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBHg6kh04-hUMuA19EUhRG4RuusNO4taTU',{
            method:'POST',
            body:JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken:token
            }),
            headers:{
                'Content-Type':"applicaton/json"
            }
        }).then((res)=>{
            if(res.ok){
                return res.json().then((data)=>{
                    console.log(data);
                })
            }else{
                return res.json().then((data)=>{
                    console.log(data);
                })
            }
        })
    }
    verifyEmailHandler();
    const proceedHandler=(e)=>{
        e.preventDefault();
        navigate('/home');
    }
    return( <div>
        <h1>Email Confirmation</h1>
        <h3>An email with the account confirmation has been sent to your email</h3>
        <h3>Please confirm it and come back  to proceed!</h3>
        <button onClick={proceedHandler}>Proceed</button>
      </div>)
}
export default EmailVerification;