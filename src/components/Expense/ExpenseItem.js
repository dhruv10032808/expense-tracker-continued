import React,{useContext} from "react";
import CartContext from "../../store/cart-context";
const ExpenseItem=()=>{
const cartCtx=useContext(CartContext)
const expenses=cartCtx.listOfItems.map((expense)=>{
    return (<li>
        Rs.{expense.amount}-{expense.description}-{expense.category}
    </li>)
})
console.log(cartCtx.listOfItems)
return(
    <>
    <ul>
        {expenses}
        {cartCtx.totalAmount}
    </ul>
    </>
)
}
export default ExpenseItem;