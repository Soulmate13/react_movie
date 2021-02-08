import React, {SyntheticEvent, useEffect} from 'react';
import '../../App.less';
import {Col, Row} from "antd";
import errorImage from '../../Assets/error-image.jpg'
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store/Reducers";
import {getDetails} from "../../Store/Actions/getDetails";
import {RouteComponentProps} from "react-router";
import {ModeType} from "../../Utils/Interfaces/interfaces";

const imageSrc = 'https://image.tmdb.org/t/p/w300/'

export interface IMediaCardLargeProps {
    mode : ModeType,
    routeProps: RouteComponentProps<{id: string}>
}

const MediaCardLarge = (props: IMediaCardLargeProps ) => {
    const {routeProps, mode} = props;
    const onError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = errorImage;
    }

    const mapGenres = (fetchedArray: any) => {
        let genresArray = fetchedArray.map((object : any) => {
            return object.name;
        })
        return genresArray.join(", ");
    }

    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies);
    const series = useSelector((state: RootState) => state.series);


    useEffect(() => {
        dispatch(getDetails({mode: mode, id: routeProps.match.params.id}));
    }, [getDetails, mode, routeProps])

    let mediaCard;

    const checkHref = (href : string | null | undefined) => {
        if (!href) {
            return undefined
        } else {
            return href
        }
    }

    if (mode === MOVIES_MODE) {
        mediaCard = (
            <div className="content-section">
                <Row>
                    <Col lg={{span: 8}} md={{span: 12}} span={24}>
                        <img className="poster-image"
                             src={movies.singleMovie.data.poster_path ? imageSrc + movies.singleMovie.data.poster_path : errorImage}
                             onError={onError} alt="movie poster"/>
                    </Col>
                    <Col lg={{span: 16}} md={{span: 12}} span={24}>
                        <h1>{movies.singleMovie.data.title}</h1>
                        <span>{movies.singleMovie.data.tagline}</span>
                        <h2>{movies.singleMovie.data.release_date}</h2>
                        <p>Genres: {mapGenres(movies.singleMovie.data.genres)}</p>
                        <p>Overview: <br/> {movies.singleMovie.data.overview}</p>
                        <a href={checkHref(movies.singleMovie.data.homepage)} target="_blank" rel="noopener noreferrer">Home
                            page</a> <br/>
                        <a href={`https://www.imdb.com/title/${movies.singleMovie.data.imdb_id}`} target="_blank"
                           rel="noopener noreferrer">Imdb page</a>
                    </Col>
                </Row>
            </div>
        )
    } else if (mode === SERIES_MODE) {
        mediaCard = (
            <div className="content-section">
                <Row>
                    <Col lg={{span: 8}} md={{span: 12}} span={24}>
                        <img className="poster-image"
                             src={series.singleSeries.data.poster_path ? imageSrc + series.singleSeries.data.poster_path : errorImage}
                             onError={onError} alt="movie poster"/>
                    </Col>
                    <Col lg={{span: 16}} md={{span: 12}} span={24}>
                        <h1>{series.singleSeries.data.name}</h1>
                        <h2>First aired on:{series.singleSeries.data.first_air_date}</h2>
                        <h2>Last aired on:{series.singleSeries.data.last_air_date}</h2>
                        <p>Genres: {mapGenres(series.singleSeries.data.genres)}</p>
                        <p>Overview: <br/> {series.singleSeries.data.overview}</p>
                        <a href={checkHref(series.singleSeries.data.homepage)} target="_blank" rel="noopener noreferrer">Home
                            page</a> <br/>
                    </Col>
                </Row>
            </div>
        )
    } else {
        mediaCard = null;
    }

    return (
        <div>
            {mediaCard}
        </div>
    );
}

export default MediaCardLarge;