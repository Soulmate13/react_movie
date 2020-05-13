// movies
export const MOVIES_MODE = "MOVIES_MODE"
export const MOVIES_SEARCH_URL_PARTS = {
    route:'https://api.themoviedb.org/3/search/movie?',
    apiPath: 'api_key=',
    page: "&page=",
    year: "&primary_release_year=",
    otherSettings:'&language=en-US&include_adult=false&include_value',
    query:'&query=',
}

//shows
export const SERIES_MODE = "SERIES_MODE"
export const SERIES_SEARCH_URL_PARTS = {
    route:'https://api.themoviedb.org/3/search/tv?',
    apiPath: 'api_key=',
    page: "&page=",
    year: "&first_air_date_year=",
    otherSettings:'&language=en-US&',
    query:'&query=',
}
