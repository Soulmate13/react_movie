import React, {useEffect} from 'react';
import '../../App.less';
import {Col, Row, Spin} from "antd";
import {SERIES_MODE} from "../../Utils/constants";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../Store/Reducers";
import {getDetails} from "../../Store/Actions/getDetails/getDetails";
import {ModeType} from "../../Utils/Interfaces/interfaces";
import {PosterImage} from "../PosterImage/PosterImage";
import {onImageError, mapGenres} from "../../Utils/functions";
import {ISingleSeries} from "../../Utils/Interfaces/series";

const mapDispatchToProps = {
    getDetails
}

const mapStateToProps = (state: RootState) => ({
    singleSeries: state.singleSeries,
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type IMediaCardLargeSeriesProps = PropsFromRedux & {
    mode?: ModeType,
    id: string,
    singleSeries?: ISingleSeries,
}

export function MediaCardLargeSeries(props: IMediaCardLargeSeriesProps) {

    useEffect(() => {
        const getDetailsFunction = props.getDetails
        getDetailsFunction({mode: props.mode, id: props.id});
    }, [props.getDetails, props.mode, props.id])

    let mediaCard;

    if (props.mode === SERIES_MODE) {
        mediaCard = (
            props.singleSeries.isFetching ?
                <Spin size={"large"} className="custom-spinner"/>
                :
                props.singleSeries.didInvalidate ? <p className="not-found">Error: Series Not Found</p>
                :
                <div className="content-section single-series">
                    <Row>
                        <Col lg={{span: 8}} md={{span: 12}} span={24}>
                            <PosterImage imageSrc={props.singleSeries.data.poster_path} errorHandler={onImageError}/>
                        </Col>
                        <Col lg={{span: 16}} md={{span: 12}} span={24}>
                            <h1 className="single-title">{props.singleSeries.data.name && props.singleSeries.data.name.trim() ? props.singleSeries.data.name : "Title Unavailable"}</h1>
                            {props.singleSeries.data.tagline && props.singleSeries.data.tagline.trim() &&
                            <span className="single-tagline">{props.singleSeries.data.tagline}</span>}
                            <h2 className="single-first-air-date">{props.singleSeries.data.first_air_date && props.singleSeries.data.first_air_date.trim() ? `First aired on: ${props.singleSeries.data.first_air_date}` : "Date Unavailable"}</h2>
                            <h2 className="single-last-air-date">{props.singleSeries.data.last_air_date && props.singleSeries.data.last_air_date.trim() ? `Last aired on: ${props.singleSeries.data.last_air_date}` : "Date Unavailable"}</h2>
                            {props.singleSeries.data.genres && props.singleSeries.data.genres.length > 0 && <p className="single-genres">Genres: {mapGenres(props.singleSeries.data.genres)}</p>}
                            {props.singleSeries.data.overview && props.singleSeries.data.overview.trim() && <p className="single-overview">Overview: {props.singleSeries.data.overview}</p>}
                            {props.singleSeries.data.homepage && props.singleSeries.data.homepage.trim() &&
                            <a href={props.singleSeries.data.homepage} target="_blank"
                               rel="noopener noreferrer" className="single-link">Homepage</a>
                            }
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


export default connector(MediaCardLargeSeries);