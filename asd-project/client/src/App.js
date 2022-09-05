import NavBar from "./components/NavBar";
import LinkCard from "./pages/LinkCard";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path = '/'/>
        <Route path = '/add-card' element = {<LinkCard/>} />
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
