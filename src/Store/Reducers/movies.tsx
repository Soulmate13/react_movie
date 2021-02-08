import {GET_POPULAR_MOVIES, GET_SEARCHED_MOVIES, GET_SINGLE_MOVIE} from '../Actions/actionsList';
import {SUCCESS, REQUEST, FAILURE, moviesActionCreators} from '../constants';
import {IMoviesInitialState} from "../../Utils/Interfaces/movies";


/**
 * Contains the initial state of the movies entity
 */

const initialState: IMoviesInitialState = {
    singleMovie: {
        isFetching: false,
        didInvalidate: false,
        data: {
            adult: false,
            backdrop_path: "",
            belongs_to_collection: null,
            budget: 0,
            genres: [
                {
                    id: 0,
                    name: ""
                },
            ],
            homepage: "",
            id: 0,
            imdb_id: "",
            original_language: "",
            original_title: "",
            overview: "",
            popularity: 0,
            poster_path: "",
            production_companies: [{
                id: 0,
                logo_path: "",
                name: "",
                origin_country: ""
            }],
            production_countries: [{
                iso_3166_1: "",
                name: ""
            }],
            release_date: "",
            revenue: 0,
            runtime: 0,
            spoken_languages: [
                {
                    english_name: "English",
                    iso_639_1: "en",
                    name: "English"
                }],
            status: "Rumored",
            tagline: "",
            title: "",
            video: false,
            vote_average: 0,
            vote_count: 0,
        }
    },
    searchedMovies: {
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
    },
    popularMovies: {
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
    },
    favouriteMovies: {
        isFetching: false,
        didInvalidate: false,
        list: [],
        pageable: {
            page: undefined,
            total_results: 0
        },
    },
}

/**
 * Calculates the next state of the movies entity and returns it
 */

export default function (state: IMoviesInitialState = initialState, action: moviesActionCreators): IMoviesInitialState {
    switch (action.type) {

        case REQUEST(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                searchedMovies: {...state.searchedMovies, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                searchedMovies: {
                    ...state.searchedMovies,
                    list: [...action.payload.list],
                    prevSearchParams: {...action.payload.prevSearchParams},
                    pageable: {...action.payload.pageable},
                    isFetching: false,
                    didInvalidate: false
                }
            });

        case FAILURE(GET_SEARCHED_MOVIES):
            return Object.assign({}, state, {
                searchedMovies: {...state.searchedMovies, isFetching: false, didInvalidate: true,}
            });

        case REQUEST(GET_POPULAR_MOVIES):
            return Object.assign({}, state, {
                popularMovies: {...state.popularMovies, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_POPULAR_MOVIES):
            return Object.assign({}, state, {
                popularMovies: {
                    ...state.popularMovies,
                    list: [...action.payload.list],
                    prevSearchParams: {...action.payload.prevSearchParams},
                    pageable: {...action.payload.pageable},
                    isFetching: false,
                    didInvalidate: false
                }
            });

        case FAILURE(GET_POPULAR_MOVIES):
            return Object.assign({}, state, {
                popularMovies: {...state.popularMovies, isFetching: false, didInvalidate: true,}
            });

        case REQUEST(GET_SINGLE_MOVIE):
            return Object.assign({}, state, {
                singleMovie: {...state.singleMovie, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_SINGLE_MOVIE):
            return Object.assign({}, state, {
                singleMovie: {
                    ...state.singleMovie,
                    data: {...action.payload.data},
                    isFetching: false,
                    didInvalidate: false
                }
            });

        case FAILURE(GET_SINGLE_MOVIE):
            return Object.assign({}, state, {
                singleMovie: {...state.singleMovie, isFetching: false, didInvalidate: true,}
            });

        default:
            return state;
    }
}