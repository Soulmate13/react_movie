import {GET_SINGLE_MOVIE, GET_SINGLE_SERIES} from './actionsList';
import {
    SUCCESS,
    REQUEST,
    FAILURE
} from '../constants';

import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";

import axios from 'axios';
import {getDetailsActionGenerateUrl} from "../../Utils/functions";

export function getDetails(searchParams) {
    return async (dispatch, getState) => {
        let actionType = null;
        switch (searchParams.mode) {
            case MOVIES_MODE:
                actionType = GET_SINGLE_MOVIE;
                break;
            case SERIES_MODE:
                actionType = GET_SINGLE_SERIES;
                break;
            default:
                break;
        }

        dispatch({
            type: REQUEST(actionType),
        })

        try {
            let url = getDetailsActionGenerateUrl(searchParams)
            const response = await axios.get(url);
            console.log(response.data)
            dispatch({
                type: SUCCESS(actionType),
                payload: {data: {...response.data}}
            })

            return {
                ...response.data
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

