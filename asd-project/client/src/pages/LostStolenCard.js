import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"
import { useAuth } from "../App"

function LostStolenCard({ LostStolenCard, Cards }) {
  const navigate = useNavigate();
  const user = useAuth();
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState();
  const [errorMessage, setErrorMessage] = useState(""); 
  
  // Runs the function "HandleCards()".
  useEffect(() => {
    HandleCards()
  }, [])

  // Pulls cardnumber data from the database.
  async function HandleCards() {
    const cards = await Cards(user);
    setCards(cards);
    setCard(cards[0].cardnumber);
  }

  // Push loststolencard data to database according to the cardnumber input from the user. 
  // A pop up message will appear if the data has been successfully saved or error.
  // If the data has been saved successfully, the user will be redirected to "Home" page. 
  async function HandleReport() {
    const success = await LostStolenCard(card);
    if (!success) {
      setErrorMessage("Something went wrong");
    }
    else {
      alert("Card has been reported.");
      navigate('/home');
    }
  }

  // Line 49-60 & 64: A drag-down selector which allows the user to select their card number based on the data from the database.
  // Line 61-63: A button that runs the "HandleReport" function if the user clicks it.
  return (
      <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
          Report Lost/Stolen Card
        </p>
        {errorMessage && (
        <div className="rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 b-2 text-white font-bold">{errorMessage}</div>
      )}
          <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
            <label className="text-white text-2xl p-8 w-100">Select Card</label> 
            <select className="rounded-l text-2xl w-max" value={card} onChange={e => setCard(parseInt(e.target.value))}
            >
              {
                cards.map((card) => {
                  return (
                    <option key = {card.cardnumber} value={card.cardnumber}>{card.cardnumber}</option>
                  )
                })
              }
            </select>
          <div className="w-full">
            <Button type='button' onClick={HandleReport}>Submit</Button>
          </div>  
      </div>
      </div>
    );
  }
  
  export default LostStolenCard;