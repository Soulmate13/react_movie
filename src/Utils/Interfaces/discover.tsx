import {ModeType} from "./interfaces";

export interface IDiscoverParams {
    page?: number,
    year: string | null,
    genres: Array<number>
    filterCriterion: string
    mode: ModeType
}

export interface IDiscoverUrlParts {
    route: string,
    apiPath: string,
    page: string,
    year: string,
    otherSettings: string,
    genres: string,
    filterCriterion: string,
}

