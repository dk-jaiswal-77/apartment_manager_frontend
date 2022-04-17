// import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";

import Register from './components/register/Register';
import Login from './components/login/Login';
import Main from './components/main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        < Route path="/" element={<Register />} /> 
        < Route path="/login" element={<Login />} />
        < Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
