import {GET_SINGLE_MOVIE} from '../../Actions/actionsList';
import {SUCCESS, REQUEST, FAILURE, singleMoviesActionCreators} from '../../constants';
import {ISingleMovie} from "../../../Utils/Interfaces/movies";


/**
 * Contains the initial state of the movies entity
 */

const initialState: ISingleMovie = {
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
}

/**
 * Calculates the next state of the movies entity and returns it
 */

export default function reducer (state: ISingleMovie = initialState, action: singleMoviesActionCreators): ISingleMovie {
    switch (action.type) {

        case REQUEST(GET_SINGLE_MOVIE):
            return Object.assign({}, state, {
                ...state, isFetching: true, didInvalidate: false
            });

        case SUCCESS(GET_SINGLE_MOVIE):
            return Object.assign({}, state, {
                ...state,
                data: {...action.payload.data},
                isFetching: false,
                didInvalidate: false
            });

        case FAILURE(GET_SINGLE_MOVIE):
            return Object.assign({}, state, {
                ...state, isFetching: false, didInvalidate: true,
            });

        default:
            return state;
    }
}