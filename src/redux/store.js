import { createStore, combineReducers } from "redux";
import updateFlatsReducer from "./updateFlats/reducer";

const rootReducer = combineReducers({
    flats : updateFlatsReducer
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;