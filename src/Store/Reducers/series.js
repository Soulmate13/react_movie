import {
    GET_POPULAR_SERIES,
    GET_SEARCHED_SERIES,
    GET_SINGLE_SERIES
} from '../Actions/actionsList';

import {
    SUCCESS,
    REQUEST,
    FAILURE
} from '../constants';

const initialState = {
    singleSeries: {
        isFetching: false,
        didInvalidate: false,
        data: {
            backdrop_path: "",
            first_air_date: "",
            genres: [
                {
                    id: "",
                    name: ""
                },

            ],
            homepage: "",
            id: "",
            in_production: "",
            last_air_date: "",
            name: "",
            number_of_episodes: "",
            number_of_seasons: "",
            origin_country: [
                "US"
            ],
            overview: "",
            poster_path: "",
        }
    },
    searchedSeries: {
        isFetching: false,
        didInvalidate: false,
        list: [],
        pageable: {
            page: 1,
            total_results: 0
        },
        prevSearchParams : {
            query: "",
            year: null,
            yearObj: null
        },
    },
    popularSeries: {
        isFetching: false,
        didInvalidate: false,
        list: [],
        pageable: {
            page: 1,
            total_results: 0
        },
        prevSearchParams : {
            year: null,
            yearObj: null,
            genres: [],
            filterCriterion:"popularity.desc"
        },
    },
    favouriteSeries: {
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

        case REQUEST(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
               searchedSeries: { ...state.searchedSeries, isFetching: true, didInvalidate: false,}
            });

        case SUCCESS(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                searchedSeries: {...state.searchedSeries, list: [...action.payload.list], pageable: {...action.payload.pageable}, prevSearchParams: {...action.payload.prevSearchParams}, isFetching: false, didInvalidate: false,},
            });

        case FAILURE(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                searchedSeries: {...state.searchedSeries, isFetching: false, didInvalidate: true,}
            });

        case REQUEST(GET_POPULAR_SERIES):
            return Object.assign({}, state, {
                popularSeries: { ...state.popularSeries, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_POPULAR_SERIES):
            return Object.assign({}, state, {
                popularSeries: {...state.popularSeries, list: [...action.payload.list], prevSearchParams: {...action.payload.prevSearchParams}, pageable: {...action.payload.pageable}, isFetching: false, didInvalidate: false}
            });

        case FAILURE(GET_POPULAR_SERIES):
            return Object.assign({}, state, {
                popularSeries: {...state.popularSeries, isFetching: false, didInvalidate: true,}
            });

        case REQUEST(GET_SINGLE_SERIES):
            return Object.assign({}, state, {
                singleSeries: { ...state.singleSeries, isFetching: true, didInvalidate: false}
            });

        case SUCCESS(GET_SINGLE_SERIES):
            return Object.assign({}, state, {
                singleSeries: {...state.singleSeries, data: {...action.payload.data}, isFetching: false, didInvalidate: false}
            });

        case FAILURE(GET_SINGLE_SERIES):
            return Object.assign({}, state, {
                singleSeries: {...state.singleSeries, isFetching: false, didInvalidate: true,}
            });

        default:
            return state;
    }
}