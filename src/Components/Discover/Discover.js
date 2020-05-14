import React, {Component} from 'react';
import {DatePicker, Input, Layout, Menu, Pagination, Row, Select} from 'antd';
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
            year: "",
            query: "",
            genres: [],
            filterCriterion: "popularity.desc"
        }

    }

    componentDidMount() {
        this.checkListPresence();
    }

    checkListPresence = () => {
        switch (this.props.mode) {
            case MOVIES_MODE:
                if (this.props.movies.popularMovies.list.length === 0) {
                    this.onDiscover();
                }
                break;
            case SERIES_MODE:
                if (this.props.series.popularSeries.list.length === 0) {
                    this.onDiscover();
                }
                break;
            default:
                break;
        }
    }

    generateSearchParams = () => {
        return {
            page: "",
            year: this.state.year,
            query: this.state.query,
            genres: this.state.genres,
            filterCriterion: this.state.filterCriterion,
            mode: this.props.mode
        }
    }

    onDiscover = () => {
        const searchParams = this.generateSearchParams();
        searchParams.page = 1;
        this.props.getPopular(searchParams);
    }

    changeYearHandler = (date) => {
        let year = moment(date).format('YYYY');
        this.setState({
            year: year
        }, this.onDiscover)
    }

    onPageChange = (pageNum) => {
        const searchParams = this.generateSearchParams();
        searchParams.page = pageNum;
        this.props.getPopular(searchParams);
    }

    onGenreAdd = (option) => {
        let currentGenres = this.state.genres;
        currentGenres.push(option);
        this.setState({genres: currentGenres}, this.onDiscover);

    }

    onGenreRemove = (option) => {
        let currentGenres = this.state.genres;
        let filteredGenres = currentGenres.filter(genre => genre !== option);
        this.setState({genres: filteredGenres}, this.onDiscover)
    }

    onFilterSelect = (option) => {
        this.setState({filterCriterion: option}, this.onDiscover)
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
                            <YearPicker onChange={this.changeYearHandler}/>
                        </Menu.Item>
                        <Menu.Item>
                           <Select placeholder="Select genres" mode="multiple" allowClear={false}  style={{ width: '100%' }} showArrow={true} onSelect={this.onGenreAdd} onDeselect={this.onGenreRemove} optionFilterProp="key">
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