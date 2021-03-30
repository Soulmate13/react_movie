import {ModeType} from "./interfaces";

export interface IGetDetailsParams {
    id: string,
    mode?: ModeType
}

export interface IGetDetailsUrlParts {
    route: string,
    apiPath: string,
    otherSettings: string,
}

