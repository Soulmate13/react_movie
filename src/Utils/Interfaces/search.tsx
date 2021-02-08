import {ModeType} from "./interfaces";

export interface ISearchParams {
    page?: number,
    year?: string | null,
    query: string,
    mode: ModeType
}

export interface ISearchUrlParts {
    route: string,
    apiPath: string,
    page: string,
    year: string,
    otherSettings: string,
    query: string,
}