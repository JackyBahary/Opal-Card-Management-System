import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"

function LoginRegister({ Login, Register }) {
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
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
          <label className="text-white text-2xl p-8 w-100">Email</label>
          <input className="rounded-l text-2xl w-max"></input>
        </div>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
          <label className="text-white text-2xl p-8 w-100">Password</label>
          <input className="rounded-l text-2xl w-max"></input>
        </div>
        <div className="w-full">
          <button className=" justify-center self-center rounded-xl text-center bg-gradient-to-r from-yellow-600 to-red-600 p-2 px-4 text-white font-extrabold">Login</button>
        </div>
    </div>
  );
}

export default LoginRegister;