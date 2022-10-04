import { useState, useEffect } from "react";
import Button from "../components/Button"
import { useAuth } from "../App"


function AdminDeactivate({AllCards, Deactivate}) {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  const [cardnumber, setCardnumber] = useState([]);
  useEffect(() => {
    HandleCards()
  }, [])

async function HandleCards() {
    setCardnumber("0","1","2","3","4")
    const cards = await AllCards();
    console.log(cards)
    setCards(cards);
    setCard(cards[0].cardnumber);
    //setCardnumber(cards[0].cardnumber, card[1].cardnumber, card[2].cardnumber, card[3].cardnumber, card[4].cardnumber)
  }

  
const deactivate = (Deactivate) => {
    const success = Deactivate(12345678)
      if (!success){
        alert("Error: Could not Deactivate")
      } else {
        alert("Success")
      }
    }


    return (
      <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
          Deactivate Cards
        </p>
          <div className=" justify-self-center w-full pb-8">
            <div className="overflow-scroll max-h-60 rounded-xl bg-white">
            <div className="text-white text-2xl p-2 w-11/12 mx-auto items-center align-center self-center my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">0</p>
              <button className="inline-block float-right" onClick={(event) => Deactivate(cards[0].cardnumber)}> Deactivate </button>
              </div>
              <div className="text-white text-2xl p-2 w-11/12 mx-auto my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">{cardnumber[0]}</p>
              <button className="inline-block float-right" type="checkbox"> Deactivate </button>
              </div>
              <div className="text-white text-2xl p-2 w-11/12 mx-auto my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">{cardnumber[0]}</p>
              <button className="inline-block float-right" type="checkbox"> Deactivate </button>
              </div>
              <div className="text-white text-2xl p-2 w-11/12 mx-auto my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">{cardnumber[0]}</p>
              <button className="inline-block float-right" type="checkbox"> Deactivate </button>
              </div>
              <div className="text-white text-2xl p-2 w-11/12 mx-auto my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">{cardnumber[0]}</p>
              <button className="inline-block float-right" type="checkbox"> Deactivate </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <button className=" justify-center self-center rounded-xl text-center bg-gradient-to-r from-yellow-600 to-red-600 p-2 px-4 text-white font-extrabold">Submit</button>
          </div>
      </div>
    );
  }
  
  export default AdminDeactivate;