import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeReducer";
import expenseReducer from './expense'
import authReducer from './auth'

const store=configureStore({
    reducer:{auth:authReducer,expense:expenseReducer,darkMode:darkModeReducer}
})
export default store;