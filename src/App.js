import React from 'react';
import { Route,Routes } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import EmailVerification from './components/pages/EmailVerification';
import ForgotPassword from './components/pages/ForgotPassword';
import HomePage from './components/pages/HomePage';
import { useSelector } from 'react-redux';


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  return <>
  <Routes>
  {<Route path='/' exact element={<AuthForm />}></Route>}
  {isLoggedIn && <Route path='/home' exact element={<HomePage/>}></Route>}
  {isLoggedIn && <Route path='/emailverification' exact element={<EmailVerification/>}></Route>}
  {isLoggedIn && <Route path='/forgotpassword' exact element={<ForgotPassword/>}></Route>}
  </Routes>
  </>
}

export default App;
