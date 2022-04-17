import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
            let res = await fetch("http://localhost:3007/manager/login", 
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
            }}>
                <input type="email" id="email" value={login.email} placeholder="enter email" onChange={handleChange} />

                <input type="password" id="password" value={login.password} placeholder="enter password" onChange={handleChange} />

                <input type="submit" value="Log In" />
            </form>

            <button onClick={()=>{
                Navigate("/register");
            }}>Create an account</button>
        </div>
    );
}