/**
 * Describes mode for searching or discovering movies
 * @constant
 * @type {string}
 */
export const MOVIES_MODE = "MOVIES_MODE"

/**
 * Describes url parts to append to search movie parameters
 * @constant
 * @type {object}
 * @property {string} route - The string, which starts the search url
 * @property {string} apiPath - The string, which is prepended to the api key
 * @property {string} page - The string, which is prepended to the page parameter
 * @property {string} year - The string, which is prepended to the year parameter
 * @property {string} otherSettings - The string, which contains other search parameters
 * @property {string} query - The string, which is prepended to query parameter
 */
export const MOVIES_SEARCH_URL_PARTS = {
    route:'https://api.themoviedb.org/3/search/movie?',
    apiPath: 'api_key=',
    page: "&page=",
    year: "&primary_release_year=",
    otherSettings:'&language=en-US&include_adult=false&include_video=false',
    query:'&query=',
}

/**
 * Describes url parts to append to discover movie parameters
 * @constant
 * @type {object}
 * @property {string} route - The string, which starts the search url
 * @property {string} apiPath - The string, which is prepended to the api key
 * @property {string} page - The string, which is prepended to the page parameter
 * @property {string} year - The string, which is prepended to the year parameter
 * @property {string} otherSettings - The string, which contains other search parameters
 * @property {string} genres - The string, which is prepended to the genres parameter
 * @property {string} filterCriterion - The string, which is prepended to the filterCriterion parameter
 */
export const MOVIES_DISCOVER_URL_PARTS = {
    route:'https://api.themoviedb.org/3/discover/movie?',
    apiPath: 'api_key=',
    page: "&page=",
    year: "&primary_release_year=",
    otherSettings:'&language=en-US&include_adult=false&include_video=false',
    genres: '&with_genres=',
    filterCriterion: '&sort_by=',
}

/**
 * Describes url parts to append to single movie details parameters
 * @constant
 * @type {object}
 * @property {string} route - The string, which starts the search url
 * @property {string} apiPath - The string, which is prepended to the api key
 * @property {string} otherSettings - The string, which contains other search parameters
 */
export const MOVIES_GET_DETAILS_URL_PARTS = {
    route:'https://api.themoviedb.org/3/movie/',
    apiPath: 'api_key=',
    otherSettings:'&language=en-US',
}

/**
 * Describes mode for searching or discovering series
 * @constant
 * @type {string}
 */
export const SERIES_MODE = "SERIES_MODE"

/**
 * Describes url parts to append to search series parameters
 * @constant
 * @type {object}
 * @property {string} route - The string, which starts the search url
 * @property {string} apiPath - The string, which is prepended to the api key
 * @property {string} page - The string, which is prepended to the page parameter
 * @property {string} year - The string, which is prepended to the year parameter
 * @property {string} otherSettings - The string, which contains other search parameters
 * @property {string} query - The string, which is prepended to query parameter
 */

export const SERIES_SEARCH_URL_PARTS = {
    route:'https://api.themoviedb.org/3/search/tv?',
    apiPath: 'api_key=',
    page: "&page=",
    year: "&first_air_date_year=",
    otherSettings:'&language=en-US&',
    query:'&query=',
}

/**
 * Describes url parts to append to discover series parameters
 * @constant
 * @type {object}
 * @property {string} route - The string, which starts the search url
 * @property {string} apiPath - The string, which is prepended to the api key
 * @property {string} page - The string, which is prepended to the page parameter
 * @property {string} year - The string, which is prepended to the year parameter
 * @property {string} otherSettings - The string, which contains other search parameters
 * @property {string} genres - The string, which is prepended to the genres parameter
 * @property {string} filterCriterion - The string, which is prepended to the filterCriterion parameter
 */

export const SERIES_DISCOVER_URL_PARTS = {
    route:'https://api.themoviedb.org/3/discover/tv?',
    apiPath: 'api_key=',
    page: "&page=",
    year: "&first_air_date_year=",
    otherSettings:'&language=en-US&include_adult=false&include_video=false',
    query:'&query=',
    genres: '&with_genres=',
    filterCriterion: '&sort_by=',
}

/**
 * Describes url parts to append to single series details parameters
 * @constant
 * @type {object}
 * @property {string} route - The string, which starts the search url
 * @property {string} apiPath - The string, which is prepended to the api key
 * @property {string} otherSettings - The string, which contains other search parameters
 */

export const SERIES_GET_DETAILS_URL_PARTS = {
    route: 'https://api.themoviedb.org/3/tv/',
    apiPath: 'api_key=',
    otherSettings:'&language=en-US',
}

/**
 * Describes list of genres available for filtering
 * @type {Array.<{value: number, title: string}>}
 * @constant
 */

export const genresList = [
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
 * @type {Array.<{value: string, title: string}>}
 * @constant
 */

export const filterCriteria = [
    {
        value: "popularity.desc",
        title: "Popularity descending"
    },
    {
        value: "popularity.asc",
        title: "Popularity Ascending"
    },
    {
        value: "primary_release_date.desc",
        title: "Release Date Descending"
    },
    {
        value: "primary_release_date.asc",
        title: "Release Date Ascending"
    }
]