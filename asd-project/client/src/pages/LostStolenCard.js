import { useState } from "react";
import Button from "../components/Button"

function LostStolenCard({ ReportLostStolenCard }) {
  const [fullName, setFullName] = useState("");
  const [opalEmail, setOpalEmail] = useState("");  
  const [opalCardNumber, setOpalCardNumber] = useState("");  
  const [errorMessage, setErrorMessage] = useState("");  
  
  async function HandleLostStolenCard() {
    const success = await ReportLostStolenCard(fullName, opalEmail, opalCardNumber);
    if (!success) {
      setErrorMessage("Invalid Input");
    }
    else {
      alert("Successfully reported Lost/Stolen Card");
    }
  }

  return (
      <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
          Request Lost/Stolen Card
        </p>
        {errorMessage && (
        <div className="rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 b-2 text-white font-bold">{errorMessage}</div>
      )}
          <div className=" justify-self-center w-full grid-cols-2 pb-8">
            <label className="text-white text-2xl p-8 w-100">Full Name</label>
            <input className="rounded-l text-2xl w-max" value={fullName} onChange={e => setFullName(e.target.value)}/>
          </div>
          <div className=" justify-self-center w-full grid-cols-2 pb-8">
            <label className="text-white text-2xl p-8 w-100">Email</label>
            <input className="rounded-l text-2xl w-max" value={opalEmail} onChange={e => setOpalEmail(e.target.value)}/>
          </div>
          <div className=" justify-self-center w-full grid-cols-2 pb-8">
            <label className="text-white text-2xl p-8 w-100">Opal Card Number</label>
            <input className="rounded-l text-2xl w-max" maxLength={20} value={opalCardNumber} onChange={e => setOpalCardNumber(e.target.value)}/>
          </div>
          <div className="w-full">
            <Button type='button' onClick={HandleLostStolenCard}>Submit</Button>
          </div>  
      </div>
    );
  }
  
  export default LostStolenCard;