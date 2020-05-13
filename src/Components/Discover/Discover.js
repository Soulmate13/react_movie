// import React, {Component} from 'react';
// import {DatePicker, Input, Layout, Menu, Pagination, Row} from 'antd';
// import '../../App.less';
// import FooterCustom from "../../Layout/ContentCustom/FooterCustom/FooterCustom";
// import {connect} from "react-redux";
// import {getSearched} from "../../Store/Actions/search";
// import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
// import SingleMovie from "../SingleMovie/SingleMovie";
// import moment from "moment";
//
// const {Content, Sider} = Layout;
// const {YearPicker} = DatePicker;
//
// class Discover extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             year: "",
//             query: "",
//             genres: [],
//             filterCriterion: ""
//         }
//
//     }
//
//     changeYearHandler = (date) => {
//         let year = moment(date).format('YYYY');
//         this.setState({
//             year: year
//         }, this.state.query.length >= 2 ? this.onSearch : null)
//     }
//
//     // onSearch = () => {
//     //     if (this.state.query.length >= 2) {
//     //         const searchParams = {
//     //             page: (this.props.mode === MOVIES_MODE && this.props.movies.pageable.page) ||
//     //                 (this.props.mode === SERIES_MODE && this.props.series.pageable.page),
//     //             year: this.state.year,
//     //             query:this.state.query,
//     //             mode: this.props.mode
//     //         }
//     //         this.props.getSearched(searchParams);
//     //     }
//     // }
//
//
//     onPageChange = (pageNum) => {
//         const searchParams = {
//             page: pageNum,
//             year: this.state.year,
//             query: this.state.query,
//             mode: this.props.mode
//         }
//         // this.props.getSearched(searchParams);
//     }
//
//     render() {
//         return (
//             <Layout>
//                 <Sider width={200} className="site-layout-background">
//                     <Menu
//                         defaultSelectedKeys={['home']}
//                         style={{height: '100%', borderRight: 0}}
//                     >
//                         <Menu.Item>
//                             <YearPicker onChange={this.changeYearHandler}/>
//                         </Menu.Item>
//                     </Menu>
//                 </Sider>
//                 <Layout>
//                     <Content
//                         className="site-layout-background content-section"
//                     >
//                         <p>Search {this.props.mode === MOVIES_MODE ? "Movies" : "Series"}</p>
//                         <Input.Search name="query" className='search-field' value={this.state.query}
//                                       onChange={this.onChangeInput} enterButton onSearch={this.onSearch}/>
//
//                         <Row gutter={[16]}>
//                             {this.props.mode === MOVIES_MODE ? this.props.movies.popularMovies.list.map((singleMovie) => {
//                                     return <SingleMovie key={singleMovie.id} data={singleMovie} mode={this.props.mode}/>
//                                 })
//                                 :
//                                 this.props.series.popularSeries.list.map((singleMovie) => {
//                                     return <SingleMovie key={singleMovie.id} data={singleMovie} mode={this.props.mode}/>
//                                 })
//                             }
//                         </Row>
//                         {this.props.mode === MOVIES_MODE &&
//                         this.props.movies.popularMovies.list && this.props.movies.popularMovies.pageable.total_results > 20 ?
//                             <Pagination current={this.props.movies.popularMovies.pageable.page} pageSize={20}
//                                         total={this.props.movies.popularMovies.pageable.total_results}
//                                         onChange={this.onPageChange} showSizeChanger={false}/>
//                             :
//                             null
//                         }
//                         {this.props.mode === SERIES_MODE &&
//                         this.props.series.popularSeries && this.props.series.popularSeries.pageable.total_results > 20 ?
//                             <Pagination current={this.props.series.popularSeries.pageable.page} pageSize={20}
//                                         total={this.props.series.popularSeries.pageable.total_results}
//                                         onChange={this.onPageChange} showSizeChanger={false}/>
//                             :
//                             null
//                         }
//
//                     </Content>
//                     <FooterCustom/>
//                 </Layout>
//             </Layout>
//         );
//     }
//
//
// }
//
// function mapStateToProps(state, ownProps) {
//     return {
//         movies: state.movies,
//         series: state.series,
//         ownProps,
//     }
// }
//
// const mapDispatchToProps = {
//     // getSearched,
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Discover);