import React, {Component} from 'react';
import {DatePicker, Layout, Menu, Pagination, Row, Select} from 'antd';
import '../../App.less';
import FooterCustom from "../../Layout/ContentCustom/FooterCustom/FooterCustom";
import {connect} from "react-redux";
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import {genresList, filterCriteria} from '../../Utils/constants'
import MediaCard from "../MediaCard/MediaCard";
import moment from "moment";
import {getPopular} from "../../Store/Actions/discover";

const {Content, Sider} = Layout;
const {YearPicker} = DatePicker;
const {Option} = Select;

class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: null,
            yearObj: null,
            genres: [],
            filterCriterion: "popularity.desc"
        }

    }

    componentDidMount() {
        this.setPrevSearchParams();
    }

    setPrevSearchParams() {
        switch (this.props.mode) {
            case MOVIES_MODE:
                this.setState({
                    year: this.props.movies.popularMovies.prevSearchParams.year,
                    yearObj: this.props.movies.popularMovies.prevSearchParams.yearObj,
                    genres: this.props.movies.popularMovies.prevSearchParams.genres,
                    filterCriterion: this.props.movies.popularMovies.prevSearchParams.filterCriterion
                }, this.onDiscover)
                break;
            case SERIES_MODE:
                this.setState({
                    year: this.props.series.popularSeries.prevSearchParams.year,
                    yearObj: this.props.series.popularSeries.prevSearchParams.yearObj,
                    genres: this.props.series.popularSeries.prevSearchParams.genres,
                    filterCriterion: this.props.series.popularSeries.prevSearchParams.filterCriterion
                }, this.onDiscover)
                break;
            default:
                break;

        }
    }

    generateSearchParams = () => {
        return {
            page: this.props.mode === MOVIES_MODE ? this.props.movies.popularMovies.pageable.page : this.props.series.popularSeries.pageable.page,
            year: this.state.year,
            yearObj: this.state.yearObj,
            genres: this.state.genres,
            filterCriterion: this.state.filterCriterion,
            mode: this.props.mode
        }
    }

    onNewDiscover = () => {
        const searchParams = this.generateSearchParams();
        searchParams.page = 1;
        this.props.getPopular(searchParams);
    }

    onDiscover = () => {
        const searchParams = this.generateSearchParams();
        this.props.getPopular(searchParams);
    }

    changeYearHandler = (date) => {
        if (date === null) {
            this.setState({
                year: "",
                yearObj: null,
            }, this.onNewDiscover)
        } else {
            let year = moment(date).format('YYYY');
            this.setState({
                year: year,
                yearObj: date
            },this.onNewDiscover)
        }
    }

    onPageChange = (pageNum) => {
        const searchParams = this.generateSearchParams();
        searchParams.page = pageNum;
        this.props.getPopular(searchParams);
    }

    onGenreAdd = (option) => {
        let currentGenres = this.state.genres;
        currentGenres.push(option);
        this.setState({genres: currentGenres}, this.onNewDiscover);

    }

    onGenreRemove = (option) => {
        let currentGenres = this.state.genres;
        let filteredGenres = currentGenres.filter(genre => genre !== option);
        this.setState({genres: filteredGenres}, this.onNewDiscover)
    }

    onFilterSelect = (option) => {
        this.setState({filterCriterion: option}, this.onNewDiscover)
    }


    render() {
        return (
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        defaultSelectedKeys={['home']}
                        style={{height: '100%', borderRight: 0}}
                        className="sider-menu"
                    >
                        <Menu.Item>
                            <YearPicker onChange={this.changeYearHandler} value={this.state.yearObj ? moment(this.state.yearObj, 'YYYY') : null}/>
                        </Menu.Item>
                        <Menu.Item>
                           <Select placeholder="Select genres" mode="multiple" allowClear={false}  value={this.state.genres} style={{ width: '100%' }} showArrow={true} onSelect={this.onGenreAdd} onDeselect={this.onGenreRemove} optionFilterProp="key">
                               {genresList.map(genre => {
                                   return <Option key={genre.title} value={genre.value}>{genre.title}</Option>
                               })}
                           </Select>
                        </Menu.Item>
                        <Menu.Item>
                            <Select placeholder="Select filter" style={{ width: '100%' }} value={this.state.filterCriterion} onSelect={this.onFilterSelect} >
                                {filterCriteria.map(genre => {
                                    return <Option key={genre.title} value={genre.value}>{genre.title}</Option>
                                })}
                            </Select>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        className="site-layout-background content-section"
                    >
                        <p>Discover {this.props.mode === MOVIES_MODE ? "Movies" : "Series"}</p>

                        <Row gutter={[16]}>
                            {this.props.mode === MOVIES_MODE ? this.props.movies.popularMovies.list.map((singleMovie) => {
                                    return <MediaCard key={singleMovie.id} data={singleMovie} mode={this.props.mode}/>
                                })
                                :
                                this.props.series.popularSeries.list.map((singleMovie) => {
                                    return <MediaCard key={singleMovie.id} data={singleMovie} mode={this.props.mode}/>
                                })
                            }
                        </Row>
                        {this.props.mode === MOVIES_MODE &&
                        this.props.movies.popularMovies.list && this.props.movies.popularMovies.pageable.total_results > 20 ?
                            <Pagination current={this.props.movies.popularMovies.pageable.page} pageSize={20}
                                        total={this.props.movies.popularMovies.pageable.total_results}
                                        onChange={this.onPageChange} showSizeChanger={false}/>
                            :
                            null
                        }
                        {this.props.mode === SERIES_MODE &&
                        this.props.series.popularSeries && this.props.series.popularSeries.pageable.total_results > 20 ?
                            <Pagination current={this.props.series.popularSeries.pageable.page} pageSize={20}
                                        total={this.props.series.popularSeries.pageable.total_results}
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
    getPopular,
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover);