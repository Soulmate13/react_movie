/**
 * Appends REQUEST async action type
 */
import {
    GET_MOVIE_GENRES,
    GET_POPULAR_MOVIES,
    GET_POPULAR_SERIES,
    GET_SEARCHED_MOVIES, GET_SEARCHED_MOVIES_NAMES,
    GET_SEARCHED_SERIES, GET_SEARCHED_SERIES_NAMES, GET_SERIES_GENRES,
    GET_SINGLE_MOVIE,
    GET_SINGLE_SERIES
} from "./Actions/actionsList";
import {ISeriesListItem, ISingleSeriesData} from "../Utils/Interfaces/series";
import {IMoviesListItem, ISingleMovieData} from "../Utils/Interfaces/movies";
import {IGenre, IPageable, IPopularPrevSearchParams, ISearchedPrevSearchParams} from "../Utils/Interfaces/interfaces";

type requestType<T extends string> =
`${T}_PENDING`;
type successType<T extends string> =
`${T}_DONE`;
type errorType<T extends string> =
`${T}_ERROR`;

export interface IDiscoverPayload {
    list: Array<ISeriesListItem | IMoviesListItem>,
    prevSearchParams: IPopularPrevSearchParams,
    pageable: IPageable
}

export interface ISearchPayload {
    list: Array<ISeriesListItem | IMoviesListItem>,
    prevSearchParams: ISearchedPrevSearchParams,
    pageable: IPageable
}

export interface IGetSinglePayload {
    data: ISingleMovieData | ISingleSeriesData
}

export interface IGenresPayload {
    list: Array<IGenre>
}


/**
 * Appends REQUEST async action type
 */
export function REQUEST<T extends string>(actionType: T): requestType<T> {
    return <const>`${actionType}_PENDING`
}

/**
 * Appends SUCCESS async action type
 */
export function SUCCESS<T extends string>(actionType: T): successType<T> {
    return <const>`${actionType}_DONE`
}

/**
 * Appends FAILURE async action type
 */
export function FAILURE<T extends string>(actionType: T): errorType<T> {
    return <const>`${actionType}_ERROR`
}

export const getPopularMoviesRequest = () => ({
    type: REQUEST(GET_POPULAR_MOVIES)
});

export const getPopularSeriesRequest = () => ({
    type: REQUEST(GET_POPULAR_SERIES)
})

export const getPopularMoviesSuccess = (payload: IDiscoverPayload) => ({
    type: SUCCESS(GET_POPULAR_MOVIES),
    payload: payload
})

export const getPopularSeriesSuccess = (payload: IDiscoverPayload) => ({
    type: SUCCESS(GET_POPULAR_SERIES),
    payload: payload
})

export const getPopularMoviesFailure = () => ({
    type: FAILURE(GET_POPULAR_MOVIES)
})

export const getPopularSeriesFailure = () => ({
    type: FAILURE(GET_POPULAR_SERIES)
})

export const getSearchedMoviesRequest = () => ({
    type: REQUEST(GET_SEARCHED_MOVIES)
});

export const getSearchedMoviesNamesRequest = () => ({
    type: REQUEST(GET_SEARCHED_MOVIES_NAMES)
})

export const getSearchedSeriesRequest = () => ({
    type: REQUEST(GET_SEARCHED_SERIES)
})

export const getSearchedSeriesNamesRequest = () => ({
    type: REQUEST(GET_SEARCHED_SERIES_NAMES)
})

export const getSearchedMoviesSuccess = (payload: ISearchPayload) => ({
    type: SUCCESS(GET_SEARCHED_MOVIES),
    payload: payload
})

export const getSearchedSeriesSuccess = (payload: ISearchPayload) => ({
    type: SUCCESS(GET_SEARCHED_SERIES),
    payload: payload
})

export const getSearchedSeriesNamesSuccess = (payload: any) => ({
    type: SUCCESS(GET_SEARCHED_SERIES_NAMES),
    payload: payload
})

export const getSearchedMoviesNamesSuccess = (payload: any) => ({
    type: SUCCESS(GET_SEARCHED_MOVIES_NAMES),
    payload: payload
})

export const getSearchedMoviesFailure = () => ({
    type: FAILURE(GET_SEARCHED_MOVIES)
})

export const getSearchedSeriesFailure = () => ({
    type: FAILURE(GET_SEARCHED_SERIES),
})

export const getSearchedMoviesNamesFailure = () => ({
    type: FAILURE(GET_SEARCHED_MOVIES_NAMES),
})

export const getSearchedSeriesNamesFailure = () => ({
    type: FAILURE(GET_SEARCHED_SERIES_NAMES),
})

export const getSingleMovieRequest = () => ({
    type: REQUEST(GET_SINGLE_MOVIE),
});

export const getSingleSeriesRequest = () => ({
    type: REQUEST(GET_SINGLE_SERIES)
})

export const getSingleMovieSuccess = (payload: IGetSinglePayload) => ({
    type: SUCCESS(GET_SINGLE_MOVIE),
    payload: payload
})

export const getSingleSeriesSuccess = (payload: IGetSinglePayload) => ({
    type: SUCCESS(GET_SINGLE_SERIES),
    payload: payload
})

export const getSingleMovieFailure = () => ({
    type: FAILURE(GET_SINGLE_MOVIE)
})

export const getSingleSeriesFailure = () => ({
    type: FAILURE(GET_SINGLE_SERIES),
})

export const getMovieGenresRequest = () => ({
    type: REQUEST(GET_MOVIE_GENRES)
})

export const getMovieGenresSuccess = (payload: IGenresPayload) => ({
    type: SUCCESS(GET_MOVIE_GENRES),
    payload: payload
})

export const getMovieGenresFailure = () => ({
    type: FAILURE(GET_MOVIE_GENRES),
})

export const getSeriesGenresRequest = () => ({
    type: REQUEST(GET_SERIES_GENRES)
})

export const getSeriesGenresSuccess = (payload: IGenresPayload) => ({
    type: SUCCESS(GET_SERIES_GENRES),
    payload: payload
})

export const getSeriesGenresFailure = () => ({
    type: FAILURE(GET_SERIES_GENRES),
})

export type popularMoviesActionCreators = ReturnType<typeof getPopularMoviesRequest> |
    ReturnType<typeof getPopularMoviesSuccess> |
    ReturnType<typeof getPopularMoviesFailure>

export type searchedMoviesActionCreators = ReturnType<typeof getSearchedMoviesRequest> |
    ReturnType<typeof getSearchedMoviesSuccess> |
    ReturnType<typeof getSearchedMoviesFailure> | ReturnType<typeof getSearchedMoviesNamesRequest> |
    ReturnType<typeof getSearchedMoviesNamesSuccess> |
    ReturnType<typeof getSearchedMoviesNamesFailure>

export type singleMoviesActionCreators = ReturnType<typeof getSingleMovieRequest> |
    ReturnType<typeof getSingleMovieSuccess> |
    ReturnType<typeof getSingleMovieFailure>

export type popularSeriesActionCreators = ReturnType<typeof getPopularSeriesRequest> |
    ReturnType<typeof getPopularSeriesSuccess> |
    ReturnType<typeof getPopularSeriesFailure>

export type searchedSeriesActionCreators = ReturnType<typeof getSearchedSeriesRequest> |
    ReturnType<typeof getSearchedSeriesSuccess> |
    ReturnType<typeof getSearchedSeriesFailure> | ReturnType<typeof getSearchedSeriesNamesRequest> |
    ReturnType<typeof getSearchedSeriesNamesSuccess> |
    ReturnType<typeof getSearchedSeriesNamesFailure>

export type singleSeriesActionCreators = ReturnType<typeof getSingleSeriesRequest> |
    ReturnType<typeof getSingleSeriesSuccess> |
    ReturnType<typeof getSingleSeriesFailure>

export type movieGenresActionCreators = ReturnType<typeof getMovieGenresRequest> |
    ReturnType<typeof getMovieGenresSuccess> |
    ReturnType<typeof getMovieGenresFailure>

export type seriesGenresActionCreators = ReturnType<typeof getSeriesGenresRequest> |
    ReturnType<typeof getSeriesGenresSuccess> |
    ReturnType<typeof getSeriesGenresFailure>

export const DEV = process.env.NODE_ENV === 'development';


