import {useState, useEffect, useRef} from "react";
import updateFlatsAction from "../../redux/updateFlats/action";
import { useDispatch, useSelector } from "react-redux";

export default function Main(){

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
            let res = await fetch(`http://localhost:3007/flats/${page}`);
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

    return (
        <div>
            
            <div>
                <div>
                    <label htmlFor=""></label>
                    <select id="filterByResidentType" onChange={filterByResidentType}>
                        <option value="all">--all--</option>
                        <option value="owner">owner</option>
                        <option value="tenant">tenant</option>
                    </select>
                </div>
                <div></div>
                <div></div>
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div>
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