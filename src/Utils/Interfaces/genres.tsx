import {IGenre, ModeType} from "./interfaces";

export interface IGenreEntity {
    isFetching: boolean,
    didInvalidate: boolean,
    list: Array<IGenre>,
}

export interface IGenresUrlParts {
    route: string,
    apiPath: string,
    otherSettings: string,
}

export interface IGenresSearchParams {
    mode: ModeType
}