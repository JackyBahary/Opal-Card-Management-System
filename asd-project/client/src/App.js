import NavBar from "./components/NavBar";
import LinkCard from "./pages/LinkCard";
import LoginRegister from "./pages/LoginRegister";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path = '/'/>
        <Route path = '/add-card' element = {<LinkCard/>} />
        <Route path = '/login-register' element = {<LoginRegister/>} />
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
