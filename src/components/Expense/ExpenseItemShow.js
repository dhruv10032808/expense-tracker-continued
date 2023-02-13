import React from "react";
import { useSelector } from "react-redux";
const ExpenseItemShow=(props)=>{
    const email=useSelector((state)=>state.auth.email)
    const emailIdString = email.toString();
    const emailId=emailIdString.replace(/[@.]/gi, '')
    const deleteExpenseHandler=(event)=>{
        event.preventDefault();
        fetch(`https://expense-tracker-812e8-default-rtdb.firebaseio.com/${emailId}/${props.id}.json`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            return res.json().then((data)=>{
                console.log("Expense successfuly deleted");
                props.getExpense();
            })
        })
    }
    const editExpenseHandler=(e)=>{
        e.preventDefault();
        fetch(`https://expense-tracker-812e8-default-rtdb.firebaseio.com/${emailId}/${props.id}.json`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            return res.json().then((data)=>{
                console.log("Expense successfuly deleted");
                document.getElementById('amount').value=props.amount
                document.getElementById('description').value=props.description
                document.getElementById('category').value=props.category
                props.getExpense();
            })
        })
    }
    return <li>
    {props.amount}-{props.description}-{props.category}
    <button onClick={deleteExpenseHandler}>Delete Expense</button>
    <button onClick={editExpenseHandler}>Edit Expense</button>
    </li>
}
export default ExpenseItemShow;