import React, { useContext, useRef,useEffect, useState } from "react";
import AuthContext from "../../store/AuthContextProvider";
const UserProfileForm=()=>{
    const[preFillData,setPreFillData]=useState([])
    const authCtx=useContext(AuthContext);
   const nameInputRef= useRef('');
   const photoUrlRef=useRef('');
   const fillProfile=()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBHg6kh04-hUMuA19EUhRG4RuusNO4taTU',{
        method:'POST',
        body:JSON.stringify({
            idToken:authCtx.idToken
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((res)=>{
        if(res.ok){
            return res.json().then((data)=>{
                setPreFillData(data.users[0])
                console.log(data.users[0]);
            })
        }
    })
   }
   useEffect(()=>{
    fillProfile();
   },[])
   const submitHandler=(event)=>{
    event.preventDefault();
    console.log(authCtx.idToken)
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBHg6kh04-hUMuA19EUhRG4RuusNO4taTU',{
        method:'POST',
        body:JSON.stringify({
          idToken:authCtx.idToken,
          displayName: nameInputRef.current.value,
          photoUrl: photoUrlRef.current.value,
          returnSecureToken: true,
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((res)=>{
        if(res.ok){
            return res.json().then((data)=>{
                console.log(data)
                alert('Profile Updated')
            })
        }else{
            return res.json().then((data)=>{
                alert('Could not update profile')
                console.log(authCtx.idToken)
            })
        }
    })
   }
   return (<div>
    <h1>Contact Details</h1>
    <form onSubmit={submitHandler}>
    <label>Full Name:</label>
    <input type="text" ref={nameInputRef} defaultValue={preFillData.displayName}></input>
    <label>Profile Photo URL:</label>
    <input type="text" ref={photoUrlRef} defaultValue={preFillData.photoUrl}></input>
    <button>Update</button>
    </form>
   </div>)
}
export default UserProfileForm;