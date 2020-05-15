import {GET_POPULAR_MOVIES, GET_POPULAR_SERIES} from './actionsList';
import {
    SUCCESS,
    REQUEST,
    FAILURE
} from '../constants';

import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";

import axios from 'axios';
import {discoverActionGenerateUrl} from "../../Utils/functions";

export function getPopular(searchParams) {
    return async (dispatch, getState) => {
        let actionType = null;
        switch (searchParams.mode) {
            case MOVIES_MODE:
                actionType = GET_POPULAR_MOVIES;
                break;
            case SERIES_MODE:
                actionType = GET_POPULAR_SERIES;
                break;
            default:
                break;
        }

        dispatch({
            type: REQUEST(actionType),
        })

        try {
            let url = discoverActionGenerateUrl(searchParams)
            const response = await axios.get(url);
            console.log(response)
            dispatch({
                type: SUCCESS(actionType),
                payload: {list: [...response.data.results], prevSearchParams: {year: searchParams.year, yearObj: searchParams.yearObj, genres: searchParams.genres, filterCriterion: searchParams.filterCriterion},
                pageable: {page: response.data.page, total_results: response.data.total_results}}
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