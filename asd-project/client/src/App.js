import NavBar from "./components/NavBar";
import LinkCard from "./pages/LinkCard";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useContext, createContext } from "react";
import ProtectRoute from "./components/ProtectedRoute"

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

const ProtectedLinkCard = ProtectRoute(LinkCard);
const ProtectedHome = ProtectRoute(Home);

function App() {
  const [auth, setAuth] = useState();
  
  async function Login(email, password) {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { authenticated } = await response.json();
    if (authenticated) {
      setAuth(email);
    }
    return authenticated;
  }

  async function Register(email, password) {
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path = '/' element = {
            <LoginRegister Login={Login} Register={Register} />
          } />
          <Route path = '/add-card' element = {<ProtectedLinkCard/>} />
          <Route path = '/home' element = {<ProtectedHome/>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
    
  );
}

export { useAuth };
export default App;
