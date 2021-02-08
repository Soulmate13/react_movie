import {
    getSingleMovieSuccess,
    getSingleMovieFailure,
    getSingleSeriesSuccess, getSingleMovieRequest, getSingleSeriesFailure, getSingleSeriesRequest
} from '../constants';

import {
    GET_DETAILS_METHOD,
    MOVIES_GET_DETAILS,
    MOVIES_MODE,
    SERIES_GET_DETAILS,
    SERIES_MODE
} from "../../Utils/constants";

import {getDetailsActionGenerateUrl} from "../../Utils/functions";
import instance from "../Api";
import {IGetDetailsParams} from "../../Utils/Interfaces/details";
import {AppDispatch} from "../configureStore";

export function getDetails(searchParams: IGetDetailsParams) {
    return async (dispatch: AppDispatch) => {
        let requestAction = searchParams.mode === MOVIES_MODE ? getSingleMovieRequest : getSingleSeriesRequest;
        let successAction = searchParams.mode === MOVIES_MODE ? getSingleMovieSuccess : getSingleSeriesSuccess;
        let failureAction = searchParams.mode === MOVIES_MODE ? getSingleMovieFailure : getSingleSeriesFailure;
        let SEARCH_URL_PARTS = {
            route: '',
            apiPath: '',
            otherSettings: '',
        };

        let method = GET_DETAILS_METHOD;
        switch (searchParams.mode) {
            case MOVIES_MODE:
                SEARCH_URL_PARTS = MOVIES_GET_DETAILS.url_parts;
                break;
            case SERIES_MODE:
                SEARCH_URL_PARTS = SERIES_GET_DETAILS.url_parts;
                break;
            default:
                break;
        }

        dispatch(requestAction())

        try {
            let url = getDetailsActionGenerateUrl(searchParams, SEARCH_URL_PARTS)

            const response = await instance({
                method: method,
                url: url
            })

            let payload = {data: {...response.data}};
            console.log(response.data)
            dispatch(successAction(payload))

            return {
                ...response.data
            };

        } catch (error) {
            console.log(error)
            dispatch(failureAction())

            return null; // {status: error.response.status, errorMessage: error.response.data.errorMessage};
        }

    }
}

