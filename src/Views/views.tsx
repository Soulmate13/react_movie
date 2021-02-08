import React from 'react';
import {RouteComponentProps} from "react-router";
import '../App.less';
import {MOVIES_MODE, SERIES_MODE} from '../Utils/constants';
import Discover from "../Components/Discover/Discover";
import Search from "../Components/Search/Search";
import MediaCardLarge from "../Components/MediaCardLarge/MediaCardLarge";


export const MovieDiscover = () => {
    return (
        <Discover mode={MOVIES_MODE}/>
    );
}

export const MovieSearch = () => {
    return (
        <Search mode={MOVIES_MODE}/>
    );
}

export const SeriesDiscover = () => {
    return (
        <Discover mode={SERIES_MODE}/>
    );
}

export const SeriesSearch= () => {
    return (
        <Search mode={SERIES_MODE}/>
    );
}

export const SingleMovie = (props : RouteComponentProps<{id: string}>) => {
    return (
        <MediaCardLarge mode={MOVIES_MODE} routeProps={props}/>
    );
}

export const SingleSeries = (props : RouteComponentProps<{id: string}>) => {
    return (
        <MediaCardLarge mode={SERIES_MODE} routeProps={props}/>
    );
}