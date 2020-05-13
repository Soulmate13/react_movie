import {GET_SEARCHED_SERIES} from '../Actions/actionsList';

import {
    SUCCESS,
    REQUEST,
    FAILURE
} from '../constants';

const initialState = {
    singleSeries: {
        isFetching: false,
        didInvalidate: false,
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
    },
    searchedSeries: {
        isFetching: false,
        didInvalidate: false,
        list: [],
        pageable: {
            page: 1,
            total_results: 0
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
               searchedSeries: { isFetching: true, didInvalidate: false,}
            });

        case SUCCESS(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                searchedSeries: {list: [...action.payload.list], pageable: {...action.payload.pageable}, isFetching: false, didInvalidate: false,},
            });

        case FAILURE(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                searchedSeries: {isFetching: false, didInvalidate: true,}
            });
        default:
            return state;
    }
}