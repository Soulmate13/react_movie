import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../../Store/Reducers";

export interface IGenre {
    id: number,
    name: string
}

export type ModeType = "MOVIES_MODE" | "SERIES_MODE" ;


export interface ISearchedPrevSearchParams {
    query: string,
    year?: string | null,
    page?: number
}

export interface IPopularPrevSearchParams {
    year: string | null,
    genres: number[] | [],
    filterCriterion: string,
    page?: number
}

export interface IPageable {
    page?: number,
    total_results?: number
}

export interface IEntityItem {
    readonly backdrop_path?: string | null,
    readonly id? : number,
    readonly original_language? : string,
    readonly overview? : string | null,
    readonly popularity?: number,
    readonly poster_path?: string | null,
    readonly vote_average?: number,
    readonly vote_count?: number
}

export interface IProductionCompanies {
    readonly name?: string,
    readonly id?: number,
    readonly logo_path?: string,
    readonly origin_country?: string
}

export interface IProductionCountries {
    readonly iso_3166_1?: string,
    readonly name?: string
}

export interface ISpokenLanguages {
    readonly english_name?: string,
    readonly iso_639_1?: string,
    readonly name?: string
}

export interface IGenresList {
    value: number,
    title: string
}

export interface IFilterCriteria {
    value: string,
    title: string
}

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>>