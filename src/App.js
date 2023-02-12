import React,{useEffect} from 'react';
import { Route,Routes } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import AuthForm from './components/Auth/AuthForm';
import EmailVerification from './components/pages/EmailVerification';
import ForgotPassword from './components/pages/ForgotPassword';
import HomePage from './components/pages/HomePage';
import { useSelector,useDispatch } from 'react-redux';
import {handledarkMode} from './store/darkModeAction'


function App() {
  const expenses=useSelector(state=>state.expense.expenseItems)
  const activatePremium = useSelector(state=>state.expense.activatePremiumState)
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode
  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
  };
  useEffect(() => {
    //changing color of body with darkmode in useEffect
    document.body.style.backgroundColor = isdarkMode ? "#292c35" : "#fff";
  }, [isdarkMode]);
  const headers=[
    {label:'Amount', key:'amount'},
    {label:'Description', key:'description'},
    {label:'Category', key:'category'}
  ]
  const csvExpense={
    filename:'Expenses.csv',
    headers: headers,
    data: expenses
  }
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn=!!token;
  return <>
  <Routes>
  {<Route path='/' exact element={<AuthForm />}></Route>}
  {isLoggedIn && <Route path='/home' exact element={<HomePage/>}></Route>}
  {isLoggedIn && <Route path='/emailverification' exact element={<EmailVerification/>}></Route>}
  {<Route path='/forgotpassword' exact element={<ForgotPassword/>}></Route>}
  </Routes>
  {activatePremium && 
      <div id="darkmode">
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          onChange={switchDarkMode}
          checked={isdarkMode}
        />
        <CSVLink {...csvExpense}>Download File</CSVLink>        
      </div>
}
  </>
}

export default App;
