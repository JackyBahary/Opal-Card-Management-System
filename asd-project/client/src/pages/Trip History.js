import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"
import { useAuth } from "../App"

function RecordTrip({ Cards, Stations, RecordTrip}) {
  const navigate = useNavigate();
  const user = useAuth();
  const [cards, setCards] = useState([]);
  const [stations, setStations] = useState([]);
  const [card, setCard] = useState();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    HandleCards()
    HandleStations()
  }, [])

  async function HandleCards() {
    const cards = await Cards(user);
    setCards(cards);
    setCard(cards[0].cardnumber);
  }

  async function HandleStations() {
    const stations = await Stations();
    setStations(stations);
    setFromStation(stations[0].stationname);
    setToStation(stations[0].stationname);
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
            <div>{errorMessage}</div>
        )}
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
            Trip History
        </p>
        <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
            <label className="text-white text-2xl p-8 w-100">Trips</label>
            <div>
              <p> trip from:</p>
                <h1>Central</h1>
                <p> to </p>
                <h1>Wynyard</h1>
            </div>
        </div>
    </div>
  );
}

export default RecordTrip;