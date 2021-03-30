import {
    getMovieGenresFailure,
    getMovieGenresRequest, getMovieGenresSuccess, getSeriesGenresFailure, getSeriesGenresRequest, getSeriesGenresSuccess

} from '../constants';

import {MOVIE_GENRES, MOVIES_MODE, SERIES_GENRES, SERIES_MODE} from "../../Utils/constants";
import {GenresActionGenerateUrl} from "../../Utils/functions";
import {AppDispatch} from "../configureStore";
import axios from "axios";
import {IGenresSearchParams} from "../../Utils/Interfaces/genres";

/**
 * Takes search parameters and and returns a function that makes an API request
 */

export function getGenres(searchParams: IGenresSearchParams) {

    /**
     * Makes an async request, then dispatches actions and returns the state based on the response
     */

    return async (dispatch: AppDispatch) => {
        let requestAction = searchParams.mode === MOVIES_MODE ? getMovieGenresRequest : getSeriesGenresRequest;
        let successAction = searchParams.mode === MOVIES_MODE ? getMovieGenresSuccess : getSeriesGenresSuccess;
        let failureAction = searchParams.mode === MOVIES_MODE ? getMovieGenresFailure : getSeriesGenresFailure;
        let URL_PARTS = {
            route: '',
            apiPath: '',
            otherSettings: '',
        };

        /**
         * Checking the mode
         */
        switch (searchParams.mode) {
            /**
             * If the user searches movies set the appropriate action type and url parts
             */
            case MOVIES_MODE:
                URL_PARTS = MOVIE_GENRES.url_parts;
                break;
            /**
             * If the user searches series set the appropriate action type and url parts
             */
            case SERIES_MODE:
                URL_PARTS = SERIES_GENRES.url_parts;
                break;
            default:
                break;
        }

        dispatch(requestAction())

        try {
            let url = GenresActionGenerateUrl(URL_PARTS)

            const response = await axios.get(url)

            let payload = {
                list: [...response.data.genres],
            }

            dispatch(successAction(payload))

            return {
                ...response.data.genres
            };

        } catch (error) {
            console.log(error)
            dispatch(failureAction())

            return null; // {status: error.response.status, errorMessage: error.response.data.errorMessage};
        }

    }
}

