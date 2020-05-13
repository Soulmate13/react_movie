import {GET_SEARCHED_MOVIES} from '../Actions/actionsList';

import {
    SUCCESS,
    REQUEST,
    FAILURE
} from '../constants';

const initialState = {
    singleMovie: {
        isFetching: false,
        didInvalidate: false,
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
    },
    searchedMovies: {
        isFetching: false,
        didInvalidate: false,
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
                searchedMovies: { ...state.searchedMovies, isFetching: true, didInvalidate: false},
            });

        case SUCCESS(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                searchedMovies: {list: [...action.payload.list], pageable: {...action.payload.pageable}, isFetching: false, didInvalidate: false,},
            });

        case FAILURE(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                searchedMovies: {...state.searchedMovies, isFetching: false, didInvalidate: true,}
            });
        default:
            return state;
    }
}