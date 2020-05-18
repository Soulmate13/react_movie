import {
    MOVIES_MODE,
    SERIES_MODE,
} from "./constants";


/**
 * Takes url parameters and corresponding API strings and generates the request url via concatenation,
 * differentiating between movies and seres with the help of the mode parameter
 * @param {object} searchParams - Contains parameter parts of the url and operating mode (movies or series)
 * @param {object} SEARCH_URL_PARTS - Contains strings to prepend to parameter parts of the url
 * @returns {string} A concatenated string representing search url
 */

export function searchActionGenerateUrl(searchParams,SEARCH_URL_PARTS) {

    switch (searchParams.mode) {

        case MOVIES_MODE: {
            let url;
            const route = SEARCH_URL_PARTS.route
            const apiKey = SEARCH_URL_PARTS.apiPath + process.env.REACT_APP_API_KEY;
            const page = SEARCH_URL_PARTS.page + searchParams.page;
            const year = SEARCH_URL_PARTS.year + searchParams.year;
            const otherSettings = SEARCH_URL_PARTS.otherSettings;
            const query = SEARCH_URL_PARTS.query + searchParams.query;
            url = route + apiKey + page + year + otherSettings + query;
            return url
        }
        case SERIES_MODE: {
            let url;
            const route = SEARCH_URL_PARTS.route
            const page = SEARCH_URL_PARTS.page + searchParams.page;
            const apiKey = SEARCH_URL_PARTS.apiPath + process.env.REACT_APP_API_KEY;
            const year = SEARCH_URL_PARTS.year + searchParams.year;
            const otherSettings = SEARCH_URL_PARTS.otherSettings;
            const query = SEARCH_URL_PARTS.query + searchParams.query;
            url = route + apiKey + page + year + otherSettings + query;
            return url
        }
        default:
            break;

    }
}

/**
 * Takes url parameters and corresponding API strings and generates the request url via concatenation,
 * differentiating between movies and seres with the help of the mode parameter
 * @param {object} searchParams - Contains parameter parts of the url and operating mode (movies or series)
 * @param {object} SEARCH_URL_PARTS - Contains strings to prepend to parameter parts of the url
 * @returns {string} A concatenated string representing discover url
 */

export function discoverActionGenerateUrl(searchParams,SEARCH_URL_PARTS) {

    switch (searchParams.mode) {

        case MOVIES_MODE: {
            let url;
            const page = SEARCH_URL_PARTS.page + searchParams.page;
            const year = SEARCH_URL_PARTS.year + searchParams.year;
            const apiPath = SEARCH_URL_PARTS.apiPath;
            const genres = SEARCH_URL_PARTS.genres + searchParams.genres.toString();
            const filterCriterion = SEARCH_URL_PARTS.filterCriterion + searchParams.filterCriterion
            url = SEARCH_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + SEARCH_URL_PARTS.otherSettings + genres + filterCriterion;
            return url
        }
        case SERIES_MODE: {
            let url;
            const page = SEARCH_URL_PARTS.page + searchParams.page;
            const year = SEARCH_URL_PARTS.year + searchParams.year;
            const apiPath = SEARCH_URL_PARTS.apiPath;
            const genres = SEARCH_URL_PARTS.genres + searchParams.genres.toString();
            const filterCriterion = SEARCH_URL_PARTS.filterCriterion + searchParams.filterCriterion
            url = SEARCH_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + SEARCH_URL_PARTS.otherSettings + genres + filterCriterion;
            return url
        }
        default:
            break;

    }
}

/**
 * Takes url parameters and corresponding API strings and generates the request url via concatenation,
 * differentiating between movies and seres with the help of the mode parameter
 * @param {object} searchParams - Contains parameter parts of the url and operating mode (movies or series)
 * @param {object} SEARCH_URL_PARTS - Contains strings to prepend to parameter parts of the url
 * @returns {string} A concatenated string representing details url
 */

export function getDetailsActionGenerateUrl(searchParams, SEARCH_URL_PARTS) {

    switch (searchParams.mode) {

        case MOVIES_MODE: {
            let url;
            const id = searchParams.id.toString() + '?';
            const apiPath = SEARCH_URL_PARTS.apiPath;
            url = SEARCH_URL_PARTS.route + id + apiPath + process.env.REACT_APP_API_KEY + SEARCH_URL_PARTS.otherSettings;
            return url
        }
        case SERIES_MODE: {
            let url;
            const id = searchParams.id.toString() + '?';
            const apiPath = SEARCH_URL_PARTS.apiPath;
            url = SEARCH_URL_PARTS.route + id + apiPath + process.env.REACT_APP_API_KEY + SEARCH_URL_PARTS.otherSettings;
            return url
        }
        default:
            break;

    }
}
