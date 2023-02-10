import { createSlice } from "@reduxjs/toolkit";

const initialToken=localStorage.getItem('token')
let isLoggedIn=!!initialToken;
const initialEmail=localStorage.getItem('email')
const initialAuthState={token:initialToken,isLoggedin:isLoggedIn,email:initialEmail}
const authSlice=createSlice({
   name:'authentication',
   initialState:initialAuthState,
   reducers:{
     login(state,action){
       state.token=action.payload
     },
     logout(state){
       state.token=null;
       state.email=null;
     }
   }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;
