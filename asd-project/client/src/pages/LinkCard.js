import { useState } from "react";
import { useAuth } from "../App"
import Button from "../components/Button"
function LinkCard({addCard}) {
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useAuth();

  // Handles the Add Card button click.
  async function HandleAddCard() {
    const success = await addCard(parseInt(cardNum), cardName, user);
    if (!success) {
      setErrorMessage("Error. Unable to add card to your account.");
    }
  }

  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
      <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
        Add Card
      </p>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
          <label className="text-white text-2xl p-8 w-100">Card Number</label>
          <input className="rounded-l text-2xl w-max" 
            value={cardNum} 
            onChange={e => setCardNum(e.target.value)}
          />
        </div>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
          <label className="text-white text-2xl p-8 w-100">Card Name</label>
          <input className="rounded-l text-2xl w-max" 
            value={cardName} 
            onChange={e => setCardName(e.target.value)}
          />
        </div>
        <div className="w-full">    
        <Button
          type='button'
          onClick={HandleAddCard}> Add Card</Button>
        </div>
    </div>
  );
}

export default LinkCard;
