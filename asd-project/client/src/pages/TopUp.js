import { useAuth } from "../App"
import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"

function TopUp({Cards, TopUp}) {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState();
    const [errorMessage, setSuccessMessage] = useState("");
    const [clicked, setClicked] = useState();
    const user = useAuth();

  //Handle function to get cards from DB
  async function HandleCards() {
    const cards = await Cards(user);
    setCards(cards);
    setCard(cards[0].cardnumber);
  }
  //This is to call functions as page loads
  useEffect(() => {
    HandleCards()
  }, [])

    //updates users balance to old value + new value
    async function HandleTopUp() {
      const success = await TopUp(card, amount);
      if (success) {
          setSuccessMessage("You have added $" + amount + " into your cards balance! (" + card + ")");
        }
        else {
          setSuccessMessage("Failed to Top Up");
        }
    }

    async function HandleNavigate() {
      navigate('/automatic-top-up');
    }

    return (
      
      <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
          {user}'s Account Top Up Page
        </p>
        
        {errorMessage && (
        <div className="rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 b-2 text-white font-bold">{errorMessage}</div>
        )}
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
          <label className="text-white text-2xl p-8 w-100">Top Up Amount ($): </label>
          <input className="rounded-l text-2xl w-max"
            type='amount' 
            onfocus="this.value=''" 
            value={amount} 
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
          <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
              Your Cards
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
              onClick={HandleTopUp}>Top Up</Button> {/*Call handle function when button is clicked*/}
          </div>
        </div>

        <div className="w-full">    
        <Button
          type='button' 
          onClick={HandleNavigate}> Automatic Top Up</Button>
        </div>
      </div>
    );
    }
    export default TopUp;