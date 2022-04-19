import "./Residents.css";
import {useState, useEffect} from "react";

import { backend_url } from "../../App";

export default function Residents(){
    const flat_id = JSON.parse(localStorage.getItem("residents_flat_id"));

    const [residents, setResidents] = useState([]);

    useEffect(fetchResidents, []);

    function fetchResidents(){
        getResidents();
    }

    async function getResidents(){
        try{
            let res = await fetch(`${backend_url}/residents/${flat_id}`);
            let res_data = await res.json();
            // console.log(res_data);
            setResidents(res_data);
        }catch(error){
            console.log(error);
        }
    }

    //--------------------------------------------------->
    const [residentDetail, setResidentDetail] = useState({
        name : "",
        age : "",
        gender : "none", 
        flat_id : flat_id
    });

    function handleChange(e)
    {
        setResidentDetail({...residentDetail, [e.target.id] : e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        saveResident();
    }

    async function saveResident(){
        try{
            await fetch(`${backend_url}/residents`, {
                method : "POST", 
                body : JSON.stringify(residentDetail),
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            getResidents();
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div id="resident_container">

            {/* showing residents details */}
            <div className="showResidents">
                <h2>Residents' Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((resident) => {
                            return (
                                <tr key={resident._id} id={resident._id}>
                                    <td>{resident.name}</td>
                                    <td>{resident.gender}</td>
                                    <td>{resident.age}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* option to add resident to selected flat */}
            <form onSubmit={handleSubmit} id="addResident_form">
                <h2>Add Resident to this flat</h2>

                <input type="text" id="name" className="addResident_entry" value={residentDetail.name} placeholder="enter resident name" onChange={handleChange} />

                <input type="number" id="age" className="addResident_entry" value={residentDetail.age} placeholder="enter resident age" onChange={handleChange} />

                <select id="gender" className="addResident_entry" value={residentDetail.gender} onChange={handleChange} >
                    <option value="none">--select gender--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <input type="submit" className="addResident_entry" value="Add Resident" />
            </form>

        </div>
    );
}