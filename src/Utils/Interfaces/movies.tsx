import {
    IEntityItem,
    IGenre,
    IPageable,
    IPopularPrevSearchParams,
    IProductionCompanies,
    IProductionCountries,
    ISearchedPrevSearchParams, ISpokenLanguages
} from "./interfaces";

export interface IMoviesInitialState {
    readonly singleMovie: ISingleMovie,
    readonly searchedMovies: ISearchedMovies,
    readonly popularMovies: IPopularMovies,
    readonly favouriteMovies: IFavouriteMovies,
}

export interface ISingleMovie {
    readonly isFetching: boolean,
    readonly didInvalidate: boolean,
    readonly data: ISingleMovieData
}

interface ISearchedMovies {
    readonly isFetching: boolean,
    readonly didInvalidate: boolean,
    readonly list: Array<IMoviesListItem>,
    readonly pageable: IPageable,
    readonly prevSearchParams: ISearchedPrevSearchParams,
}

interface IPopularMovies {
    readonly isFetching: boolean,
    readonly didInvalidate: boolean,
    readonly list: Array<IMoviesListItem>,
    readonly pageable: IPageable,
    readonly prevSearchParams: IPopularPrevSearchParams,
}

export interface IFavouriteMovies {
    readonly isFetching: boolean,
    readonly didInvalidate: boolean,
    readonly list: object[] | [],
    readonly pageable: IPageable,
}

export interface IMoviesListItem extends IEntityItem {
    readonly adult?: boolean,
    readonly genre_ids?: Array<number>,
    readonly original_title?: string,
    readonly release_date?: string,
    readonly title?: string,
    readonly video?: boolean,
}

export interface ISingleMovieData extends IEntityItem {
    readonly adult?: boolean,
    readonly belongs_to_collection?: IBelongsToCollection | null,
    readonly budget?: number,
    readonly genres?: Array<IGenre>,
    readonly homepage?: string | null,
    readonly imdb_id?: string | null,
    readonly original_title?: string,
    readonly production_companies?: Array<IProductionCompanies>,
    readonly production_countries?: Array<IProductionCountries>,
    readonly release_date?: string,
    readonly revenue?: number,
    readonly runtime?: number | null,
    readonly spoken_languages?: Array<ISpokenLanguages>,
    readonly status?: "Rumored" | "Planned" | "In Production" | "Post Production" | "Released" | "Canceled",
    readonly tagline?: string | null,
    readonly title?: string,
    readonly video?: boolean
}

interface IBelongsToCollection {
    readonly id?: number,
    readonly name?: string,
    readonly poster_path?: string,
    readonly backdrop_path?: string
}

export interface IMoviesDiscoverPayload {
    list: IMoviesListItem,
    prevSearchParams: IPopularPrevSearchParams,
    pageable: IPageable
}
