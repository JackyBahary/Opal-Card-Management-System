import NavBar from "./components/NavBar";
import LinkCard from "./pages/LinkCard";
import LoginRegister from "./pages/LoginRegister";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useContext, createContext } from "react";

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
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path = '/'/>
        <Route path = '/add-card' element = {<LinkCard/>} />
        <Route path = '/login-register' element = {
          <LoginRegister Login={Login} Register={Register} />
        } />
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
