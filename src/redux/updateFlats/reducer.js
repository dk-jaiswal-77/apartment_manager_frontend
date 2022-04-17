export default function updateFlatsReducer(flats = {flats : []}, {type, payload}){
    switch (type){
        case "UPDATE_FLATS":
            return {flats : payload};
        default:
            return flats;
    }
}