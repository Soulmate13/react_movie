import { combineReducers } from 'redux';
import movies from './movies';
import series from "./series";


/**
 * Combines reducers into a single object
 * @function
 * @returns The combined state object
 */

export default combineReducers({
   movies,
   series,
})