import NavBar from "./components/NavBar";
import LinkCard from "./pages/LinkCard";
import TopUp from "./pages/TopUp";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import RecordTrip from "./pages/RecordTrip";
import YourAccount from "./pages/YourAccount";
import LostStolenCard from "./pages/LostStolenCard";
import TripHistory from "./pages/TripHistory";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useContext, createContext } from "react";
import ProtectRoute from "./components/ProtectedRoute"
//import SaveTrip from "./pages/SaveTrip";
import AdminLostStolen from "./pages/Admin-lost-stolen";
import AdminDeactivate from "./pages/Admin-deactivate";

const AuthContext = createContext();
const AdminContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function useAdmin() {
  return useContext(AdminContext);
}

const ProtectedLinkCard = ProtectRoute(LinkCard);
const ProtectedHome = ProtectRoute(Home);
const ProtectedRecordTrip = ProtectRoute(RecordTrip);
const ProtectedYourAccount = ProtectRoute(YourAccount);
const ProtectedTopUp = ProtectRoute(TopUp);
const ProtectedLostStolenCard = ProtectRoute(LostStolenCard);
const ProtectedTripHistory = ProtectRoute(TripHistory);
const ProtectedAdminLostStolen = ProtectRoute(AdminLostStolen);
const ProtectedAdminDeactivate = ProtectRoute(AdminDeactivate);

function App() {
  const [auth, setAuth] = useState();
  const [admin, setAdmin] = useState();
  
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

  async function AdminLogin(email, password) {
    const response = await fetch('http://localhost:8000/api/admin-login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { authenticated } = await response.json();
    if (authenticated) {
      setAuth(email);
      setAdmin(true);
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

  async function addCard(cardNum, cardName, user) {
    const response = await fetch('http://localhost:8000/api/addCard', {
      method: 'POST',
      body: JSON.stringify({ cardNum, cardName, user }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function DeleteAccount(user) {
    const response = await fetch('http://localhost:8000/api/delete-accounts', {
      method: 'POST',
      body: JSON.stringify({ user }),
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

  async function AllCards() {
    const response = await fetch('http://localhost:8000/api/allcards', {
      method: 'POST',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.allcards;
  }

  async function LostStolenCard(card) {
    const response = await fetch('http://localhost:8000/api/loststolencard', {
      method: 'POST',
      body: JSON.stringify({card}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function Stations() {
    const response = await fetch('http://localhost:8000/api/stations');
    const data = await response.json();
    return data.stations;
  }

  async function RecordTrip(card, fromStation, toStation, price) {
    const response = await fetch('http://localhost:8000/api/record-trip', {
      method: 'POST',
      body: JSON.stringify({card, fromStation, toStation, price }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }
  
  async function GetPrice(fromStation, toStation) {
    const response = await fetch('http://localhost:8000/api/get-price', {
      method: 'POST',
      body: JSON.stringify({fromStation, toStation}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.price;
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

  async function UpdatePassword(user, password) {
    const response = await fetch('http://localhost:8000/api/update-password', {
      method: 'POST',
      body: JSON.stringify({user, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function Deactivate(card) {
    const response = await fetch('http://localhost:8000/api/deactivate-card', {
      method: 'POST',
      body: JSON.stringify({card}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  return (
    <AuthContext.Provider value={auth}>
      <AdminContext.Provider value={admin}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path = '/' element = {
              <LoginRegister Login={Login} AdminLogin={AdminLogin} Register={Register} />
            } />
            <Route path = '/add-card' element = {<ProtectedLinkCard addCard={addCard}/>} />
            <Route path = '/home' element = {<ProtectedHome/>} />
            <Route path = '/record-trip' element = {
              <ProtectedRecordTrip Cards={Cards} Stations={Stations} RecordTrip={RecordTrip} GetPrice={GetPrice} />
            } />
            <Route path = '/your-account' element = {<ProtectedYourAccount UpdatePassword={UpdatePassword} DeleteAccount={DeleteAccount}/>} />
            <Route path = '/topup' element = {<ProtectedTopUp Cards={Cards}/>} />
            <Route path = '/lost-stolen-card' element = {<ProtectedLostStolenCard Cards={Cards} />} />
            <Route path = '/trip-history' element = {<ProtectedTripHistory Cards={Cards} TripHistory={TripHistory}/>}/>
            <Route path = '/admin-lost-stolen' element = {<ProtectedAdminLostStolen/>}/>
            <Route path = '/deactivate-card' element = {<ProtectedAdminDeactivate AllCards={AllCards} Deactivate={Deactivate}/>}/>
          </Routes>
        </BrowserRouter>
      </AdminContext.Provider>
    </AuthContext.Provider>
    
  );
}

export { useAuth };
export { useAdmin };
export default App;
