/**
 * @file Contains utility functions for the project.
 * @author Hlib Zhurba
 */

import {ISearchParams, ISearchUrlParts} from "./Interfaces/search";
import {IDiscoverParams, IDiscoverUrlParts} from "./Interfaces/discover";
import {IGetDetailsParams, IGetDetailsUrlParts} from "./Interfaces/details";
import React, {SyntheticEvent} from "react";
import errorImage from '../Assets/error-image.jpg';
import {IGenre, ModeType} from "./Interfaces/interfaces";
import {IMoviesListItem} from "./Interfaces/movies";
import {MediaCard} from "../Components/MediaCard/MediaCard";
import {ISeriesListItem} from "./Interfaces/series";
import {IGenresUrlParts} from "./Interfaces/genres";
/**
 * Takes url parameters and corresponding API strings and generates the request url via concatenation.
 */
export function searchActionGenerateUrl(searchParams: ISearchParams, SEARCH_URL_PARTS: ISearchUrlParts) {
    let url;
    const route = SEARCH_URL_PARTS.route;
    const apiKey = SEARCH_URL_PARTS.apiPath + process.env.REACT_APP_API_KEY;
    const page = searchParams.page ? SEARCH_URL_PARTS.page + searchParams.page : ""
    const year = searchParams.year ? SEARCH_URL_PARTS.year + searchParams.year : ""
    const otherSettings = SEARCH_URL_PARTS.otherSettings;
    const query = SEARCH_URL_PARTS.query + searchParams.query;
    url = route + apiKey + page + year + otherSettings + query;
    return url;
}

/**
 * Takes url parameters and corresponding API strings and generates the request url via concatenation.
 */

export function discoverActionGenerateUrl(searchParams: IDiscoverParams, SEARCH_URL_PARTS: IDiscoverUrlParts): string {
    let url;
    const page = SEARCH_URL_PARTS.page + searchParams.page;
    const year = SEARCH_URL_PARTS.year + searchParams.year;
    const apiPath = SEARCH_URL_PARTS.apiPath;
    const genres = SEARCH_URL_PARTS.genres + searchParams.genres.toString();
    const filterCriterion = SEARCH_URL_PARTS.filterCriterion + searchParams.filterCriterion;
    url = SEARCH_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + page + year + SEARCH_URL_PARTS.otherSettings + genres + filterCriterion;
    return url;
}

/**
 * Takes url parameters and corresponding API strings and generates the request url via concatenation,
 */

export function getDetailsActionGenerateUrl(searchParams: IGetDetailsParams, SEARCH_URL_PARTS: IGetDetailsUrlParts) {
    let url;
    const id = searchParams.id.toString() + '?';
    const apiPath = SEARCH_URL_PARTS.apiPath;
    url = SEARCH_URL_PARTS.route + id + apiPath + process.env.REACT_APP_API_KEY + SEARCH_URL_PARTS.otherSettings;
    return url;
}

export function GenresActionGenerateUrl(SEARCH_URL_PARTS: IGenresUrlParts) {
    let url;
    const apiPath = SEARCH_URL_PARTS.apiPath;
    url = SEARCH_URL_PARTS.route + apiPath + process.env.REACT_APP_API_KEY + SEARCH_URL_PARTS.otherSettings;
    return url;
}

export function onImageError (event: SyntheticEvent<HTMLImageElement, Event>) {
    event.currentTarget.src = errorImage;
}

export function mapGenres (fetchedArray: Array<IGenre>) {
    let genresArray = fetchedArray.map((object: IGenre) => object.name).filter(Boolean).filter(name => String(name).trim());
    return genresArray.join(", ");
}

export const renderMediaCards = (array: Array<IMoviesListItem | ISeriesListItem>, mode: ModeType) => {
    return array.map((arrayItem: IMoviesListItem | ISeriesListItem) => {
        return (<MediaCard key={arrayItem.id} data={arrayItem} mode={mode}/>);
    });
}