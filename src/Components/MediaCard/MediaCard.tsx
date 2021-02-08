import React, {SyntheticEvent} from 'react';
import '../../App.less';
import {Col} from "antd";
import errorImage from '../../Assets/error-image.jpg'
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import {Link} from "react-router-dom";
import {IMoviesListItem} from "../../Utils/Interfaces/movies";
import {ISeriesListItem} from "../../Utils/Interfaces/series";
import {ModeType} from "../../Utils/Interfaces/interfaces";

const imageSrc = 'https://image.tmdb.org/t/p/w300/'

export interface IMediaCardProps {
    mode : ModeType,
    key: number | undefined,
    data: ISeriesListItem & IMoviesListItem
}

export const MediaCard = (props: IMediaCardProps) => {

    const onError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = errorImage;
    }

    let mediaCard;
    if (props.mode === MOVIES_MODE) {
        mediaCard = (
            <div>
                <img className="poster-image"
                     src={props.data.poster_path ? imageSrc + props.data.poster_path : errorImage}
                     onError={onError} alt="movie poster"/>
                <h2><Link to={`/movie/${props.data.id}`}>{props.data.title}</Link></h2>
                <p>{props.data.release_date}</p>
            </div>
        )
    } else if (props.mode === SERIES_MODE) {
        mediaCard = (
            <div>
                <img className="poster-image"
                     src={props.data.poster_path ? imageSrc + props.data.poster_path : errorImage}
                     onError={onError} alt="movie poster"/>
                <h2><Link to={`/series/${props.data.id}`}>{props.data.name}</Link></h2>
                <p>{props.data.first_air_date}</p>
            </div>
        )
    } else {
        mediaCard = null;
    }

    return (
        <Col xxl={{span: 6}} lg={{span: 8}} md={{span: 12}} span={24}>
            {mediaCard}
        </Col>
    );
}
