import { combineReducers } from "redux";
import sectionReducer from "./sectionsReducers";

const rootReducer  = combineReducers({ sectionReducer });


export default rootReducer 