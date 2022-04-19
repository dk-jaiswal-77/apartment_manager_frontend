import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { backend_url } from "../../App";

export default function Register(){

    const Navigate = useNavigate();

    const [register, setRegister] = useState({
        name : "",
        email : "",
        password : ""
    });

    function handleChange(e){
        setRegister({...register, [e.target.id] : e.target.value});
    }

    async function registerManager(){
        try{
            let res = await fetch(`${backend_url}/manager/register`, {
                method : "POST", 
                body : JSON.stringify(register),
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            // console.log(res);
            let res_data = await res.json();
            // console.log(res_data);
            if(res_data.status)
            {
                Navigate("/login");
            }
        }catch(error){
            console.log(error);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        registerManager();
    }

    return(
        <div>
            <form onSubmit={handleSubmit} id="register_form">
                <h2>Sign Up</h2>
                <input type="text" id="name" className="register_entry" value={register.name} placeholder="enter name" onChange={handleChange} />

                <input type="email" id="email" className="register_entry" value={register.email} placeholder="enter email" onChange={handleChange} />

                <input type="password" id="password" className="register_entry" value={register.password} placeholder="enter password" onChange={handleChange} />

                <input type="submit" value="Sign Up" className="register_entry" />
            </form>
        </div>
    );
}