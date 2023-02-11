import React,{useState,useEffect} from "react";
import { useSelector,useDispatch } from 'react-redux';
import ExpenseItemShow from "./ExpenseItemShow";
import { expenseActions } from "../../store/expense";
const ExpenseItem=()=>{
  const dispatch=useDispatch();
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
const activatePremiumHandler=(event)=>{
  event.preventDefault();
  dispatch(expenseActions.activatePremium());
}
return(
    <>
    <ul>
        {expenses}
      <p>Amount Spent: {amount}</p>
      {premiumBtn && <button onClick={activatePremiumHandler}>ActivatePremium</button>}
    </ul>
    </>
)
}
export default ExpenseItem;