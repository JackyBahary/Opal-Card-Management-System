import NavBar from "./components/NavBar";
import LinkCard from "./pages/LinkCard";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import RecordTrip from "./pages/RecordTrip";
import YourAccount from "./pages/YourAccount";
import LostStolenCard from "./pages/LostStolenCard";
import TripHistory from "./pages/TripHistory";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useContext, createContext } from "react";
import ProtectRoute from "./components/ProtectedRoute"

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

const ProtectedLinkCard = ProtectRoute(LinkCard);
const ProtectedHome = ProtectRoute(Home);
const ProtectedRecordTrip = ProtectRoute(RecordTrip);
const ProtectedYourAccount = ProtectRoute(YourAccount);
const ProtectedLostStolenCard = ProtectRoute(LostStolenCard);
const ProtectedTripHistory = ProtectRoute(TripHistory);

function App() {
  const [auth, setAuth] = useState();
  
  async function Login(email, password) {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { authenticated } = await response.json();
    if (authenticated) {
      setAuth(email);
    }
    return authenticated;
  }

  async function Register(email, password) {
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function Cards(user) {
    const response = await fetch('http://localhost:8000/api/cards', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.cards;
  }

  async function Stations() {
    const response = await fetch('http://localhost:8000/api/stations');
    const data = await response.json();
    return data.stations;
  }

  async function RecordTrip(card, fromStation, toStation) {
    const response = await fetch('http://localhost:8000/api/record-trip', {
      method: 'POST',
      body: JSON.stringify({card, fromStation, toStation }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function TripHistory(card) {
    const response = await fetch('http://localhost:8000/api/trip-history', {
      method: 'POST',
      body: JSON.stringify({card}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.trips;
  }

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path = '/' element = {
            <LoginRegister Login={Login} Register={Register} />
          } />
          <Route path = '/add-card' element = {<ProtectedLinkCard/>} />
          <Route path = '/home' element = {<ProtectedHome/>} />
          <Route path = '/record-trip' element = {
            <ProtectedRecordTrip Cards={Cards} Stations={Stations} RecordTrip={RecordTrip}/>
          } />
          <Route path = '/your-account' element = {<ProtectedYourAccount/>} />
          <Route path = '/lost-stolen-card' element = {<ProtectedLostStolenCard/>} />
          <Route path = '/trip-history' element = {<ProtectedTripHistory Cards={Cards} TripHistory={TripHistory}/>
          } />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
    
  );
}

export { useAuth };
export default App;
