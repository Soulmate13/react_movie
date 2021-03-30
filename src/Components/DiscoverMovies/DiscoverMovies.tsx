import React, {useCallback} from 'react';
import {DatePicker, Layout, Menu, Pagination, Row, Select, Spin} from 'antd';
import '../../App.less';
import FooterCustom from "../../Layout/FooterCustom/FooterCustom";
import {connect, ConnectedProps} from "react-redux";
import {filterCriteriaMovies, MOVIES_MODE} from '../../Utils/constants'
import * as moment from "moment";
import {getPopular} from "../../Store/Actions/discover";
import {RootState} from "../../Store/Reducers";
import {IGenre, ModeType} from "../../Utils/Interfaces/interfaces";
import {useYear} from "../UseYear/UseYear";
import {usePage} from "../UsePage/UsePage";
import {useGenres} from "../UseGeneres/UseGenres";
import {renderMediaCards} from "../../Utils/functions";
import {getGenres} from "../../Store/Actions/genres";

const {Content, Sider} = Layout;
const {YearPicker} = DatePicker;
const {Option} = Select;

type PropsFromRedux = ConnectedProps<typeof connector>

type IDiscoverProps = PropsFromRedux & {
    mode: ModeType
}

const mapDispatchToProps = {
    getPopular,
    getGenres
};

const mapStateToProps = (state: RootState) => ({
    popularMovies: state.popularMovies,
    movieGenres: state.movieGenres
});

const connector = connect(mapStateToProps, mapDispatchToProps)

export function DiscoverMovies(props: IDiscoverProps) {

    const [year, setYear] = useYear(props.popularMovies.prevSearchParams.year);
    const [genres, addGenres, removeGenres] = useGenres(props.popularMovies.prevSearchParams.genres);
    const [page, setPage] = usePage(props.popularMovies.pageable.page);
    const [filterCriterion, setFilterCriterion] = React.useState<string>(props.popularMovies.prevSearchParams.filterCriterion);
    const [hasSearched, setHasSearched] = React.useState<boolean>(false);

    const generateSearchParams = useCallback(() => {
        return {
            page: page ? page : 1,
            year: year ? moment.default(year).format("YYYY") : null,
            genres: genres,
            filterCriterion: filterCriterion,
            mode: props.mode
        }
    }, [page, year, genres, filterCriterion, props.mode]);

    const onDiscover = React.useCallback(() => {
        const searchParams = generateSearchParams();
        let getPopularFunc = props.getPopular
        getPopularFunc(searchParams);
        setHasSearched(true);
    }, [props.getPopular, generateSearchParams])


    React.useEffect(() => {
        onDiscover();
    }, [onDiscover]);

    React.useEffect(() => {
        let getGenresFunc = props.getGenres;
        let searchParams = {mode: MOVIES_MODE}
        getGenresFunc(searchParams);
    }, [props.getGenres])

    const onYearChange = (date: moment.Moment | null) => {
        setYear(date);
        setPage(1);
    }

    const onGenreAdd = (option: number) => {
        addGenres(option);
        setPage(1);
    }

    const onGenreRemove = (option: number) => {
        removeGenres(option);
        setPage(1);
    }

    const onFilterSelect = (option: string) => {
        setFilterCriterion(option);
        setPage(1);
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
                        <YearPicker onChange={onYearChange} value={year ? moment.default(year, 'YYYY') : null}/>
                    </Menu.Item>
                    <Menu.Item>
                        <Select placeholder="Select genres" mode="multiple" allowClear={false} defaultValue={genres}
                                style={{width: '100%'}} showArrow={true} onSelect={onGenreAdd}
                                onDeselect={onGenreRemove} optionFilterProp="key">
                            {props.movieGenres.list.map((genre: IGenre) => {
                                return <Option key={genre.id} value={genre.id}>{genre.name}</Option>
                            })}
                        </Select>
                    </Menu.Item>
                    <Menu.Item>
                        <Select placeholder="Select filter" style={{width: '100%'}} value={filterCriterion}
                                onSelect={onFilterSelect}>
                            {filterCriteriaMovies.map(criteria => {
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
                    <p>Discover Movies</p>

                    <Row gutter={[16, 16]}>
                        {props.popularMovies.isFetching ? <Spin size={"large"} className="custom-spinner"/>
                            :
                            hasSearched ? props.popularMovies.list.length > 0 ? renderMediaCards(props.popularMovies.list, props.mode)
                                : <p>NO RESULTS FOUND</p>
                                : null}
                    </Row>
                    {props.popularMovies.isFetching ? null :
                        hasSearched ? props.popularMovies.list.length > 0 && (props.popularMovies.pageable.total_results && props.popularMovies.pageable.total_results > 20) ?
                            <Pagination current={props.popularMovies.pageable.page} pageSize={20}
                                        total={props.popularMovies.pageable.total_results}
                                        onChange={setPage} showSizeChanger={false}/>
                            :
                            null
                            : null}
                </Content>
                <FooterCustom/>
            </Layout>
        </Layout>
    );

}

export default connector(DiscoverMovies);