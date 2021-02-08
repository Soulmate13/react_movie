import { combineReducers } from 'redux';
import movies from './movies';
import series from "./series";


/**
 * Combines reducers into a single object
 */

export const rootReducer = combineReducers({
   movies,
   series,
})

export type RootState = ReturnType<typeof rootReducer>
