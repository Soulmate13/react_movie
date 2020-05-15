import {
    MOVIES_MODE,
    SERIES_MODE,
    MOVIES_DISCOVER_URL_PARTS,
    SERIES_DISCOVER_URL_PARTS, MOVIES_GET_DETAILS_URL_PARTS, SERIES_GET_DETAILS_URL_PARTS
} from "./constants";


/**
 * Takes url search parameters and corresponding API strings and generates request url via concatenation,
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

export function discoverActionGenerateUrl(searchParams) {

    switch (searchParams.mode) {

        case MOVIES_MODE: {
            let url;
            const page = MOVIES_DISCOVER_URL_PARTS.page + searchParams.page;
            const year = MOVIES_DISCOVER_URL_PARTS.year + searchParams.year;
            const apiPath = MOVIES_DISCOVER_URL_PARTS.apiPath;
            const genres = MOVIES_DISCOVER_URL_PARTS.genres + searchParams.genres.toString();
            const filterCriterion = MOVIES_DISCOVER_URL_PARTS.filterCriterion + searchParams.filterCriterion
            url = MOVIES_DISCOVER_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + MOVIES_DISCOVER_URL_PARTS.otherSettings + genres + filterCriterion;
            return url
        }
        case SERIES_MODE: {
            let url;
            const page = SERIES_DISCOVER_URL_PARTS.page + searchParams.page;
            const year = SERIES_DISCOVER_URL_PARTS.year + searchParams.year;
            const apiPath = SERIES_DISCOVER_URL_PARTS.apiPath;
            const genres = SERIES_DISCOVER_URL_PARTS.genres + searchParams.genres.toString();
            const filterCriterion = SERIES_DISCOVER_URL_PARTS.filterCriterion + searchParams.filterCriterion
            url = SERIES_DISCOVER_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + MOVIES_DISCOVER_URL_PARTS.otherSettings + genres + filterCriterion;
            console.log(url)
            return url
        }
        default:
            break;

    }
}

export function getDetailsActionGenerateUrl(searchParams) {

    switch (searchParams.mode) {

        case MOVIES_MODE: {
            let url;
            const id = searchParams.id.toString() + '?';
            const apiPath = MOVIES_GET_DETAILS_URL_PARTS.apiPath;
            url = MOVIES_GET_DETAILS_URL_PARTS.route + id + apiPath + process.env.REACT_APP_API_KEY + MOVIES_GET_DETAILS_URL_PARTS.otherSettings;
            return url
        }
        case SERIES_MODE: {
            let url;
            const id = searchParams.id.toString() + '?';
            const apiPath = SERIES_GET_DETAILS_URL_PARTS.apiPath;
            url = SERIES_GET_DETAILS_URL_PARTS.route + id + apiPath + process.env.REACT_APP_API_KEY + SERIES_GET_DETAILS_URL_PARTS.otherSettings;
            return url
        }
        default:
            break;

    }
}
