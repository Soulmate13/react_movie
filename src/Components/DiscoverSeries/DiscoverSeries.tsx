import React, {useCallback} from 'react';
import {DatePicker, Layout, Menu, Pagination, Row, Select, Spin} from 'antd';
import '../../App.less';
import FooterCustom from "../../Layout/FooterCustom/FooterCustom";
import {connect, ConnectedProps} from "react-redux";
import {filterCriteriaSeries, SERIES_MODE} from '../../Utils/constants'
import * as moment from "moment";
import {getPopular} from "../../Store/Actions/discover";
import {RootState} from "../../Store/Reducers";
import {IGenre, ModeType} from "../../Utils/Interfaces/interfaces";
import {useYear} from "../UseYear/UseYear";
import {useGenres} from "../UseGeneres/UseGenres";
import {usePage} from "../UsePage/UsePage";
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
    getGenres,
};

const mapStateToProps = (state: RootState) => ({
    popularSeries: state.popularSeries,
    seriesGenres: state.seriesGenres
});

const connector = connect(mapStateToProps, mapDispatchToProps)

export function DiscoverSeries (props: IDiscoverProps) {

    const [year, setYear] = useYear(props.popularSeries.prevSearchParams.year);
    const [genres, addGenres, removeGenres] = useGenres(props.popularSeries.prevSearchParams.genres);
    const [page, setPage] = usePage(props.popularSeries.pageable.page);
    const [filterCriterion, setFilterCriterion] = React.useState<string>(props.popularSeries.prevSearchParams.filterCriterion);
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
        let getPopularFunc = props.getPopular;
        getPopularFunc(searchParams);
        setHasSearched(true);

    }, [props.getPopular, generateSearchParams])


    React.useEffect(() => {
        onDiscover();
    }, [onDiscover])

    React.useEffect(() => {
        let getGenresFunc = props.getGenres;
        let searchParams = {mode: SERIES_MODE}
        getGenresFunc(searchParams);
    }, [props.getGenres])


    const onYearChange = (date: moment.Moment | null) => {
        setYear(date)
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
                            {props.seriesGenres.list.map((genre: IGenre) => {
                                return <Option key={genre.id} value={genre.id}>{genre.name}</Option>
                            })}
                        </Select>
                    </Menu.Item>
                    <Menu.Item>
                        <Select placeholder="Select filter" style={{width: '100%'}} value={filterCriterion}
                                onSelect={onFilterSelect}>
                            {filterCriteriaSeries.map(criteria => {
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
                    <p>Discover Series</p>

                    <Row gutter={[16, 16]}>
                        {props.popularSeries.isFetching ? <Spin size={"large"} className="custom-spinner"/>
                            :
                            hasSearched ? props.popularSeries.list.length > 0 ? renderMediaCards(props.popularSeries.list, props.mode)
                                : <p>NO RESULTS FOUND</p>
                                : null}
                    </Row>
                    {props.popularSeries.isFetching ? null :
                        hasSearched ? props.popularSeries.list.length > 0 && (props.popularSeries.pageable.total_results && props.popularSeries.pageable.total_results > 20) ?
                            <Pagination current={props.popularSeries.pageable.page} pageSize={20}
                                        total={props.popularSeries.pageable.total_results}
                                        onChange={setPage} showSizeChanger={false}/>
                            : null
                            : null}

                </Content>
                <FooterCustom/>
            </Layout>
        </Layout>
    );


}

export default connector(DiscoverSeries);