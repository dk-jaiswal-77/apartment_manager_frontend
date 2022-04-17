import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            let res = await fetch("http://localhost:3007/manager/register", {
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
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" value={register.name} placeholder="enter name" onChange={handleChange} />

                <input type="email" id="email" value={register.email} placeholder="enter email" onChange={handleChange} />

                <input type="password" id="password" value={register.password} placeholder="enter password" onChange={handleChange} />

                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
}