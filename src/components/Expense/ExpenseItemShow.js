import React from "react";

const ExpenseItemShow=(props)=>{
    const deleteExpenseHandler=(e)=>{
        e.preventDefault();
        fetch(`https://expense-tracker-812e8-default-rtdb.firebaseio.com/expenses/${props.id}.json`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            return res.json().then((data)=>{
                console.log("Expense successfuly deleted");
            })
        })
    }
    const editExpenseHandler=(e)=>{
        e.preventDefault();
    }
    return <li>
    {props.amount}-{props.description}-{props.category}
    <button onClick={deleteExpenseHandler}>Delete Expense</button>
    <button onClick={editExpenseHandler}>Edit Expense</button>
    </li>
}
export default ExpenseItemShow;