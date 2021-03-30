import {GET_POPULAR_MOVIES} from '../../Actions/actionsList';
import {SUCCESS, REQUEST, FAILURE, popularMoviesActionCreators} from '../../constants';
import {IPopularMovies} from "../../../Utils/Interfaces/movies";


/**
 * Contains the initial state of the movies entity
 */

const initialState: IPopularMovies = {
    isFetching: false,
    didInvalidate: false,
    list: [],
    pageable: {
        page: undefined,
        total_results: 0
    },
    prevSearchParams: {
        year: null,
        genres: [],
        filterCriterion: "popularity.desc",
        page: undefined
    },
}

/**
 * Calculates the next state of the movies entity and returns it
 */

export default function reducer (state: IPopularMovies = initialState, action: popularMoviesActionCreators): IPopularMovies {
    switch (action.type) {

        case REQUEST(GET_POPULAR_MOVIES):
            return Object.assign({}, state, {
                ...state, isFetching: true, didInvalidate: false
            });

        case SUCCESS(GET_POPULAR_MOVIES):
            return Object.assign({}, state, {
                ...state,
                list: [...action.payload.list],
                prevSearchParams: {...action.payload.prevSearchParams},
                pageable: {...action.payload.pageable},
                isFetching: false,
                didInvalidate: false
            });

        case FAILURE(GET_POPULAR_MOVIES):
            return Object.assign({}, state, {
                ...state, isFetching: false, didInvalidate: true,
            });

        default:
            return state;
    }
}