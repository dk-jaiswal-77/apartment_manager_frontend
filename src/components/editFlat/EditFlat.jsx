import "./EditFlat.css";
import {useState} from "react";

import { backend_url } from "../../App";

export default function EditFlat(){

    let editFlat = JSON.parse(localStorage.getItem("editFlat"));

    let editFlat_details = {
        flat_type : editFlat.flat_type, 
        block : editFlat.block,
        flat_no : editFlat.flat_no,
        residents_count : editFlat.residents_count
    }

    const [detail, setDetail] = useState(editFlat_details);

    function handleChange(e){
        setDetail({...detail, [e.target.id] : e.target.value.trim()});
    }

    async function updateFlat(){
        try{
            await fetch(`${backend_url}/flats/${editFlat._id}`, {
                method : "PATCH", 
                body : JSON.stringify(detail),
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            setDetail({
                flat_type : "none",
                block : "",
                flat_no : "",
                residents_count : ""
            });
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div id="addFlat_container">
            <form onSubmit={(e)=>{
                e.preventDefault();
                updateFlat(); 
            }}>
                <h2>Edit flat</h2>
                <select id="flat_type" className="addFlat_entry" value={detail.flat_type} onChange={handleChange} >
                    <option value="none">--select flat type--</option>
                    <option value="owner">owner</option>
                    <option value="tenant">tenant</option>
                </select>

                <input type="text" id="block" className="addFlat_entry" placeholder="enter block" value={detail.block} onChange={handleChange} />

                <input type="text" id="flat_no" className="addFlat_entry" placeholder="enter flat number" value={detail.flat_no} onChange={handleChange} />

                <input type="number" id="residents_count" className="addFlat_entry" placeholder="enter no. of residents" value={detail.residents_count} onChange={handleChange} />

                <input type="submit" value="Update flat" className="addFlat_entry" />
            </form>
        </div>
    );
}

// {
//     flat_type : "none",
//     block : "",
//     flat_no : "",
//     residents_count : ""
// }