import React, {  useState } from "react";
import {Link} from 'react-router-dom';
import UserProfileForm from "./UserProfileForm";
import classes from './Home.module.css'
import { useDispatch } from "react-redux";
import ExpenseForm from "../Expense/ExpenseForm";
import { authActions } from "../../store/auth";
const HomePage=()=>{
const dispatch=useDispatch();
const[showForm,setShowForm]=useState(false)
const showFormHandler=()=>{
    setShowForm(true);
}
const logoutHandler=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("email")
    dispatch(authActions.logout())
}
return(<><div className={classes.section}><h1>Welcome to Expense Tracker</h1>
{<Link to='/emailverification'><button>Verify Email id</button></Link>}<br></br>
<span className={classes.profile}>
<span>Your profile is incomplete</span>
<button onClick={showFormHandler}>Complete Now</button>
</span>
<Link to='/'><button onClick={logoutHandler}>Logout</button></Link>
{showForm && <UserProfileForm/>}
</div>
<ExpenseForm/>
</>)
}
export default HomePage;