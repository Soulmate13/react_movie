import { combineReducers } from 'redux';
import searchedSeries from './searchedSeries/searchedSeries';
import searchedMovies from './searchedMovies/searchedMovies';
import popularSeries from './popularSeires/popularSeries';
import popularMovies from './popularMovies/popularMovies';
import singleSeries from "./singleSeries/singleSeries";
import singleMovie from "./singleMovie/singleMovie";
import movieGenres from "./movieGenres/movieGenres";
import seriesGenres from "./seriesGenres/seriesGenres";
/**
 * Combines reducers into a single object
 */

export const rootReducer = combineReducers({
   searchedSeries,
   searchedMovies,
   popularSeries,
   popularMovies,
   singleSeries,
   singleMovie,
   movieGenres,
   seriesGenres
})

export type RootState = ReturnType<typeof rootReducer>
