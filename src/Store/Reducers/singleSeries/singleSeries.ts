import {
    GET_SINGLE_SERIES
} from '../../Actions/actionsList';


import {
    SUCCESS,
    REQUEST,
    FAILURE, singleSeriesActionCreators
} from '../../constants';
import {ISingleSeries} from "../../../Utils/Interfaces/series";

/**
 * Contains the initial state of the series entity
 */

const initialState: ISingleSeries = {
    isFetching: false,
    didInvalidate: false,
    data: {
        backdrop_path: "",
        created_by: [],
        episode_run_time: [],

        first_air_date: "",
        genres: [
            {
                id: 0,
                name: ""
            },
        ],
        genre_ids: [],
        homepage: "",
        id: 0,
        in_production: false,
        languages: [],
        last_air_date: "",
        last_episode_to_air: {
            air_date: "",
            episode_number: 0,
            id: 0,
            name: "",
            overview: "",
            production_code: "",
            season_number: 1,
            still_path: "",
            vote_average: 0,
            vote_count: 0
        },
        name: "",
        next_episode_to_air: {
            air_date: "",
            episode_number: 0,
            id: 0,
            name: "",
            overview: "",
            production_code: "",
            season_number: 1,
            still_path: "",
            vote_average: 0,
            vote_count: 0
        },
        networks: [],
        number_of_episodes: 0,
        number_of_seasons: 0,
        origin_country: [],
        original_name: "",
        original_language: "",
        overview: "",
        popularity: 0,
        poster_path: "",
        production_companies: [],
        production_countries: [],
        seasons: [
            {
                air_date: "",
                episode_count: 0,
                id: 0,
                name: "",
                overview: "",
                poster_path: "",
                season_number: 0
            }
        ],
        spoken_languages: [],
        status: "",
        tagline: "",
        type: "",
        vote_average: 0,
        vote_count: 0
    }
}

/**
 * Calculates the next state of the movies entity and returns it
 */

export default function reducer (state: ISingleSeries = initialState, action: singleSeriesActionCreators): ISingleSeries {
    switch (action.type) {

        case REQUEST(GET_SINGLE_SERIES):
            return Object.assign({}, state, {
                ...state, isFetching: true, didInvalidate: false
            });

        case SUCCESS(GET_SINGLE_SERIES):
            return Object.assign({}, state, {
                ...state,
                data: {...action.payload.data},
                isFetching: false,
                didInvalidate: false
            });

        case FAILURE(GET_SINGLE_SERIES):
            return Object.assign({}, state, {
                ...state, isFetching: false, didInvalidate: true,
            });

        default:
            return state;
    }
}