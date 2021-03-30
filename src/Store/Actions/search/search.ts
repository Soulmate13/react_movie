import {
    getSearchedMoviesSuccess,
    getSearchedSeriesRequest,
    getSearchedMoviesFailure,
    getSearchedSeriesSuccess,
    getSearchedSeriesFailure,
    getSearchedMoviesRequest,
    getSearchedSeriesNamesRequest,
    getSearchedSeriesNamesSuccess,
    getSearchedSeriesNamesFailure,
    getSearchedMoviesNamesRequest, getSearchedMoviesNamesSuccess, getSearchedMoviesNamesFailure
} from '../../constants';

import {MOVIES_MODE, MOVIES_SEARCH, SERIES_SEARCH, SERIES_MODE, SEARCH_METHOD} from "../../../Utils/constants";

import instance from '../../Api'
import {searchActionGenerateUrl} from "../../../Utils/functions";
import {ISearchParams} from "../../../Utils/Interfaces/search";
import {AppDispatch} from "../../configureStore";
import axios from "axios";

/**
 * Takes search parameters and and returns a function that makes an API request
 */

export function getSearched(searchParams: ISearchParams) {

    /**
     * Makes an async request, then dispatches actions and returns the state based on the response
     */

    return (dispatch: AppDispatch) => {
        let requestAction = searchParams.mode === MOVIES_MODE ? getSearchedMoviesRequest : getSearchedSeriesRequest;
        let successAction = searchParams.mode === MOVIES_MODE ? getSearchedMoviesSuccess : getSearchedSeriesSuccess;
        let failureAction = searchParams.mode === MOVIES_MODE ? getSearchedMoviesFailure : getSearchedSeriesFailure;
        let URL_PARTS = {
            route: '',
            apiPath: '',
            page: "",
            year: "",
            otherSettings: '',
            query: '',
        };
        let method = SEARCH_METHOD;
        /**
         * Checking the mode
         */
        switch (searchParams.mode) {
            /**
             * If the user searches movies set the appropriate action type and url parts
             */
            case MOVIES_MODE:
                URL_PARTS = MOVIES_SEARCH.url_parts;
                break;
            /**
             * If the user searches series set the appropriate action type and url parts
             */
            case SERIES_MODE:
                URL_PARTS = SERIES_SEARCH.url_parts;
                break;
            default:
                break;
        }

        dispatch(requestAction())


        let url = searchActionGenerateUrl(searchParams, URL_PARTS)

        return axios.get(url).then((response) => {
            let payload = {
                list: [...response.data.results],
                prevSearchParams: {query: searchParams.query, year: searchParams.year},
                pageable: {page: response.data.page, total_results: response.data.total_results}
            }

            dispatch(successAction(payload))

            console.log(response)

            return {
                ...response.data.results
            };

        }).catch((error) => {
            dispatch(failureAction())

            return null; // {status: error.response.status, errorMessage: error.response.data.errorMessage};
        })

    }
}

export function getSearchedNames(searchParams: ISearchParams) {

    /**
     * Makes an async request, then dispatches actions and returns the state based on the response
     */

    return async (dispatch: AppDispatch) => {
        let requestAction = searchParams.mode === MOVIES_MODE ? getSearchedMoviesNamesRequest : getSearchedSeriesNamesRequest;
        let successAction = searchParams.mode === MOVIES_MODE ? getSearchedMoviesNamesSuccess : getSearchedSeriesNamesSuccess;
        let failureAction = searchParams.mode === MOVIES_MODE ? getSearchedMoviesNamesFailure : getSearchedSeriesNamesFailure;
        let URL_PARTS = {
            route: '',
            apiPath: '',
            page: "",
            year: "",
            otherSettings: '',
            query: '',
        };
        let method = SEARCH_METHOD;
        /**
         * Checking the mode
         */
        switch (searchParams.mode) {
            /**
             * If the user searches movies set the appropriate action type and url parts
             */
            case MOVIES_MODE:
                URL_PARTS = MOVIES_SEARCH.url_parts;
                break;
            /**
             * If the user searches series set the appropriate action type and url parts
             */
            case SERIES_MODE:
                URL_PARTS = SERIES_SEARCH.url_parts;
                break;
            default:
                break;
        }

        dispatch(requestAction())

        try {
            let url = searchActionGenerateUrl(searchParams, URL_PARTS)

            const response = await instance({
                method: method,
                url: url,
            })

            let responseList = [...response.data.results];

            let names: Array<{ value: string, key: number }> = [];

            responseList.forEach(element => {
                searchParams.mode === MOVIES_MODE ? names.push({
                    value: element.title,
                    key: element.id
                }) : names.push({value: element.name, key: element.id});
            })

            let filteredNames = names.filter(item => item.value.toLowerCase().startsWith(searchParams.query.toLowerCase()));

            let uniqueNames = [...new Set(filteredNames.map(item => item.value))].map(value => {
                return filteredNames.find(item => item.value === value);
            })

            let slicedUniqueNames = uniqueNames.slice(0, 10);

            let payload = {
                // list: [...response.data.results],
                suggestedNames: [...slicedUniqueNames]
            }

            dispatch(successAction(payload))

            return {
                ...response.data.results
            };

        } catch (error) {
            console.log(error)
            dispatch(failureAction())

            return null; // {status: error.response.status, errorMessage: error.response.data.errorMessage};
        }

    }
}