import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"
import { useAuth } from "../App"

function RecordTrip({ Cards, Stations, RecordTrip, GetPrice}) {
  const navigate = useNavigate();
  const user = useAuth();
  const [cards, setCards] = useState([]);
  const [stations, setStations] = useState([]);
  const [card, setCard] = useState();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [price, setPrice] = useState();

  useEffect(() => {
    HandleCards()
    HandleStations()
  }, [])

  useEffect(() => {
    HandlePrice()
  }, )

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

  async function HandlePrice() {
    const price = await GetPrice(fromStation, toStation);
    setPrice(price);
  }

  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        {errorMessage && (
            <div>{errorMessage}</div>
        )}
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
            Record Recent Trip 
        </p>
        <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
            <label className="text-white text-2xl p-8 w-100">Cards</label>
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
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
            <label className="text-white text-2xl p-8 w-100">Price</label>
            <label className="text-white text-2xl p-8 w-100">${price}</label>           
            
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