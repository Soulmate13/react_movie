import {GET_SEARCHED_MOVIES, GET_SEARCHED_SERIES} from './actionsList';
import {
    SUCCESS,
    REQUEST,
    FAILURE
} from '../constants';

import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";

import axios from 'axios';
import {searchActionGenerateUrl} from "../../Utils/functions";

export function getSearched(searchParams) {
    return async (dispatch, getState) => {
        let actionType = null;
        switch (searchParams.mode) {
            case MOVIES_MODE:
                actionType = GET_SEARCHED_MOVIES;
                break;
            case SERIES_MODE:
                actionType = GET_SEARCHED_SERIES;
                break;
            default:
                break;
        }

        dispatch({
            type: REQUEST(actionType),
        })

        try {
            let url = searchActionGenerateUrl(searchParams)
            const response = await axios.get(url);
            console.log(response.data)
            dispatch({
                type: SUCCESS(actionType),
                payload: {list: [...response.data.results], pageable: {page: response.data.page, total_results: response.data.total_results}}
            })

            return {
                ...response.data.results
            };

        } catch (error) {
            console.log(error)
            dispatch({
                type: FAILURE(actionType),
            })

            return null; // {status: error.response.status, errorMessage: error.response.data.errorMessage};
        }

    }
}

