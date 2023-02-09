import React, { useCallback, useEffect, useState } from "react";
const CartContext=React.createContext({
    listOfItems:[],
    totalAmount:0,
    addItems:(item)=>{},
    removeItems: (id)=>{},
})

export const CartContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState([])
    const [totalAmount,setTotalAmount]=useState(0)

    async function getItemHandler(){
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
                category:data[key].category
            })
        }
        setTotalAmount(amount)
        setCartItems(cartItems)
    }
    catch(error){
        console.log(error)
    }
    }
    useEffect(()=>{
       return getItemHandler()
    },[])
    async function addItemToCartHandler(item){
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
        getItemHandler()
    }
    catch(err){
       alert(err);
    }
}
    const removeItemFromCartHandler=()=>{}

    const cart_context={
    listOfItems: cartItems,
    totalAmount: totalAmount,
    addItems: addItemToCartHandler,
    removeItems: removeItemFromCartHandler
    }
    return(<CartContext.Provider value={cart_context}>
        {props.children}
    </CartContext.Provider>)
}
export default CartContext;