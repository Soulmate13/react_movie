import {MOVIES_MODE, SERIES_MODE, MOVIES_SEARCH_URL_PARTS, SERIES_SEARCH_URL_PARTS} from "./constants";


export function searchActionGenerateUrl(searchParams) {

    switch (searchParams.mode) {

        case MOVIES_MODE: {
            let url;
            const page = MOVIES_SEARCH_URL_PARTS.page + searchParams.page;
            const year = MOVIES_SEARCH_URL_PARTS.year + searchParams.year;
            const query = MOVIES_SEARCH_URL_PARTS.query + searchParams.query;
            const apiPath = MOVIES_SEARCH_URL_PARTS.apiPath
            url = MOVIES_SEARCH_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + MOVIES_SEARCH_URL_PARTS.otherSettings + query;
            console.log(url)
            return url
        }
        case SERIES_MODE: {
            let url;
            const page = SERIES_SEARCH_URL_PARTS.page + searchParams.page;
            const apiPath = SERIES_SEARCH_URL_PARTS.apiPath
            const year = SERIES_SEARCH_URL_PARTS.year + searchParams.year;
            const query = SERIES_SEARCH_URL_PARTS.query + searchParams.query;
            url = SERIES_SEARCH_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + SERIES_SEARCH_URL_PARTS.otherSettings + query;
            return url
        }
        default:
            break;

    }
}