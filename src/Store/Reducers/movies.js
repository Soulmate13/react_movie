import {GET_POPULAR_MOVIES, GET_SEARCHED_MOVIES, GET_SINGLE_MOVIE} from '../Actions/actionsList';

import {
    SUCCESS,
    REQUEST,
    FAILURE
} from '../constants';

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
            year: ""
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
                popularMovies: {...state.popularMovies, list: [...action.payload.list], pageable: {...action.payload.pageable}, isFetching: false, didInvalidate: false}
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