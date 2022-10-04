import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"
import { useAuth } from "../App"

function SaveTrip({ Cards, Stations, SaveTrip}) {
  const navigate = useNavigate();
  const user = useAuth();
  const [cards, setCards] = useState([]);
  const [stations, setStations] = useState([]);
  const [card, setCard] = useState();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Runs the function "HandleCards()" and "HandleStations()".
  useEffect(() => {
    HandleCards()
    HandleStations()
  }, [])
  
  // Pulls cardnumber data from the database.
  async function HandleCards() {
    const cards = await Cards(user);
    setCards(cards);
    setCard(cards[0].cardnumber);
  }

  // Pulls fromstation and tostation data from the database.
  async function HandleStations() {
    const stations = await Stations();
    setStations(stations);
    setFromStation(stations[0].stationname);
    setToStation(stations[0].stationname);
  }

  // Push saved trip data to database according to the card, fromstation, tostation inputs from the user. 
  // A pop up message will appear if the data has been successfully saved or error.
  // If the data has been saved successfully, the user will be redirected to "SavedTrip" page.
  async function HandleSave() {
    const success = await SaveTrip(card, fromStation, toStation);
    if (!success) {
      console.log(success)
      setErrorMessage("Error");
    }
    else {
      console.log("success",success)
      alert("Trip has been saved.");
      navigate('/saved-trip');
    }
  }

  // Line 65-79: A drag-down selector which allows the user to select their card number based on the data from the database.
  // Line 90-94: A drag-down selector which allows the user to select their FROM station input based on the data from the database.
  // Line 95-109: A drag-down selector which allows the user to select their TO station input based on the data from the database.
  // Line 111-115: A button that will run the function (HandleSave) after the user selected their inputs.
  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        {errorMessage && (
            <div>{errorMessage}</div>
        )}
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
            Save Your Trip
        </p>
        <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
            <label className="text-white text-2xl p-8 w-100">Select Card</label>
            <select className="rounded-l text-2xl w-max" 
            value={card} 
            onChange={e => setCard(parseInt(e.target.value))}
            >
              {
                cards.map((card) => {
                  return (
                    <option key = {card.cardnumber} value={card.cardnumber}>{card.cardnumber}</option>
                  )
                })
              }
            </select>
        </div>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
            <label className="text-white text-2xl p-8 w-100">From Station</label>
            <select className="rounded-l text-2xl w-max"
            value={fromStation} 
            onChange={e => setFromStation(e.target.value)}
            >
              {
                stations.map((station) => {
                  return (
                    <option value={station.stationname}>{station.stationname}</option>
                  )
                })
              }
            </select>
        </div>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
            <label className="text-white text-2xl p-8 w-100">To Station</label>
            <select className="rounded-l text-2xl w-max"
            value={toStation} 
            onChange={e => setToStation(e.target.value)}
            >
              {
                stations.map((station) => {
                  return (
                    <option value={station.stationname}>{station.stationname}</option>
                  )
                })
              }
            </select>
        </div>

        <div className="w-full">
            <Button
            type='button' 
            onClick={HandleSave}>Save</Button>
        </div>
    </div>
  );
}

export default SaveTrip;