import {
    getPopularMoviesRequest,
    getPopularSeriesRequest,
    getPopularMoviesSuccess,
    getPopularMoviesFailure,
    getPopularSeriesSuccess, getPopularSeriesFailure
} from '../constants';

import {DISCOVER_METHOD, MOVIES_DISCOVER, MOVIES_MODE, SERIES_DISCOVER, SERIES_MODE} from "../../Utils/constants";

import instance from '../Api'
import {discoverActionGenerateUrl} from "../../Utils/functions";
import {IDiscoverParams} from "../../Utils/Interfaces/discover";
import {AppDispatch} from "../configureStore";

export function getPopular(searchParams: IDiscoverParams) {
    return async (dispatch: AppDispatch) => {
        let requestAction = searchParams.mode === MOVIES_MODE ? getPopularMoviesRequest : getPopularSeriesRequest;
        let successAction = searchParams.mode === MOVIES_MODE ? getPopularMoviesSuccess : getPopularSeriesSuccess;
        let failureAction = searchParams.mode === MOVIES_MODE ? getPopularMoviesFailure : getPopularSeriesFailure;
        let URL_PARTS = {
            route: "",
            apiPath: "",
            page: "",
            year: "",
            otherSettings: "",
            genres: "",
            filterCriterion: ""
        }
        const method = DISCOVER_METHOD;
        switch (searchParams.mode) {
            case MOVIES_MODE:
                URL_PARTS = MOVIES_DISCOVER.url_parts;
                break;
            case SERIES_MODE:
                URL_PARTS = SERIES_DISCOVER.url_parts;
                break;
            default:
                break;
        }

        dispatch(requestAction())

        try {
            let url = discoverActionGenerateUrl(searchParams, URL_PARTS)
            const response = await instance({
                method: method,
                url: url
            })
            console.log(response)

            let payload = {
                list: [...response.data.results],
                prevSearchParams: {
                    year: searchParams.year,
                    genres: searchParams.genres,
                    filterCriterion: searchParams.filterCriterion
                },
                pageable: {page: response.data.page, total_results: response.data.total_results}
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