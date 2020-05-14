import {
    MOVIES_MODE,
    SERIES_MODE,
    MOVIES_SEARCH_URL_PARTS,
    MOVIES_DISCOVER_URL_PARTS,
    SERIES_SEARCH_URL_PARTS,
    SERIES_DISCOVER_URL_PARTS, MOVIES_GET_DETAILS_URL_PARTS, SERIES_GET_DETAILS_URL_PARTS
} from "./constants";


export function searchActionGenerateUrl(searchParams) {

    switch (searchParams.mode) {

        case MOVIES_MODE: {
            let url;
            const page = MOVIES_SEARCH_URL_PARTS.page + searchParams.page;
            const year = MOVIES_SEARCH_URL_PARTS.year + searchParams.year;
            const query = MOVIES_SEARCH_URL_PARTS.query + searchParams.query;
            const apiPath = MOVIES_SEARCH_URL_PARTS.apiPath
            url = MOVIES_SEARCH_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + MOVIES_SEARCH_URL_PARTS.otherSettings + query;
            return url
        }
        case SERIES_MODE: {
            let url;
            const page = SERIES_SEARCH_URL_PARTS.page + searchParams.page;
            const apiPath = SERIES_SEARCH_URL_PARTS.apiPath;
            const year = SERIES_SEARCH_URL_PARTS.year + searchParams.year;
            const query = SERIES_SEARCH_URL_PARTS.query + searchParams.query;
            url = SERIES_SEARCH_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + SERIES_SEARCH_URL_PARTS.otherSettings + query;
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
            const query = MOVIES_DISCOVER_URL_PARTS.query + searchParams.query;
            const apiPath = MOVIES_DISCOVER_URL_PARTS.apiPath;
            const genres = MOVIES_DISCOVER_URL_PARTS.genres + searchParams.genres.toString();
            const filterCriterion = MOVIES_DISCOVER_URL_PARTS.filterCriterion + searchParams.filterCriterion
            url = MOVIES_DISCOVER_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + MOVIES_DISCOVER_URL_PARTS.otherSettings + genres + filterCriterion + query;
            return url
        }
        case SERIES_MODE: {
            let url;
            const page = SERIES_DISCOVER_URL_PARTS.page + searchParams.page;
            const year = SERIES_DISCOVER_URL_PARTS.year + searchParams.year;
            const query = SERIES_DISCOVER_URL_PARTS.query + searchParams.query;
            const apiPath = SERIES_DISCOVER_URL_PARTS.apiPath;
            const genres = SERIES_DISCOVER_URL_PARTS.genres + searchParams.genres.toString();
            const filterCriterion = SERIES_DISCOVER_URL_PARTS.filterCriterion + searchParams.filterCriterion
            url = SERIES_DISCOVER_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + MOVIES_DISCOVER_URL_PARTS.otherSettings + genres + filterCriterion + query;
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
