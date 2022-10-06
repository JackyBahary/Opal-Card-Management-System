import { useState, useEffect } from "react";
import Button from "../components/Button"
import { useAuth } from "../App"

function TripHistory({Cards, TripHistory}) {
  //Create states and variables to use in component
  const user = useAuth();
  const [cards, setCards] = useState([]);
  const [trips, setTrips] = useState([]);
  const [card, setCard] = useState();
  const [clicked, setClicked] = useState();

  //This is to call functions as page loads
  useEffect(() => {
    HandleCards()
  }, [])

  //Handle function to get cards from DB
  async function HandleCards() {
    const cards = await Cards(user);
    setCards(cards);
    setCard(cards[0].cardnumber);
  }

  //Handle function to get trips from DB
  async function HandleHistory() {
    const trips = await TripHistory(card);
    setTrips(trips);
    setClicked(true);
  }

  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
            Trip History
        </p>
        <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
            <label className="text-white text-2xl p-8 w-100">Cards</label>
            {/* map select tag with every index in 'cards' state */}
            <select className="rounded-l text-2xl w-max" 
            value={card} 
            onChange={e => {setCard(parseInt(e.target.value))
            setClicked(false)}}
            >
              {
                cards.map((card) => {
                  return (
                    <option key = {card.cardnumber} value={card.cardnumber}>{card.cardnumber}</option>
                  )
                })
              }
            </select>
            <Button type='button'
            onClick={HandleHistory}>View History</Button> {/*Call handle function when button is clicked*/}
        </div>
        <p className="text-white text-center text-2xl p-8 w-100">Trips</p>
        {clicked && trips.length > 0 && (
          <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
          <table className="text-white text-2xl p-8 w-100 table-auto content-evenly">
            <thead>
              <tr>
                <th>Card Number</th>
                <th>From Station</th>
                <th>To Station</th>
                <th>Date/Time</th>
                <th className="pr-4">Price</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {/* map select tag with every index in 'trips' state */}
              {
                trips.map((trips) => {
                  return (
                    <tr>
                      <td key = {trips.cardnumber} value={trips.cardnumber}>{trips.cardnumber}</td>
                      <td key = {trips.fromstation} value={trips.fromstation}>{trips.fromstation}</td>
                      <td key = {trips.tostation} value={trips.tostation}>{trips.tostation}</td>
                      <td  key = {trips.date_time} value={trips.date_time}>{trips.date_time}</td>
                      <td className="pl-2"  key = {trips.price} value={trips.price}>{trips.price}</td>
                      <td key = {trips.balance} value={trips.balance}>{trips.balance}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        )}
        {
          clicked && trips.length == 0 && (
            <p className="text-white text-center text-2xl p-8 w-100">No Trips made for Card {card}</p>
          )
        }
    </div>
  );
}

export default TripHistory;
