import {
    GET_POPULAR_SERIES,
    GET_SEARCHED_SERIES,
    GET_SINGLE_SERIES
} from '../Actions/actionsList';


import {
    SUCCESS,
    REQUEST,
    FAILURE, seriesActionCreators
} from '../constants';
import {ISeriesInitialState} from "../../Utils/Interfaces/series";

/**
 * Contains the initial state of the series entity
 */

const initialState: ISeriesInitialState = {
    singleSeries: {
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
    },
    searchedSeries: {
        isFetching: false,
        didInvalidate: false,
        list: [],
        pageable: {
            page: undefined,
            total_results: 0
        },
        prevSearchParams: {
            query: "",
            year: null,
        },
    },
    popularSeries: {
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
            filterCriterion: "popularity.desc"
        },
    },
    favouriteSeries: {
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

export default function (state = initialState, action: seriesActionCreators): ISeriesInitialState {
    switch (action.type) {

        case REQUEST(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                searchedSeries: {...state.searchedSeries, isFetching: true, didInvalidate: false,}
            });

        case SUCCESS(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                searchedSeries: {
                    ...state.searchedSeries,
                    list: [...action.payload.list],
                    pageable: {...action.payload.pageable},
                    prevSearchParams: {...action.payload.prevSearchParams},
                    isFetching: false,
                    didInvalidate: false,
                },
            });

        case FAILURE(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                searchedSeries: {...state.searchedSeries, isFetching: false, didInvalidate: true,}
            });

        case REQUEST(GET_POPULAR_SERIES):
            return Object.assign({}, state, {
                popularSeries: {...state.popularSeries, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_POPULAR_SERIES):
            return Object.assign({}, state, {
                popularSeries: {
                    ...state.popularSeries,
                    list: [...action.payload.list],
                    prevSearchParams: {...action.payload.prevSearchParams},
                    pageable: {...action.payload.pageable},
                    isFetching: false,
                    didInvalidate: false
                }
            });

        case FAILURE(GET_POPULAR_SERIES):
            return Object.assign({}, state, {
                popularSeries: {...state.popularSeries, isFetching: false, didInvalidate: true,}
            });

        case REQUEST(GET_SINGLE_SERIES):
            return Object.assign({}, state, {
                singleSeries: {...state.singleSeries, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_SINGLE_SERIES):
            return Object.assign({}, state, {
                singleSeries: {
                    ...state.singleSeries,
                    data: {...action.payload.data},
                    isFetching: false,
                    didInvalidate: false
                }
            });

        case FAILURE(GET_SINGLE_SERIES):
            return Object.assign({}, state, {
                singleSeries: {...state.singleSeries, isFetching: false, didInvalidate: true,}
            });

        default:
            return state;
    }
}