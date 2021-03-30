import {
    GET_SEARCHED_SERIES, GET_SEARCHED_SERIES_NAMES,
} from '../../Actions/actionsList';


import {
    SUCCESS,
    REQUEST,
    FAILURE, searchedSeriesActionCreators
} from '../../constants';
import {ISearchedSeries} from "../../../Utils/Interfaces/series";

/**
 * Contains the initial state of the series entity
 */

const initialState: ISearchedSeries = {
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
    suggestedNames: []

}

/**
 * Calculates the next state of the movies entity and returns it
 */

export default function reducer (state: ISearchedSeries = initialState, action: searchedSeriesActionCreators): ISearchedSeries {
    switch (action.type) {

        case REQUEST(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                ...state, isFetching: true, didInvalidate: false,
            });

        case SUCCESS(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                ...state,
                list: [...action.payload.list],
                pageable: {...action.payload.pageable},
                prevSearchParams: {...action.payload.prevSearchParams},
                isFetching: false,
                didInvalidate: false,

            });

        case FAILURE(GET_SEARCHED_SERIES):
            return Object.assign({}, state, {
                ...state, isFetching: false, didInvalidate: true,
            });

        case REQUEST(GET_SEARCHED_SERIES_NAMES):
            return Object.assign({}, state, {
                ...state,
            });

        case SUCCESS(GET_SEARCHED_SERIES_NAMES):
            return Object.assign({}, state, {
                ...state,
                suggestedNames: [...action.payload.suggestedNames]

            });

        case FAILURE(GET_SEARCHED_SERIES_NAMES):
            return Object.assign({}, state, {
                ...state,
            });

        default:
            return state;
    }
}