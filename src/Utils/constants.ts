/**
 * @file Contains utility constants for the project.
 * @module Constants
 * @author Hlib Zhurba
 */

import {ISearchUrlParts} from "./Interfaces/search";
import {IDiscoverUrlParts} from "./Interfaces/discover";
import {IGetDetailsUrlParts} from "./Interfaces/details";
import {IFilterCriteria, ModeType} from "./Interfaces/interfaces";
import {IGenresUrlParts} from "./Interfaces/genres";


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
export const MOVIES_SEARCH: { url_parts: ISearchUrlParts } = {
    url_parts: {
        route: 'https://api.themoviedb.org/3/search/movie?',
        apiPath: 'api_key=',
        page: "&page=",
        year: "&primary_release_year=",
        otherSettings: '&language=en-US&include_adult=false&include_video=false',
        query: '&query=',
    }
}

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
 * Describes url parts to append for movie genre request
 */
export const MOVIE_GENRES: { url_parts: IGenresUrlParts } = {
    url_parts: {
        route: 'https://api.themoviedb.org/3/genre/movie/list?',
        apiPath: 'api_key=',
        otherSettings: '&language=en-US',
    }
}

/**
 * Describes url parts to append for series genre request
 */
export const SERIES_GENRES: { url_parts: IGenresUrlParts } = {
    url_parts: {
        route: 'https://api.themoviedb.org/3/genre/tv/list?',
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
 * Describes list of filters for movies and series
 */

export const filterCriteriaSeries: Array<IFilterCriteria> = [
    {
        value: "popularity.desc",
        title: "Most popular"
    },
    {
        value: "popularity.asc",
        title: "Least popular"
    },
    {
        value: "vote_average.desc",
        title: "Best rating"
    },
    {
        value: "vote_average.asc",
        title: "Worst rating"
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

export const filterCriteriaMovies: Array<IFilterCriteria> = [
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

export const keys = {
    UP: "ArrowUp",
    DOWN: "ArrowDown"
};
