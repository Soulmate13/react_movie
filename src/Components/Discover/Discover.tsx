import React from 'react';
import {DatePicker, Layout, Menu, Pagination, Row, Select} from 'antd';
import '../../App.less';
import FooterCustom from "../../Layout/ContentCustom/FooterCustom/FooterCustom";
import {useDispatch, useSelector} from "react-redux";
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import {genresList, filterCriteria} from '../../Utils/constants'
import {MediaCard} from "../MediaCard/MediaCard";
import * as moment from "moment";
import {getPopular} from "../../Store/Actions/discover";
import {RootState} from "../../Store/Reducers";
import {ISeriesListItem} from "../../Utils/Interfaces/series";
import {IMoviesListItem} from "../../Utils/Interfaces/movies";
import {ModeType} from "../../Utils/Interfaces/interfaces";

const {Content, Sider} = Layout;
const {YearPicker} = DatePicker;
const {Option} = Select;

interface IDiscoverProps {
    mode: ModeType
}

const Discover = (props: IDiscoverProps) => {

    const [year, setYear] = React.useState<string | null>(null);
    const [genres, setGenres] = React.useState<number[]>([]);
    const [filterCriterion, setFilterCriterion] = React.useState<string>("popularity.desc");

    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies);
    const series = useSelector((state: RootState) => state.series);

    const onDiscover = React.useCallback(() => {
        let searchParams;

        searchParams = {
            page: props.mode === MOVIES_MODE ? (movies.popularMovies.pageable.page ? movies.popularMovies.pageable.page : 1) : (series.popularSeries.pageable.page ? series.popularSeries.pageable.page : 1),
            year: year ? moment.default(year).format("YYYY") : null,
            genres: genres,
            filterCriterion: filterCriterion,
            mode: props.mode,
        }

        searchParams.page = 1;
        dispatch(getPopular(searchParams));
    }, [year, genres, filterCriterion, props.mode, dispatch, movies.popularMovies.pageable.page, series.popularSeries.pageable.page])


    // React.useEffect(() => {
    //     const setPrevSearchParams = () => {
    //         switch (props.mode) {
    //             case MOVIES_MODE:
    //                 movies.popularMovies.prevSearchParams.year ? setYear(moment.default(movies.popularMovies.prevSearchParams.year).format('YYYY')) : setYear(null);
    //                 setGenres(movies.popularMovies.prevSearchParams.genres);
    //                 setFilterCriterion(movies.popularMovies.prevSearchParams.filterCriterion);
    //                 break;
    //             case SERIES_MODE:
    //                 series.popularSeries.prevSearchParams.year ? setYear(moment.default(series.popularSeries.prevSearchParams.year).format('YYYY')) : setYear(null);
    //                 setGenres(series.popularSeries.prevSearchParams.genres);
    //                 setFilterCriterion(series.popularSeries.prevSearchParams.filterCriterion);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    //     setPrevSearchParams();
    // }, [])

    React.useEffect(() => {
        onDiscover();
    }, [onDiscover])

    const generateSearchParams = () => {
        return {
            page: props.mode === MOVIES_MODE ? (movies.popularMovies.pageable.page ? movies.popularMovies.pageable.page : 1) : (series.popularSeries.pageable.page ? series.popularSeries.pageable.page : 1),
            year: year ? moment.default(year).format("YYYY") : null,
            genres: genres,
            filterCriterion: filterCriterion,
            mode: props.mode
        }
    }

    const changeYearHandler = (date: moment.Moment | null) => {
        if (date) {
            setYear(date.format("YYYY"));
        } else {
            setYear(null);
        }
    }

    const onPageChange = (pageNum: number) => {
        const searchParams = generateSearchParams();
        searchParams.page = pageNum;
        dispatch(getPopular(searchParams));
    }

    const onGenreAdd = (option: number) => {
        let currentGenres = [...genres];
        currentGenres.push(option);
        setGenres(currentGenres);
    }

    const onGenreRemove = (option: number) => {
        let filteredGenres = genres.filter(genre => genre !== option);
        setGenres(filteredGenres);
    }

    const onFilterSelect = (option: string) => {
        setFilterCriterion(option);
    }

    return (
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    defaultSelectedKeys={['home']}
                    style={{height: '100%', borderRight: 0}}
                    className="sider-menu"
                >
                    <Menu.Item>
                        <YearPicker onChange={changeYearHandler} value={year ? moment.default(year, 'YYYY') : null}/>
                    </Menu.Item>
                    <Menu.Item>
                        <Select placeholder="Select genres" mode="multiple" allowClear={false} defaultValue={genres}
                                style={{width: '100%'}} showArrow={true} onSelect={onGenreAdd}
                                onDeselect={onGenreRemove} optionFilterProp="key">
                            {genresList.map(genre => {
                                return <Option key={genre.title} value={genre.value}>{genre.title}</Option>
                            })}
                        </Select>
                    </Menu.Item>
                    <Menu.Item>
                        <Select placeholder="Select filter" style={{width: '100%'}} value={filterCriterion}
                                onSelect={onFilterSelect}>
                            {filterCriteria.map(criteria => {
                                return <Option key={criteria.title} value={criteria.value}>{criteria.title}</Option>
                            })}
                        </Select>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content
                    className="site-layout-background content-section"
                >
                    <p>Discover {props.mode === MOVIES_MODE ? "Movies" : "Series"}</p>

                    <Row gutter={[16, 16]}>
                        {props.mode === MOVIES_MODE ? movies.popularMovies.list.map((singleMovie: IMoviesListItem) => {
                                return <MediaCard key={singleMovie.id} data={singleMovie} mode={props.mode}/>
                            })
                            :
                            series.popularSeries.list.map((singleSeries: ISeriesListItem) => {
                                return <MediaCard key={singleSeries.id} data={singleSeries} mode={props.mode}/>
                            })
                        }
                    </Row>
                    {props.mode === MOVIES_MODE &&
                    movies.popularMovies.list && (movies.popularMovies.pageable.total_results && movies.popularMovies.pageable.total_results > 20) ?
                        <Pagination current={movies.popularMovies.pageable.page} pageSize={20}
                                    total={movies.popularMovies.pageable.total_results}
                                    onChange={onPageChange} showSizeChanger={false}/>
                        :
                        null
                    }
                    {props.mode === SERIES_MODE &&
                    series.popularSeries && (series.popularSeries.pageable.total_results && series.popularSeries.pageable.total_results > 20) ?
                        <Pagination current={series.popularSeries.pageable.page} pageSize={20}
                                    total={series.popularSeries.pageable.total_results}
                                    onChange={onPageChange} showSizeChanger={false}/>
                        :
                        null
                    }

                </Content>
                <FooterCustom/>
            </Layout>
        </Layout>
    );


}

export default Discover;