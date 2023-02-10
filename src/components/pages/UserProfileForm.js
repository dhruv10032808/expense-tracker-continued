import React, { useRef,useEffect, useState } from "react";
import { useSelector } from "react-redux";
const UserProfileForm=()=>{
    const[preFillData,setPreFillData]=useState([])
   const nameInputRef= useRef('');
   const photoUrlRef=useRef('');
   const token = useSelector((state) => state.auth.token);
   const fillProfile=()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBHg6kh04-hUMuA19EUhRG4RuusNO4taTU',{
        method:'POST',
        body:JSON.stringify({
            idToken:token
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
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBHg6kh04-hUMuA19EUhRG4RuusNO4taTU',{
        method:'POST',
        body:JSON.stringify({
          idToken:token,
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