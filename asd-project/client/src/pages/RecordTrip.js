import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"
import { useAuth } from "../App"

function RecordTrip({ Cards, FromStations, ToStations, RecordTrip}) {
  //const navigate = useNavigate();
  const user = useAuth();
  const [card, setCard] = useState("");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function HandleCards() {
    const success = await Cards(user);
    if (!success) {
      setErrorMessage("Error");
    }
    else {
      navigate('/home');
    }
  }

  async function HandleFromStations() {
    const success = await FromStations(user);
    if (!success) {
      setErrorMessage("Error");
    }
    else {
      navigate('/home');
    }
  }

  async function HandleToStations() {
    const success = await ToStations(user);
    if (!success) {
      setErrorMessage("Error");
    }
    else {
      navigate('/home');
    }
  }

  async function HandleRecord() {
    const success = await RecordTrip(card, fromStation, toStation);
    if (!success) {
      setErrorMessage("Error");
    }
    else {
      navigate('/home');
    }
  }

  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        {errorMessage && (
            <alert>{errorMessage}</alert>
        )}
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
            Record Recent Trip 
        </p>
        <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
            <label className="text-white text-2xl p-8 w-100">Cards</label>
            <select className="rounded-l text-2xl w-max" 
            value={card} 
            onChange={e => setCard(e.target.value)}
            />
        </div>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
            <label className="text-white text-2xl p-8 w-100">From Station</label>
            <select className="rounded-l text-2xl w-max"
            value={fromStation} 
            onChange={e => setFromStation(e.target.value)}
            />
        </div>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
            <label className="text-white text-2xl p-8 w-100">To Station</label>
            <select className="rounded-l text-2xl w-max"
            value={toStation} 
            onChange={e => setToStation(e.target.value)}
            />
        </div>
        <div className="w-full">
            <Button
            type='button' 
            onClick={HandleRecord}>Record</Button>
        </div>
    </div>
  );
}

export default RecordTrip;