/**
 * Contains the initial movieGenres of the movies entity
 */
import {IGenreEntity} from "../../../Utils/Interfaces/genres";
import {GET_MOVIE_GENRES} from "../../Actions/actionsList";
import {FAILURE, movieGenresActionCreators, REQUEST, SUCCESS} from "../../constants";

const initialState: IGenreEntity = {
    isFetching: false,
    didInvalidate: false,
    list: [],
}

/**
 * Calculates the next state of the movieGenres entity and returns it
 */

export default function reducer (state: IGenreEntity = initialState, action: movieGenresActionCreators): IGenreEntity {
    switch (action.type) {

        case REQUEST(GET_MOVIE_GENRES):
            return Object.assign({}, state, {
                ...state, isFetching: true, didInvalidate: false
            });

        case SUCCESS(GET_MOVIE_GENRES):
            return Object.assign({}, state, {
                ...state,
                list: [...action.payload.list],
                isFetching: false,
                didInvalidate: false
            });

        case FAILURE(GET_MOVIE_GENRES):
            return Object.assign({}, state, {
                ...state, isFetching: false, didInvalidate: true,
            });

        default:
            return state;
    }
}