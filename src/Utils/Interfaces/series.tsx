import {
    IEntityItem,
    IGenre,
    IPageable,
    IPopularPrevSearchParams,
    IProductionCompanies,
    ISearchedPrevSearchParams,
    IProductionCountries, ISpokenLanguages
} from "./interfaces";

export interface ISeriesInitialState {
    readonly singleSeries: ISingleSeries,
    readonly searchedSeries: ISearchedSeries,
    readonly popularSeries: IPopularSeries,
    readonly favouriteSeries: IFavouriteSeries,
}

interface ISingleSeries {
    readonly isFetching: boolean,
    readonly didInvalidate: boolean,
    readonly data: ISingleSeriesData
}

interface ISearchedSeries {
    readonly isFetching: boolean,
    readonly didInvalidate: boolean,
    readonly list: Array<ISeriesListItem>,
    readonly pageable: IPageable,
    readonly prevSearchParams: ISearchedPrevSearchParams,
}

interface IPopularSeries {
    readonly isFetching: boolean,
    readonly didInvalidate: boolean,
    readonly list: Array<ISeriesListItem>,
    readonly pageable: IPageable,
    readonly prevSearchParams: IPopularPrevSearchParams,
}

export interface ISeriesListItem extends IEntityItem {
    readonly genre_ids?: Array<number>,
    readonly first_air_date?: string,
    readonly name?: string,
    readonly origin_country?: Array<string>,
    readonly original_name?: string,
    readonly original_title?: string,
}

export interface ISingleSeriesData extends IEntityItem {
    readonly created_by?: Array<ICreatedBy>,
    readonly episode_run_time?: Array<number>,
    readonly first_air_date?: string,
    readonly genres?: Array<IGenre>,
    readonly genre_ids?: Array<number>,
    readonly homepage?: string | null,
    readonly in_production?: boolean,
    readonly languages?: Array<string>,
    readonly last_air_date?: string,
    readonly last_episode_to_air?: IEpisode,
    readonly name?: string,
    readonly next_episode_to_air?: IEpisode | null,
    readonly networks?: Array<INetworks>,
    readonly number_of_episodes?: number,
    readonly number_of_seasons?: number,
    readonly origin_country?: Array<string>,
    readonly original_name?: string,
    readonly production_companies?: Array<IProductionCompanies>,
    readonly production_countries?: Array<IProductionCountries>,
    readonly seasons?: Array<ISeasons>,
    readonly spoken_languages?: Array<ISpokenLanguages>,
    readonly status?: string,
    readonly tagline?: string | null,
    readonly type?: string,
}

export interface IFavouriteSeries {
    readonly isFetching: boolean,
    readonly didInvalidate: boolean,
    readonly list: object[] | [],
    readonly pageable: IPageable,
}

interface ICreatedBy {
    readonly id?: number,
    readonly credit_id?: string,
    readonly name?: string,
    readonly gender?: number,
    readonly profile_path?: string | null
}

interface IEpisode {
    readonly air_date?: string,
    readonly episode_number?: number
    readonly id?: number,
    readonly name?: string,
    readonly overview?: string,
    readonly production_code?: string,
    readonly season_number?: number,
    readonly still_path?: string | null,
    readonly vote_average?: number,
    readonly vote_count?: number
}

interface INetworks {
    readonly name?: string,
    readonly id?: number,
    readonly logo_path?: string | null,
    readonly origin_country?: string
}

interface ISeasons {
    readonly air_date?: string,
    readonly episode_count?: number,
    readonly id?: number,
    readonly name?: string,
    readonly overview?: string,
    readonly poster_path?: string,
    readonly season_number?: number
}