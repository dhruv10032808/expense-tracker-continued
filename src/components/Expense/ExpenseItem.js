import React,{useState,useEffect} from "react";
import { useSelector } from 'react-redux';
import ExpenseItemShow from "./ExpenseItemShow";
const ExpenseItem=()=>{
    const [premiumBtn, setPremiumBtn] = useState(false);
    const listOfItems = useSelector(state=>state.expense.expenseItems)
    const amount = useSelector(state=>state.expense.amount)
    useEffect(() => {
     if(amount>10000){
       setPremiumBtn(true)
     }
    }, [amount]);
const expenses=listOfItems.map((expense)=>{
    return (<ExpenseItemShow amount={expense.amount} description={expense.description} category={expense.category} id={expense.id} />)
})
return(
    <>
    <ul>
        {expenses}
      <p>Amount Spent: {amount}</p>
      {premiumBtn && <button>ActivatePremium</button>}
    </ul>
    </>
)
}
export default ExpenseItem;