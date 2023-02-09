import React, { useContext } from 'react';
import { Route,Routes } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import EmailVerification from './components/pages/EmailVerification';
import ForgotPassword from './components/pages/ForgotPassword';
import HomePage from './components/pages/HomePage';
import AuthContext from './store/AuthContextProvider';


function App() {
  const authCtx=useContext(AuthContext);
  return <>
  <Routes>
  {!authCtx.isLoggedIn && <Route path='/' exact element={<AuthForm />}></Route>}
  {authCtx.isLoggedIn && <Route path='/home' exact element={<HomePage/>}></Route>}
  {authCtx.isLoggedIn && <Route path='/emailverification' exact element={<EmailVerification/>}></Route>}
  {authCtx.isLoggedIn && <Route path='/forgotpassword' exact element={<ForgotPassword/>}></Route>}
  </Routes>
  </>
}

export default App;
