import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DatePicker, Input, Layout, Menu, Pagination, Row} from 'antd';
import '../../App.less';
import FooterCustom from "../../Layout/ContentCustom/FooterCustom/FooterCustom";
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import {MediaCard} from "../MediaCard/MediaCard";
import * as moment from "moment";
import {getSearched} from "../../Store/Actions/search";
import {RootState} from "../../Store/Reducers";
import {IMoviesListItem} from "../../Utils/Interfaces/movies";
import {ISeriesListItem} from "../../Utils/Interfaces/series";
import {ModeType} from "../../Utils/Interfaces/interfaces";

const {Content, Sider} = Layout;
const {YearPicker} = DatePicker;

interface ISearchProps {
    mode: ModeType
}

function Search(props: ISearchProps) {

    const [year, setYear] = React.useState<string | null | undefined>(null);
    const [query, setQuery] = React.useState<string | number>("");
    const [page, setPage] = React.useState<number | undefined>(undefined);

    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies);
    const series = useSelector((state: RootState) => state.series);

    const setPrevSearchParams = useCallback(
        () => {
            switch (props.mode) {
                case MOVIES_MODE:
                    movies.searchedMovies.prevSearchParams.year ? setYear(moment.default(movies.searchedMovies.prevSearchParams.year).format("YYYY")) : setYear(null);
                    setQuery(movies.searchedMovies.prevSearchParams.query);
                    movies.searchedMovies.pageable.page ? setPage(movies.searchedMovies.pageable.page) : setPage(undefined);
                    break;
                case SERIES_MODE:
                    series.searchedSeries.prevSearchParams.year ? setYear(moment.default(series.searchedSeries.prevSearchParams.year).format("YYYY")) : setYear(null);
                    setQuery(series.searchedSeries.prevSearchParams.query);
                    series.searchedSeries.pageable.page ? setPage(series.searchedSeries.pageable.page) : setPage(undefined);
                    break;
                default:
                    break;

            }
        },
        [props.mode, movies.searchedMovies.pageable.page, series.searchedSeries.pageable.page, movies.searchedMovies.prevSearchParams.query, series.searchedSeries.prevSearchParams.query, movies.searchedMovies.prevSearchParams.year, series.searchedSeries.prevSearchParams.year]
    )

    // const setPrevSearchParams = () => {
    //     switch (props.mode) {
    //         case MOVIES_MODE:
    //             movies.searchedMovies.prevSearchParams.year ? setYear(moment.default(movies.searchedMovies.prevSearchParams.year).format("YYYY")) : setYear(null);
    //             setQuery(movies.searchedMovies.prevSearchParams.query);
    //             movies.searchedMovies.pageable.page ? setPage(movies.searchedMovies.pageable.page) : setPage(undefined);
    //             break;
    //         case SERIES_MODE:
    //             series.searchedSeries.prevSearchParams.year ? setYear(moment.default(series.searchedSeries.prevSearchParams.year).format("YYYY")) : setYear(null);
    //             setQuery(series.searchedSeries.prevSearchParams.query);
    //             series.searchedSeries.pageable.page ? setPage(series.searchedSeries.pageable.page) : setPage(undefined);
    //             break;
    //         default:
    //             break;
    //
    //     }
    // }

    React.useEffect(() => {
        setPrevSearchParams();
        console.log("effect1");
    }, [])

    React.useEffect(() => {
        onSearch();
        console.log("effect2", page);
    }, [page, year])




    // React.useEffect(() => {
    //     if (query && query.toString().length >= 2) {
    //         onSearch();
    //     }
    // }, [year])


    // const onSearch = () => {
    //     if (query && query.toString().length >= 2) {
    //         const searchParams = generateSearchParams();
    //         dispatch(getSearched(searchParams));
    //     }
    // }

    const generateSearchParams = () => {
        return {
            page: page ? page : undefined,
            year: year ? moment.default(year).format("YYYY") : null,
            query: query.toString(),
            mode: props.mode
        }
    }

    const onSearch = useCallback(
        () => {
            if (query && query.toString().length >= 2) {
                const searchParams = generateSearchParams();
                dispatch(getSearched(searchParams));
            }
        }, [query, generateSearchParams, dispatch]
    )

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const changeYearHandler = (date: moment.Moment | null) => {
        date ? setYear(date.format("YYYY")) : setYear(null);
    }

    const onPageChange = (pageNum: number) => {
        setPage(pageNum);
    }

    return (
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    defaultSelectedKeys={['home']}
                    style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item>
                        <YearPicker onChange={changeYearHandler} value={year ? moment.default(year, 'YYYY') : null}/>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content
                    className="site-layout-background content-section"
                >
                    <p>Search {props.mode === MOVIES_MODE ? "Movies" : "Series"}</p>
                    <Input.Search placeholder="search" name="query" className='search-field' value={query}
                                  onChange={onChangeInput} enterButton onSearch={onSearch} allowClear={true}/>

                    <Row gutter={[16, 16]}>
                        {props.mode === MOVIES_MODE ? movies.searchedMovies.list.map((singleMovie: IMoviesListItem) => {
                                return <MediaCard key={singleMovie.id} data={singleMovie} mode={props.mode}/>
                            })
                            :
                            series.searchedSeries.list.map((singleSeries: ISeriesListItem) => {
                                return <MediaCard key={singleSeries.id} data={singleSeries} mode={props.mode}/>
                            })
                        }
                    </Row>
                    {props.mode === MOVIES_MODE &&
                    movies.searchedMovies.list && (movies.searchedMovies.pageable.total_results && movies.searchedMovies.pageable.total_results > 20) ?
                        <Pagination current={movies.searchedMovies.pageable.page} pageSize={20}
                                    total={movies.searchedMovies.pageable.total_results}
                                    onChange={onPageChange} showSizeChanger={false}/>
                        :
                        null
                    }
                    {props.mode === SERIES_MODE &&
                    series.searchedSeries.list && (series.searchedSeries.pageable.total_results && series.searchedSeries.pageable.total_results > 20) ?
                        <Pagination current={series.searchedSeries.pageable.page} pageSize={20}
                                    total={series.searchedSeries.pageable.total_results}
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

export default Search;