import React, {useState} from 'react';

const AuthContext=React.createContext({
  idToken:'',
  isLoggedIn:false,
  login:(token)=>{},
  logout:()=>{}
})

export const AuthContextProvider = (props) => {
  const initialToken=localStorage.getItem('token')
    const [idToken, setIdToken] = useState(initialToken);
    const initialEmail=localStorage.getItem('email')
    const [email,setEmail]=useState(initialEmail);
    let isLoggedIn=!!idToken;
    const loginHandler = (token,email)=>{
        setIdToken(token);
        localStorage.setItem('token',token)
        setEmail(email);
        localStorage.setItem('email',email);
    }
    const logoutHandler=()=>{
      setIdToken(null);
      localStorage.removeItem("token");
      setEmail(null);
      localStorage.removeItem('email');
    }
    const contextValue={
        idToken: idToken,
        isLoggedIn: isLoggedIn,
        email:email,
        login: loginHandler,
        logout:logoutHandler
    }
  return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;