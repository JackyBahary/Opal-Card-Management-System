import { useState, useEffect } from "react";
import Button from "../components/Button"
import { useAuth } from "../App"


function AdminDeactivate({AllCards, Deactivate}) {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState();

  useEffect(() => {
    HandleCards()
  }, [])

  async function HandleCards() {
    const cards = await AllCards();
    setCards(cards);
    setCard(cards[0].cardnumber);
  }

  async function HandleDeactivate() {
    const success = await Deactivate(card);

  }

  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
      <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
        Deactivate Cards
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
        <div className="w-full">
          <Button
          type='button' 
          onClick={HandleDeactivate}>Record</Button>
        </div>
    </div>
  );
}
  
export default AdminDeactivate;