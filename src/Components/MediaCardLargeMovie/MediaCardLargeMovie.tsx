import React, {useEffect} from 'react';
import '../../App.less';
import {Col, Row, Spin} from "antd";
import {MOVIES_MODE} from "../../Utils/constants";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../Store/Reducers";
import {getDetails} from "../../Store/Actions/getDetails/getDetails";
import {ModeType} from "../../Utils/Interfaces/interfaces";
import {PosterImage} from "../PosterImage/PosterImage";
import {onImageError, mapGenres} from "../../Utils/functions";
import {ISingleMovie} from "../../Utils/Interfaces/movies";

const mapDispatchToProps = {
    getDetails
}

const mapStateToProps = (state: RootState) => ({
    singleMovie: state.singleMovie
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type IMediaCardLargeMovieProps = PropsFromRedux & {
    mode?: ModeType,
    id: string,
    singleMovie?: ISingleMovie
}

export function MediaCardLargeMovie(props: IMediaCardLargeMovieProps) {

    useEffect(() => {
        const getDetailsFunction = props.getDetails
        getDetailsFunction({mode: props.mode, id: props.id});
    }, [props.getDetails, props.mode, props.id])

    let mediaCard;

    if (props.mode === MOVIES_MODE) {
        mediaCard = (
            props.singleMovie.isFetching ?
                <Spin size={"large"} className="custom-spinner"/>
                :
                props.singleMovie.didInvalidate ? <p className="not-found">Error: Movie Not Found</p>
                :
                <div className="content-section single-movie">
                    <Row>
                        <Col lg={{span: 8}} md={{span: 12}} span={24}>
                            <PosterImage imageSrc={props.singleMovie.data.poster_path} errorHandler={onImageError}/>
                        </Col>
                        <Col lg={{span: 16}} md={{span: 12}} span={24}>
                            <h1 className="single-title">{props.singleMovie.data.title && props.singleMovie.data.title.trim() ? props.singleMovie.data.title : "Title Unavailable"}</h1>
                            {props.singleMovie.data.tagline && props.singleMovie.data.tagline.trim() && <span className="single-tagline">{props.singleMovie.data.tagline}</span>}
                            <h2 className="single-date">{props.singleMovie.data.release_date && props.singleMovie.data.release_date.trim() ? `Released on: ${props.singleMovie.data.release_date}` : "Date Unavailable"}</h2>
                            {props.singleMovie.data.genres && props.singleMovie.data.genres.length > 0 && <p className="single-genres">Genres: {mapGenres(props.singleMovie.data.genres)}</p> }
                            {props.singleMovie.data.overview && props.singleMovie.data.overview.trim() && <p className="single-overview">Overview: <br/>{props.singleMovie.data.overview}</p>}
                            {props.singleMovie.data.homepage && props.singleMovie.data.homepage.trim() &&
                            <a href={props.singleMovie.data.homepage} className="single-link" target="_blank"
                               rel="noopener noreferrer">Home
                                page</a>}
                            {props.singleMovie.data.imdb_id && props.singleMovie.data.imdb_id.trim() &&
                            <a href={`https://www.imdb.com/title/${props.singleMovie.data.imdb_id}`} className="imdb-link" target="_blank"
                               rel="noopener noreferrer">Imdb page</a>}
                        </Col>
                    </Row>
                </div>

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


export default connector(MediaCardLargeMovie);