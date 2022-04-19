import "./main.css";

import {useState, useEffect, useRef} from "react";
import updateFlatsAction from "../../redux/updateFlats/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { backend_url } from "../../App";

export default function Main(){

    const Navigate = useNavigate();

    let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    if(!isLoggedIn){
        Navigate("/login");
    }

    const dispatch = useDispatch();

    let flats = useSelector((state) => (state.flats.flats));
    console.log(flats);

    const page = useRef(1); // change value on button click // {current: 1}

    const [modifiedFlats, setModifiedFlats] = useState(null);

    let displayFlats;
    if(modifiedFlats === null)
    {
        displayFlats = flats;
    }
    else{
        displayFlats = modifiedFlats;
    }

    async function getFlats(page){
        try{
            let res = await fetch(`${backend_url}/flats/${page}`);
            let flats = await res.json();
            // dispatch action 
            dispatch(updateFlatsAction(flats));

        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{getFlats(page.current)}, []);

    function changePage(e){
        if(e.target.id ===  "prevPage")
        {
            page.current = page.current - 1;
            getFlats(page.current);
        }
        else if(e.target.id === "nextPage")
        {
            page.current = page.current + 1;
            getFlats(page.current);
        }
    }

    function filterByResidentType(e){
        if(e.target.value === "all")
        {
            setModifiedFlats([...flats]);
        }
        else if(e.target.value === "owner")
        {
            setModifiedFlats(flats.filter((flat) => (flat.flat_type === e.target.value)));
        }
        else
        {
            setModifiedFlats(flats.filter((flat) => (flat.flat_type === e.target.value)));
        }
    }

    function sortByFlatNo(e){
        if(e.target.value === "asc")
        {
            flats.sort((a, b) => ((+a.flat_no)-(+b.flat_no)));
            setModifiedFlats([...flats]);
        }
        else if(e.target.value === "desc")
        {
            flats.sort((a, b) => ((+b.flat_no)-(+a.flat_no)));
            setModifiedFlats([...flats]);
        }
        console.log("---", flats);
    }

    const [search, setSearch] = useState("");

    function handleChange(e){
        setSearch(e.target.value.trim());
    }

    function searchByBlock(e){
        e.preventDefault();
        setModifiedFlats(flats.filter((flat) => (flat.block === search)));
    }

    //--------------------------------------->
    function navigateToEditFlatPage(e){
        // console.log(e.target.parentNode.parentNode.id);
        const editFlat_id = e.target.parentNode.parentNode.id;
        const [editFlat] = flats.filter((flat) => (flat._id === editFlat_id));
        localStorage.setItem("editFlat", JSON.stringify(editFlat));
        Navigate("/editFlat");
    }
    // ------------------------------------>
    function navigateToResidentsPage(e){
        const residents_flat_id = e.target.parentNode.parentNode.id;
        localStorage.setItem("residents_flat_id", JSON.stringify(residents_flat_id));
        Navigate("/residents");
    }

    return (
        <div>
            
            <div id="filter_sort_search">
                {/* filter */}
                <div>
                    <label htmlFor="filterByResidentType">Filter by resident type</label>

                    <select id="filterByResidentType" onChange={filterByResidentType}>
                        <option value="all">--all--</option>
                        <option value="owner">owner</option>
                        <option value="tenant">tenant</option>
                    </select>
                </div>

                {/* sorting */}
                <div>
                    <label htmlFor="sortByFlatNo">Sort by flat no.</label>

                    <select id="sortByFlatNo" onChange={sortByFlatNo}>
                        <option value="none">--sort--</option>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>

                {/* search */}
                <form onSubmit={searchByBlock}>
                    <input type="text" id="search" placeholder="search by block name" onChange={handleChange} />
                    <input type="submit" value="Search" />
                </form>

            </div>

            <table id="displayFlats">
                <thead>
                    <tr>
                        <th>Flat Type</th>
                        <th>Block</th>
                        <th>Flat No.</th>
                        <th>Residents Count</th>
                    </tr>
                </thead>
                <tbody>
                    {displayFlats.map((flat) => {
                        return (
                            <tr key={flat._id} id={flat._id}>
                                <td>{flat.flat_type}</td>
                                <td>{flat.block}</td>
                                <td>{flat.flat_no}</td>
                                <td>{flat.residents_count}</td>
                                <td><button class="edit_flat_btn tr_btn" onClick={navigateToEditFlatPage}>Edit Flat</button></td>
                                <td><button className="tr_btn" onClick={navigateToResidentsPage}>Residents</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div id="navigatePage">
                <button id="prevPage" onClick={(e) => {
                    if(page.current > 1)
                    {
                        changePage(e);
                    }
                }} >Prev Page</button>
                <button id="nextPage" onClick={changePage} >Next Page</button>
            </div>
        </div>
    );
}