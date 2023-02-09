import React, { useContext, useState } from "react";
import {Link} from 'react-router-dom';
import UserProfileForm from "./UserProfileForm";
import classes from './Home.module.css'
import AuthContext from "../../store/AuthContextProvider";
const HomePage=()=>{
const authCtx=useContext(AuthContext)
const[showForm,setShowForm]=useState(false)
const showFormHandler=()=>{
    setShowForm(true);
}
const logoutHandler=()=>{
    authCtx.logout();
}
return(<div className={classes.section}><h1>Welcome to Expense Tracker</h1>
{<Link to='/emailverification'><button>Verify Email id</button></Link>}<br></br>
<span className={classes.profile}>
<span>Your profile is incomplete</span>
<button onClick={showFormHandler}>Complete Now</button>
</span>
<Link to='/'><button onClick={logoutHandler}>Logout</button></Link>
{showForm && <UserProfileForm/>}
</div>)
}
export default HomePage;