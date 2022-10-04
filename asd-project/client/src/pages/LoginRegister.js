import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"

function LoginRegister({ Login, AdminLogin, Register }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function HandleLogin() {
    const success = await Login(email, password);
    if (!success) {
      setErrorMessage("Invalid email address or password.");
    }
    else {
      navigate('/home');
    }
  }

  async function HandleAdminLogin() {
    const success = await AdminLogin(email, password);
    if (!success) {
      setErrorMessage("Invalid email address or password.");
    }
    else {
      navigate('/home');
    }
  }

  // Handles the register button click.
  async function HandleRegister() {
    const success = await Register(email, password);
    if (!success) {
      setErrorMessage("Error. Unable to register the account.");
    }
  }

  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
      <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
        Login 
      </p>
      {errorMessage && (
        <div className="rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 b-2 text-white font-bold">{errorMessage}</div>
      )}
      <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
        <label className="text-white text-2xl p-8 w-100">Email</label>
        <input className="rounded-l text-2xl w-max" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className=" justify-self-center w-full grid-cols-2 pb-8">
        <label className="text-white text-2xl p-8 w-100">Password</label>
        <input className="rounded-l text-2xl w-max"
          type='password' 
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Button
          type='button' 
          onClick={HandleLogin}>Login</Button>
        <Button
          type='button' 
          onClick={HandleAdminLogin}>Admin Login</Button>
        <Button
          type='button' 
          onClick={HandleRegister}>Register</Button>
      </div>
    </div>
  );
}

export default LoginRegister;