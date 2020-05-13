import { combineReducers } from 'redux';
import movies from './movies';
import series from "./series";


export default combineReducers({
   movies,
   series,
})