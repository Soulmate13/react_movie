import React, {useEffect} from 'react';
import '../../App.less';
import {Col, Row} from "antd";
import errorImage from '../../Assets/error-image.jpg'
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import {connect} from "react-redux";
import {getDetails} from "../../Store/Actions/getDetails";

const imageSrc = 'https://image.tmdb.org/t/p/w300/'


function MediaCardLarge(props) {
    const {getDetails, routeProps, mode} = props;
    const onError = (event) => {
        event.target.src = errorImage;
    }

    const mapGenres = (fetchedArray) => {
        let genresArray = fetchedArray.map(object => {
            return object.name;
        })
        return genresArray.join(", ");
    }


    useEffect(() => {
        getDetails({mode: mode, id: routeProps.match.params.id});
    }, [getDetails, mode, routeProps])

    let mediaCard;
    if (props.mode === MOVIES_MODE) {
        mediaCard = (
            <div className="content-section">
                <Row>
                    <Col lg={{span: 8}} md={{span: 12}} span={24}>
                        <img className="poster-image"
                             src={props.movies.singleMovie.data.poster_path ? imageSrc + props.movies.singleMovie.data.poster_path : errorImage}
                             onError={onError} alt="movie poster"/>
                    </Col>
                    <Col lg={{span: 16}} md={{span: 12}} span={24}>
                        <h1>{props.movies.singleMovie.data.title}</h1>
                        <span>{props.movies.singleMovie.data.tagline}</span>
                        <h2>{props.movies.singleMovie.data.release_date}</h2>
                        <p>Genres: {mapGenres(props.movies.singleMovie.data.genres)}</p>
                        <p>Overview: <br/> {props.movies.singleMovie.data.overview}</p>
                        <a href={props.movies.singleMovie.data.homepage} target="_blank" rel="noopener noreferrer">Home page</a> <br/>
                        <a href={`https://www.imdb.com/title/${props.movies.singleMovie.data.imdb_id}`} target="_blank" rel="noopener noreferrer" >Imdb page</a>
                    </Col>
                </Row>
            </div>
        )
    } else if (props.mode === SERIES_MODE) {
        mediaCard = (
            <div className="content-section">
                <Row>
                    <Col lg={{span: 8}} md={{span: 12}} span={24}>
                        <img className="poster-image"
                             src={props.series.singleSeries.data.poster_path ? imageSrc + props.series.singleSeries.data.poster_path : errorImage}
                             onError={onError} alt="movie poster"/>
                    </Col>
                    <Col lg={{span: 16}} md={{span: 12}} span={24}>
                        <h1>{props.series.singleSeries.data.name}</h1>
                        <h2>First aired on:{props.series.singleSeries.data.first_air_date}</h2>
                        <h2>Last aired on:{props.series.singleSeries.data.last_air_date}</h2>
                        <p>Genres: {mapGenres(props.series.singleSeries.data.genres)}</p>
                        <p>Overview: <br/> {props.series.singleSeries.data.overview}</p>
                        <a href={props.series.singleSeries.data.homepage} target="_blank" rel="noopener noreferrer">Home page</a> <br/>
                        <a href={`https://www.imdb.com/title/${props.series.singleSeries.data.imdb_id}`} target="_blank" rel="noopener noreferrer">Imdb page</a>
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

function mapStateToProps(state, ownProps) {
    return {
        movies: state.movies,
        series: state.series,
        ownProps,
    }
}

const mapDispatchToProps = {
    getDetails,
}


export default connect(mapStateToProps, mapDispatchToProps)(MediaCardLarge);