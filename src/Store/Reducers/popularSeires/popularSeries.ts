import {
    GET_POPULAR_SERIES,
} from '../../Actions/actionsList';


import {
    SUCCESS,
    REQUEST,
    FAILURE, popularSeriesActionCreators
} from '../../constants';
import {IPopularSeries} from "../../../Utils/Interfaces/series";

/**
 * Contains the initial state of the series entity
 */

const initialState: IPopularSeries = {
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

export default function reducer (state: IPopularSeries = initialState, action: popularSeriesActionCreators): IPopularSeries {
    switch (action.type) {

        case REQUEST(GET_POPULAR_SERIES):
            return Object.assign({}, state, {
                ...state, isFetching: true, didInvalidate: false
            });

        case SUCCESS(GET_POPULAR_SERIES):
            return Object.assign({}, state, {
                ...state,
                list: [...action.payload.list],
                prevSearchParams: {...action.payload.prevSearchParams},
                pageable: {...action.payload.pageable},
                isFetching: false,
                didInvalidate: false
            });

        case FAILURE(GET_POPULAR_SERIES):
            return Object.assign({}, state, {
                ...state, isFetching: false, didInvalidate: true,
            });

        default:
            return state;
    }
}