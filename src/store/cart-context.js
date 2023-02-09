import React, { useState } from "react";
const CartContext=React.createContext({
    listOfItems:[],
    totalAmount:0,
    totalQuantity: 0,
    addItems:(item)=>{},
    removeItems: (id)=>{},
})

export const CartContextProvider=(props)=>{
    const [cartItems,setCartItem]=useState([])
    const [totalAmount,setTotalAmount]=useState(0)
    const [totalQuantity,setTotalQuantity]=useState(0)

    const addItemToCartHandler=(item)=>{
        setTotalAmount(cart_context.totalAmount+parseInt(`${item.amount}`,10));
        setTotalQuantity((prev)=>{return prev+1});
        setCartItem((prev)=>{
            return [...prev,item]
        })
    }
    const removeItemFromCartHandler=()=>{}

    const cart_context={
    listOfItems: cartItems,
    totalAmount: totalAmount,
    totalQuantity: totalQuantity,
    addItems: addItemToCartHandler,
    removeItems: removeItemFromCartHandler
    }
    return(<CartContext.Provider value={cart_context}>
        {props.children}
    </CartContext.Provider>)
}
export default CartContext;