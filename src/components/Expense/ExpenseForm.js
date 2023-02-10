import React, { useRef ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense";
import classes from "./ExpenseForm.module.css";
import ExpenseItem from "./ExpenseItem";

const ExpenseForm = () => {
  const dispatch=useDispatch();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  async function getExpenseFromDB(){
    try{
    const response=await fetch('https://expense-tracker-812e8-default-rtdb.firebaseio.com/expenses.json');
    if(!response.ok){
      throw new Error('something went wrong')
    }
    const data=await response.json();
    let cartItems=[];
    let amount=0;
    for(const key in data){
        amount=amount+parseInt(data[key].amount,10)
        cartItems.push({
            amount:data[key].amount,
            description:data[key].description,
            category:data[key].category,
            id:key
        })
    }
    const expenseData={
      data:cartItems,
      amount:amount
    }
    dispatch(expenseActions.addItems(expenseData));
}
catch(error){
    console.log(error)
}
}
useEffect(()=>{
   getExpenseFromDB()
},[])
  async function addExpenseToDB(item){
    try{
    const response =await fetch('https://expense-tracker-812e8-default-rtdb.firebaseio.com/expenses.json',{
        method:'POST',
        body:JSON.stringify(item),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.error.message)
    }
    console.log('added successfully')
    console.log(data);
    getExpenseFromDB()
}
catch(err){
   alert(err);
}
}
  const expenseSubmitHandler = async (event) => {
    event.preventDefault();
    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    addExpenseToDB(expense);
  };


  return (
    <>
      <form onSubmit={expenseSubmitHandler} className={classes.form}>
        <div>
          <label>Amount</label>
          <input type="number" ref={amountRef} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" ref={descriptionRef} />
        </div>
        <div>
          <label>Category</label>
          <select ref={categoryRef}>
            <option value="food">Food</option>
            <option value="travelling">Travelling</option>
            <option value="shopping">Shopping</option>
            <option value="grocery">Grocery</option>
            <option value="medicine">Medicine</option>
          </select>
        </div>
        <button type="submit" style={{textAlign:'center'}}>Add Expense</button>
        <ExpenseItem />
      </form>
    </>
  );
};

export default ExpenseForm;