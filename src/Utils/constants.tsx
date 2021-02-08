/**
 * @file Contains utility constants for the project.
 * @module Constants
 * @author Hlib Zhurba
 */

import {ISearchUrlParts} from "./Interfaces/search";
import {IDiscoverUrlParts} from "./Interfaces/discover";
import {IGetDetailsUrlParts} from "./Interfaces/details";
import {IFilterCriteria, IGenresList, ModeType} from "./Interfaces/interfaces";


/**
 * Describes mode for searching or discovering movies.
 */
export const MOVIES_MODE: ModeType = "MOVIES_MODE";

/**
 * Describes request method for discover component.
 */
export const DISCOVER_METHOD: "GET" = "GET";
export const SEARCH_METHOD: "GET" = "GET";
export const GET_DETAILS_METHOD: "GET" = "GET";

/**
 * Describes url parts to append to search movie parameters and request method.
 */
export const MOVIES_SEARCH: { url_parts: ISearchUrlParts} = {
    url_parts: {
        route: 'https://api.themoviedb.org/3/search/movie?',
        apiPath: 'api_key=',
        page: "&page=",
        year: "&primary_release_year=",
        otherSettings: '&language=en-US&include_adult=false&include_video=false',
        query: '&query=',
    }}

/**
 * Describes url parts to append to discover movie parameters
 */
export const MOVIES_DISCOVER: { url_parts: IDiscoverUrlParts } = {
    url_parts: {
        route: 'https://api.themoviedb.org/3/discover/movie?',
        apiPath: 'api_key=',
        page: "&page=",
        year: "&primary_release_year=",
        otherSettings: '&language=en-US&include_adult=false&include_video=false',
        genres: '&with_genres=',
        filterCriterion: '&sort_by=',
    },
}

/**
 * Describes url parts to append to single movie details parameters
 */
export const MOVIES_GET_DETAILS: { url_parts: IGetDetailsUrlParts } = {
    url_parts: {
        route: 'https://api.themoviedb.org/3/movie/',
        apiPath: 'api_key=',
        otherSettings: '&language=en-US',
    }
}

/**
 * Describes mode for searching or discovering series
 */
export const SERIES_MODE: ModeType = "SERIES_MODE"

/**
 * Describes url parts to append to search series parameters and request method
 */
export const SERIES_SEARCH: { url_parts: ISearchUrlParts } = {
    url_parts: {
        route: 'https://api.themoviedb.org/3/search/tv?',
        apiPath: 'api_key=',
        page: "&page=",
        year: "&first_air_date_year=",
        otherSettings: '&language=en-US&',
        query: '&query=',
    },
}

/**
 * Describes url parts to append to discover series parameters
 */
export const SERIES_DISCOVER: { url_parts: IDiscoverUrlParts } = {
    url_parts: {
        route: 'https://api.themoviedb.org/3/discover/tv?',
        apiPath: 'api_key=',
        page: "&page=",
        year: "&first_air_date_year=",
        otherSettings: '&language=en-US&include_adult=false&include_video=false',
        genres: '&with_genres=',
        filterCriterion: '&sort_by=',
    }
}

/**
 * Describes url parts to append to single series details parameters
 */
export const SERIES_GET_DETAILS: { url_parts: IGetDetailsUrlParts } = {
    url_parts: {
        route: 'https://api.themoviedb.org/3/tv/',
        apiPath: 'api_key=',
        otherSettings: '&language=en-US',
    }
}

/**
 * Describes list of genres available for filtering
 */

export const genresList : Array<IGenresList> = [
    {
        value: 28,
        title: "Action"
    },
    {
        value: 12,
        title: "Adventure"
    },
    {
        value: 16,
        title: "Animation"
    },
    {
        value: 35,
        title: "Comedy"
    },
    {
        value: 80,
        title: "Crime"
    },
    {
        value: 99,
        title: "Documentary"
    },
    {
        value: 18,
        title: "Drama"
    },
    {
        value: 10751,
        title: "Family"
    },
    {
        value: 14,
        title: "Fantasy"
    },
    {
        value: 36,
        title: "History"
    },
    {
        value: 27,
        title: "Horror"
    },
    {
        value: 10402,
        title: "Music"
    },
    {
        value: 9648,
        title: "Mystery"
    },
    {
        value: 10749,
        title: "Romance"
    },
    {
        value: 878,
        title: "Science Fiction"
    },
    {
        value: 10770,
        title: "TV Movie"
    },
    {
        value: 53,
        title: "Thriller"
    },
    {
        value: 10752,
        title: "War"
    },
    {
        value: 37,
        title: "Western"
    }
]

/**
 * Describes list of filters for movies and series
 */

export const filterCriteria : Array<IFilterCriteria> = [
    {
        value: "popularity.desc",
        title: "Most popular"
    },
    {
        value: "popularity.asc",
        title: "Least popular"
    },
    {
        value: "primary_release_date.desc",
        title: "Most recent"
    },
    {
        value: "primary_release_date.asc",
        title: "Least recent"
    }
]