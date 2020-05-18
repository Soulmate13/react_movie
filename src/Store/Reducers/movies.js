import {GET_POPULAR_MOVIES, GET_SEARCHED_MOVIES, GET_SINGLE_MOVIE} from '../Actions/actionsList';

import {
    SUCCESS,
    REQUEST,
    FAILURE
} from '../constants';

/**
 * Contains the initial state of the movies entity
 * @category Movies
 * @property {object} singleMovie - Contains the initial state of the single movie
 * @property {object} searchedMovies - Contains the initial state of the searched movies
 * @property {object} popularMovies - Contains the initial state of the discovered popular movies
 * @property {object} favouriteMovies - Contains the initial state of the favourite movies
 * @constant
 */

const initialState = {
    singleMovie: {
        isFetching: false,
        didInvalidate: false,
        data: {
            genres: [
                {
                    id: "",
                    name: ""
                },
            ],
            homepage: "",
            id: "",
            imdb_id: "",
            overview: "",
            popularity: "",
            poster_path: "",
            release_date: "",
            tagline: "",
            title: "",
        }
    },
    searchedMovies: {
        isFetching: false,
        didInvalidate: false,
        prevSearchParams : {
            query: "",
            year: null,
        },
        list: [],
        pageable: {
            page: 1,
            total_results: 0
        },
    },
    popularMovies: {
        isFetching: false,
        didInvalidate: false,
        list: [],
        pageable: {
            page: 1,
            total_results: 0
        },
        prevSearchParams : {
            year: null,
            genres: [],
            filterCriterion:"popularity.desc"
        },
    },
    favouriteMovies: {
        isFetching: false,
        didInvalidate: false,
        list: [],
        pageable: {
            page: 1,
            total_results: 0
        },
    },
}

/**
 * Calculates the next state of the movies entity and returns it
 * @function ReducerFunctionMovies
 * @category Movies
 * @param {object} state - The initial state of the movies entity
 * @param {object} action - Contains the action type and payload
 * @returns {object} The next state of the movies entity
 */

export default function (state = initialState, action) {
    switch (action.type) {

        case REQUEST(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                searchedMovies: { ...state.searchedMovies, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                searchedMovies: {...state.searchedMovies, list: [...action.payload.list], prevSearchParams: {...action.payload.prevSearchParams}, pageable: {...action.payload.pageable}, isFetching: false, didInvalidate: false}
            });

        case FAILURE(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                searchedMovies: {...state.searchedMovies, isFetching: false, didInvalidate: true,}
            });

        case REQUEST(GET_POPULAR_MOVIES):
            return Object.assign({}, state, {
                popularMovies: { ...state.popularMovies, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_POPULAR_MOVIES):
            return Object.assign({}, state, {
                popularMovies: {...state.popularMovies, list: [...action.payload.list], prevSearchParams: {...action.payload.prevSearchParams}, pageable: {...action.payload.pageable}, isFetching: false, didInvalidate: false}
            });

        case FAILURE(GET_POPULAR_MOVIES):
            return Object.assign({}, state, {
                popularMovies: {...state.popularMovies, isFetching: false, didInvalidate: true,}
            });

        case REQUEST(GET_SINGLE_MOVIE):
            return Object.assign({}, state, {
                singleMovie: { ...state.singleMovie, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_SINGLE_MOVIE):
            return Object.assign({}, state, {
                singleMovie: {...state.singleMovie, data: {...action.payload.data}, isFetching: false, didInvalidate: false}
            });

        case FAILURE(GET_SINGLE_MOVIE):
            return Object.assign({}, state, {
                singleMovie: {...state.singleMovie, isFetching: false, didInvalidate: true,}
            });

        default:
            return state;
    }
}