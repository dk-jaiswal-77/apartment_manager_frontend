import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { backend_url } from "../../App";


export default function Login(){

    const Navigate = useNavigate();

    const [login, setLogin] = useState({
        email : "", 
        password : ""
    });

    function handleChange(e){
        setLogin({...login, [e.target.id] : e.target.value});
    }

    async function loginUser(){
        try{
            let res = await fetch(`${backend_url}/manager/login`, 
            {
                method : "POST", 
                body : JSON.stringify(login),
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            let res_data = await res.json();
            // console.log(res_data);
            if(res_data.status){
                localStorage.setItem("isLoggedIn", JSON.stringify(true));
                Navigate("/");
            }

        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                loginUser();
            }} id="login_form">

            <h2>Log In</h2>

                <input type="email" id="email" className="login_entry" value={login.email} placeholder="enter email" onChange={handleChange} />

                <input type="password" id="password" className="login_entry" value={login.password} placeholder="enter password" onChange={handleChange} />

                <input type="submit" value="Log In" className="login_entry" />

                
                <button onClick={()=>{
                    Navigate("/register");
                }} className="login_entry">Create an account - Sign Up</button>
            </form>

        </div>
    );
}