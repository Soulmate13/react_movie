import {GET_SEARCHED_MOVIES, GET_SEARCHED_SERIES} from './actionsList';
import {
    SUCCESS,
    REQUEST,
    FAILURE
} from '../constants';

import {MOVIES_MODE, MOVIES_SEARCH_URL_PARTS, SERIES_SEARCH_URL_PARTS, SERIES_MODE} from "../../Utils/constants";

import axios from 'axios';
import {searchActionGenerateUrl} from "../../Utils/functions";

/**
 * Takes search parameters and and returns a function that makes an API request
 * @param {object} searchParams - Contains parameter parts of the url and operating mode (movies or series)
 * @param {string} searchParams.page - A string representing page
 * @param {string} searchParams.year - A string representing year
 * @param {string} searchParams.query - A string representing query
 * @param {string} searchParams.mode - A string representing mode

 * @returns {function} A function that makes a GET request for the movies or series that match the user input
 */

export function getSearched(searchParams) {

    /**
     * Makes an async request, then dispatches actions and returns the state based on the response
     * @function GetSearchedAsync
     * @param {function} dispatch - Method used to update the store
     * @async
      */

    return async (dispatch) => {
        let actionType = "";
        let URL_PARTS = null;
        /**
         * Checking the mode
         */
        switch (searchParams.mode) {
            /**
             * If the user searches movies set the appropriate action type and url parts
             */
            case MOVIES_MODE:
                actionType = GET_SEARCHED_MOVIES;
                URL_PARTS = MOVIES_SEARCH_URL_PARTS;
                break;
            /**
             * If the user searches series set the appropriate action type and url parts
             */
            case SERIES_MODE:
                actionType = GET_SEARCHED_SERIES;
                URL_PARTS = SERIES_SEARCH_URL_PARTS;
                break;
            default:
                break;
        }

        dispatch({
            type: REQUEST(actionType),
        })

        try {
            let url = searchActionGenerateUrl(searchParams, URL_PARTS)
            const response = await axios.get(url);
            dispatch({
                type: SUCCESS(actionType),
                payload: {list: [...response.data.results], prevSearchParams: {query : searchParams.query, year: searchParams.year}, pageable: {page: response.data.page, total_results: response.data.total_results}}
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

