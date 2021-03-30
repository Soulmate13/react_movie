import {
    getSingleMovieSuccess,
    getSingleMovieFailure,
    getSingleSeriesSuccess, getSingleMovieRequest, getSingleSeriesFailure, getSingleSeriesRequest
} from '../../constants';

import {
    MOVIES_GET_DETAILS,
    MOVIES_MODE,
    SERIES_GET_DETAILS,
} from "../../../Utils/constants";

import {getDetailsActionGenerateUrl} from "../../../Utils/functions";
import {IGetDetailsParams} from "../../../Utils/Interfaces/details";
import {AppDispatch} from "../../configureStore";
import axios from "axios";

export function getDetails(searchParams: IGetDetailsParams) {
    return (dispatch: AppDispatch) => {
        let requestAction = searchParams.mode === MOVIES_MODE ? getSingleMovieRequest : getSingleSeriesRequest;
        let successAction = searchParams.mode === MOVIES_MODE ? getSingleMovieSuccess : getSingleSeriesSuccess;
        let failureAction = searchParams.mode === MOVIES_MODE ? getSingleMovieFailure : getSingleSeriesFailure;
        let SEARCH_URL_PARTS = searchParams.mode === MOVIES_MODE ? MOVIES_GET_DETAILS.url_parts : SERIES_GET_DETAILS.url_parts;

        dispatch(requestAction());

        let url = getDetailsActionGenerateUrl(searchParams, SEARCH_URL_PARTS);

        return axios.get(url).then((response) => {

            let payload = {data: {...response.data}};
            // console.log(response.data)
            dispatch(successAction(payload));

            return {
                ...response.data
            };
        }).catch((error) => {
            dispatch(failureAction());

            return null; // {status: error.response.status, errorMessage: error.response.data.errorMessage};
        })


    }
}

