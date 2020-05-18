import React, {Component} from 'react';
import {DatePicker, Input, Layout, Menu, Pagination, Row} from 'antd';
import '../../App.less';
import FooterCustom from "../../Layout/ContentCustom/FooterCustom/FooterCustom";
import {connect} from "react-redux";
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import MediaCard from "../MediaCard/MediaCard";
import moment from "moment";
import {getSearched} from "../../Store/Actions/search";

const {Content, Sider} = Layout;
const {YearPicker} = DatePicker;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yearObj: null,
            query: "",
        }

    }

    componentDidMount() {
        this.setPrevSearchParams();
    }

    setPrevSearchParams() {
        switch (this.props.mode) {
            case MOVIES_MODE:
                this.setState({
                    yearObj: this.props.movies.searchedMovies.prevSearchParams.yearObj,
                    query: this.props.movies.searchedMovies.prevSearchParams.query
                })
                break;
            case SERIES_MODE:
                this.setState({
                    yearObj: this.props.series.searchedSeries.prevSearchParams.yearObj,
                    query: this.props.series.searchedSeries.prevSearchParams.query
                })
                break;
            default:
                break;

        }
    }

    onSearch = () => {
        if (this.state.query.length >= 2) {
            const searchParams = this.generateSearchParams();
            searchParams.page = 1;
            this.props.getSearched(searchParams);
        }
    }

    onChangeInput = (event) => {
        const {name, value} = event.target;
        let state = this.state;
        state[name] = value;
        this.setState(state);
    }

    generateSearchParams = () => {
        return {
            page: "",
            year: moment(this.state.yearObj).format("YYYY"),
            yearObj: this.state.yearObj,
            query:this.state.query,
            mode: this.props.mode
        }
    }

    changeYearHandler = (date) => {
        if (date === null) {
            this.setState({
                yearObj: null,
            }, this.state.query.length >= 2 ? this.onSearch : null)
        } else {
            this.setState({
                yearObj: date
            },this.state.query.length >= 2 ? this.onSearch : null)
        }

    }

    onPageChange = (pageNum) => {
        const searchParams = this.generateSearchParams();
        searchParams.page = pageNum;
        this.props.getSearched(searchParams);
    }

    render() {
        return (
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        defaultSelectedKeys={['home']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item>
                            <YearPicker onChange={this.changeYearHandler} value={this.state.yearObj ? moment(this.state.yearObj, 'YYYY') : null}/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        className="site-layout-background content-section"
                    >
                        <p>Search {this.props.mode === MOVIES_MODE ? "Movies" : "Series"}</p>
                        <Input.Search name="query" className='search-field' value={this.state.query}
                                      onChange={this.onChangeInput} enterButton onSearch={this.onSearch}/>

                        <Row gutter={[16]}>
                            {this.props.mode === MOVIES_MODE ? this.props.movies.searchedMovies.list.map(singleMovie => {
                                    return <MediaCard key={singleMovie.id} data={singleMovie} mode={this.props.mode}/>
                                })
                                :
                                this.props.series.searchedSeries.list.map(singleMovie => {
                                    return <MediaCard key={singleMovie.id} data={singleMovie} mode={this.props.mode}/>
                                })
                            }
                        </Row>
                        {   this.props.mode === MOVIES_MODE &&
                            this.props.movies.searchedMovies.list && this.props.movies.searchedMovies.pageable.total_results > 20 ?
                            <Pagination current={this.props.movies.searchedMovies.pageable.page} pageSize={20}
                                            total={this.props.movies.searchedMovies.pageable.total_results}
                                            onChange={this.onPageChange} showSizeChanger={false}/>
                                :
                                null
                        }
                        {this.props.mode === SERIES_MODE &&
                            this.props.series.searchedSeries.list && this.props.series.searchedSeries.pageable.total_results > 20 ?
                                <Pagination current={this.props.series.searchedSeries.pageable.page} pageSize={20}
                                            total={this.props.series.searchedSeries.pageable.total_results}
                                            onChange={this.onPageChange} showSizeChanger={false}/>
                                :
                                null
                        }

                    </Content>
                    <FooterCustom/>
                </Layout>
            </Layout>
        );
    }


}

function mapStateToProps(state, ownProps) {
    return {
        movies: state.movies,
        series: state.series,
        ownProps,
    }
}

const mapDispatchToProps = {
    getSearched,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);