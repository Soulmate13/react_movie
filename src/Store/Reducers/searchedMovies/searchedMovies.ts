import {GET_SEARCHED_MOVIES, GET_SEARCHED_MOVIES_NAMES} from '../../Actions/actionsList';
import {SUCCESS, REQUEST, FAILURE, searchedMoviesActionCreators} from '../../constants';
import {ISearchedMovies} from "../../../Utils/Interfaces/movies";


/**
 * Contains the initial state of the movies entity
 */

const initialState: ISearchedMovies = {
    isFetching: false,
    didInvalidate: false,
    prevSearchParams: {
        query: "",
        year: null,
        page: undefined
    },
    list: [],
    pageable: {
        page: undefined,
        total_results: 0
    },
    suggestedNames: []
}

/**
 * Calculates the next state of the movies entity and returns it
 */

export default function reducer (state: ISearchedMovies = initialState, action: searchedMoviesActionCreators): ISearchedMovies {
    switch (action.type) {

        case REQUEST(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                ...state, isFetching: true, didInvalidate: false
            });

        case SUCCESS(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                ...state,
                list: [...action.payload.list],
                prevSearchParams: {...action.payload.prevSearchParams},
                pageable: {...action.payload.pageable},
                isFetching: false,
                didInvalidate: false
            });

        case FAILURE(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                ...state, isFetching: false, didInvalidate: true,
            });

        case REQUEST(GET_SEARCHED_MOVIES_NAMES):
            return Object.assign({}, state, {
                ...state,
            });

        case SUCCESS(GET_SEARCHED_MOVIES_NAMES):
            return Object.assign({}, state, {
                ...state,
                suggestedNames: [...action.payload.suggestedNames]

            });

        case FAILURE(GET_SEARCHED_MOVIES_NAMES):
            return Object.assign({}, state, {
                ...state,
            });

        default:
            return state;
    }
}