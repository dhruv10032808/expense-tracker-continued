import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={expenseItems:[],amount:0}
const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
       addItems(state,action){
          state.expenseItems=action.payload.data
          state.amount=action.payload.amount
       }
    }
})
export const expenseActions=expenseSlice.actions;
export default expenseSlice.reducer;
