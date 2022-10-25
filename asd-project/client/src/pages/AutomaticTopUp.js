import { useState, useEffect } from "react";
import { useAuth } from "../App"
import Button from "../components/Button"

function AutomaticTopUp({Cards, AutomaticTopUp, DisableTopUp}) {
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState();
    const [amount, setAmount] = useState();
    const [clicked, setClicked] = useState();
    const [errorMessage, setSuccessMessage] = useState("");
    const user = useAuth();

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

  async function HandleAutomaticTopUp() {
    const success = await AutomaticTopUp(card, amount);
    if (success) {
        setSuccessMessage("Automatic Top Up has been set up!");
      }
      else {
        setSuccessMessage("Failed to setup Automatic Top Up");
      }
  }

  async function HandleDisableTopUp() {
    const success = await DisableTopUp(card);
    if (success) {
        setSuccessMessage("Automatic Top Up has been disabled on your card!");
      }
      else {
        setSuccessMessage("Failed to disable Automatic Top Up on this card!");
      }
  }

  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
            Set Up Automatic Top Up
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
            <label className="text-white text-2xl p-8 w-100">Automatic Top Up Amount($):</label>
            <input className="rounded-l text-2xl w-max" 
              value={amount} 
              onChange={e => setAmount(e.target.value)}
            />
            <Button type='button'
            onClick={HandleAutomaticTopUp}>Set Up</Button> {/*calls HandleAutomaticTopUp function when button is clicked*/}
            <Button type='button'
            onClick={HandleDisableTopUp}>Disable Feature</Button> {/*calls HandleDisableTopUp function when button is clicked*/}
            {errorMessage && (
              <div className="rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 b-2 text-white font-bold">{errorMessage}</div>
            )}
        </div>    
    </div>
  );
}

export default AutomaticTopUp;
