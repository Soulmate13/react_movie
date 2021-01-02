import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DatePicker, Input, Layout, Menu, Pagination, Row} from 'antd';
import '../../App.less';
import FooterCustom from "../../Layout/ContentCustom/FooterCustom/FooterCustom";
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import MediaCard from "../MediaCard/MediaCard";
import moment from "moment";
import {getSearched} from "../../Store/Actions/search";

const {Content, Sider} = Layout;
const {YearPicker} = DatePicker;

function Search(props) {

    const [year, setYear] = React.useState(null);
    const [query, setQuery] = React.useState("");

    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);
    const series = useSelector(state => state.series);

    React.useEffect(() => {
        setPrevSearchParams();
    },[])

    React.useEffect(() => {
        if (query.length >= 2) {
            onSearch();
        }
    }, [year])


    const setPrevSearchParams = () => {
        switch (props.mode) {
            case MOVIES_MODE:
                setYear(movies.searchedMovies.prevSearchParams.year);
                setQuery(movies.searchedMovies.prevSearchParams.query);

                break;
            case SERIES_MODE:
                setYear(series.searchedSeries.prevSearchParams.year);
                setQuery(series.searchedSeries.prevSearchParams.query);
                break;
            default:
                break;

        }
    }

    const onSearch = () => {
        if (query.length >= 2) {
            const searchParams = generateSearchParams();
            searchParams.page = 1;
            dispatch(getSearched(searchParams));
        }
    }

    const onChangeInput = (event) => {
        setQuery(event.target.value);
        console.log(query);
    }

    const generateSearchParams = () => {
        return {
            page: "",
            year: moment(year).format("YYYY"),
            query: query,
            mode: props.mode
        }
    }

    const changeYearHandler = (date) => {
        if (date === null) {
          setYear(null);
        } else {
            setYear(date.format("YYYY"));
        }

    }

    const onPageChange = (pageNum) => {
        const searchParams = generateSearchParams();
        searchParams.page = pageNum;
        dispatch(getSearched(searchParams));
    }

        return (
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        defaultSelectedKeys={['home']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item>
                            <YearPicker onChange={changeYearHandler} value={year ? moment(year, "YYYY") : null}/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        className="site-layout-background content-section"
                    >
                        <p>Search {props.mode === MOVIES_MODE ? "Movies" : "Series"}</p>
                        <Input.Search name="query" className='search-field' value={query}
                                      onChange={onChangeInput} enterButton onSearch={onSearch}/>

                        <Row gutter={[16]}>
                            {props.mode === MOVIES_MODE ? movies.searchedMovies.list.map(singleMovie => {
                                    return <MediaCard key={singleMovie.id} data={singleMovie} mode={props.mode}/>
                                })
                                :
                                series.searchedSeries.list.map(singleMovie => {
                                    return <MediaCard key={singleMovie.id} data={singleMovie} mode={props.mode}/>
                                })
                            }
                        </Row>
                        {   props.mode === MOVIES_MODE &&
                            movies.searchedMovies.list && movies.searchedMovies.pageable.total_results > 20 ?
                            <Pagination current={movies.searchedMovies.pageable.page} pageSize={20}
                                            total={movies.searchedMovies.pageable.total_results}
                                            onChange={onPageChange} showSizeChanger={false}/>
                                :
                                null
                        }
                        {props.mode === SERIES_MODE &&
                            series.searchedSeries.list && series.searchedSeries.pageable.total_results > 20 ?
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