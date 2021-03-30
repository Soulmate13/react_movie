import React from 'react';
import '../../App.less';
import {Col} from "antd";
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import {Link} from "react-router-dom";
import {IMoviesListItem} from "../../Utils/Interfaces/movies";
import {ISeriesListItem} from "../../Utils/Interfaces/series";
import {ModeType} from "../../Utils/Interfaces/interfaces";
import {PosterImage} from "../PosterImage/PosterImage";
import {onImageError} from '../../Utils/functions'

export interface IMediaCardProps {
    mode?: ModeType,
    key?: number,
    data: ISeriesListItem & IMoviesListItem
}


export const MediaCard = (props: IMediaCardProps) => {

    let mediaCard;

    if (props.mode === MOVIES_MODE) {
        mediaCard = (
            <Col xxl={{span: 6}} lg={{span: 8}} md={{span: 12}} span={24}>
                <div className="movie-card">
                    <PosterImage imageSrc={props.data.poster_path} errorHandler={onImageError}/>
                    <h2 className="card-heading"><Link
                        to={`/movie/${props.data.id}`}
                        className="card-link">{props.data.title ? props.data.title : 'Title Unavailable'}</Link>
                    </h2>
                    <p className="card-date">{props.data.release_date ? props.data.release_date : 'Date Unavailable'}</p>
                </div>
            </Col>
        )
    } else if (props.mode === SERIES_MODE) {
        mediaCard = (
            <Col xxl={{span: 6}} lg={{span: 8}} md={{span: 12}} span={24}>
                <div className="series-card">
                    <PosterImage imageSrc={props.data.poster_path} errorHandler={onImageError}/>
                    <h2 className="card-heading"><Link
                        to={`/series/${props.data.id}`}
                        className="card-link">{props.data.name ? props.data.name : "Title Unavailable"}</Link>
                    </h2>
                    <p className="card-date">{props.data.first_air_date ? props.data.first_air_date : 'Date Unavailable'}</p>
                </div>
            </Col>
        )
    } else {
        mediaCard = null;
    }

    return (
        <>
            {mediaCard}
        </>
    );
}
