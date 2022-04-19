// https://git.heroku.com/apartment-manager-dkjaiswal77.git


import './App.css';
import {Routes, Route} from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';

import Register from './components/register/Register';
import Login from './components/login/Login';
import Main from './components/main/Main';
import AddFlat from './components/addFlat/AddFlat';
import EditFlat from './components/editFlat/EditFlat';
import Residents from './components/residents/Residents';

const backend_url = "https://apartment-manager-dkjaiswal77.herokuapp.com";
export {backend_url};

function App() {

  const Navigate = useNavigate();

  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

  return (
    <div className="App">

      <nav id='navbar'>
        <Link to={"/"}>Home</Link>
        <Link to={"/addFlat"}>Add flat</Link>
        <button onClick={()=>{
          if(isLoggedIn)
          {
            // logout
            localStorage.removeItem("isLoggedIn");
            Navigate("/login");
          }
          else{
            Navigate("/login");
          }
        }}>{(isLoggedIn) ? "Logout" : "Login"}</button>
      </nav>

      <Routes>
        < Route path="/" element={<Main />} /> 
        < Route path="/login" element={<Login />} />
        < Route path="/register" element={<Register />} />
        < Route path="/addFlat" element={< AddFlat />} />  
        < Route path="/editFlat" element={< EditFlat />} />  
        < Route path="/residents" element={< Residents />} />  
      </Routes>

    </div>
  );
}

export default App;
