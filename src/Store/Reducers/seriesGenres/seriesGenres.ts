/**
 * Contains the initial movieGenres
 */
import {IGenreEntity} from "../../../Utils/Interfaces/genres";
import {GET_SERIES_GENRES} from "../../Actions/actionsList";
import {FAILURE, REQUEST, seriesGenresActionCreators, SUCCESS} from "../../constants";

const initialState: IGenreEntity = {
    isFetching: false,
    didInvalidate: false,
    list: [],
}

/**
 * Calculates the next state of the movieGenres entity and returns it
 */

export default function reducer (state: IGenreEntity = initialState, action: seriesGenresActionCreators): IGenreEntity {
    switch (action.type) {

        case REQUEST(GET_SERIES_GENRES):
            return Object.assign({}, state, {
                ...state, isFetching: true, didInvalidate: false
            });

        case SUCCESS(GET_SERIES_GENRES):
            return Object.assign({}, state, {
                ...state,
                list: [...action.payload.list],
                isFetching: false,
                didInvalidate: false
            });

        case FAILURE(GET_SERIES_GENRES):
            return Object.assign({}, state, {
                ...state, isFetching: false, didInvalidate: true,
            });

        default:
            return state;
    }
}