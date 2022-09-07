import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"
import { useAuth } from "../App"

function TripHistory() {
  const navigate = useNavigate();
  const user = useAuth();

  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
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

export default TripHistory;
