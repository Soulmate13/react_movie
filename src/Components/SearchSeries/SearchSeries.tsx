import React, {ChangeEvent} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {DatePicker, Input, Layout, Menu, Pagination, Row, Spin} from 'antd';
import '../../App.less';
import FooterCustom from "../../Layout/FooterCustom/FooterCustom";
import * as moment from "moment";
import {getSearched, getSearchedNames} from "../../Store/Actions/search/search";
import {RootState} from "../../Store/Reducers";
import {ModeType} from "../../Utils/Interfaces/interfaces";
import {useInput} from "../UseInput/UseInput";
import {usePage} from "../UsePage/UsePage";
import {useYear} from "../UseYear/UseYear";
import {renderMediaCards} from "../../Utils/functions";
import debounce from 'lodash/debounce';
import {keys} from "../../Utils/constants";

const {Content, Sider} = Layout;
const {YearPicker} = DatePicker;

type PropsFromRedux = ConnectedProps<typeof connector>

type ISearchProps = PropsFromRedux & {
    mode: ModeType
}

const mapDispatchToProps = {
    getSearched,
    getSearchedNames
};
const mapStateToProps = (state: RootState) => ({
    searchedSeries: state.searchedSeries
});

const connector = connect(mapStateToProps, mapDispatchToProps)

export function SearchSeries(props: ISearchProps) {

    const [year, setYear] = useYear(props.searchedSeries.prevSearchParams.year);
    const [query, selectQuery] = useInput(props.searchedSeries.prevSearchParams.query);
    const [page, setPage] = usePage(props.searchedSeries.pageable.page);
    const [hasSearched, setHasSearched] = React.useState<boolean>(false);
    const [autoCompleteVisible, setAutoCompleteVisible] = React.useState<boolean>(false);
    const [focusIndex, setFocusIndex] = React.useState<number>(-1);
    const searchRef = React.createRef<HTMLDivElement>();

    const generateSearchParams = React.useCallback(() => {
        return {
            page: query === props.searchedSeries.prevSearchParams.query ? page ? page : undefined : 1,
            year: year ? moment.default(year).format("YYYY") : null,
            query: query.toString(),
            mode: props.mode
        }
    }, [page, year, query, props.mode, props.searchedSeries.prevSearchParams.query])

    const onSearch = React.useCallback(
        () => {
            const searchParams = generateSearchParams();
            if (searchParams.query && searchParams.query.toString().trim().length >= 2) {
                let getSearchFunc = props.getSearched;
                getSearchFunc(searchParams);
                setHasSearched(true);
                setAutoCompleteVisible(false);
                setFocusIndex(-1);
            }


        }, [generateSearchParams, props.getSearched]
    )

    const optionClick = (e: React.SyntheticEvent<HTMLElement>) => {
        if (e.currentTarget.dataset.name) {
            selectQuery(e.currentTarget.dataset.name);
            setAutoCompleteVisible(false);
            onSearch();
        }
    }

    React.useEffect(() => {
        onSearch();
    }, [page, year]);

    React.useEffect(() => {
        document.addEventListener('click', handleOuterClick);
    });

    const searchNames = (value: string) => {
        let getNamesFunc = props.getSearchedNames;
        const searchParams = generateSearchParams();
        searchParams.query = value;

        if (searchParams.query.length > 0) {
            getNamesFunc(searchParams);
        }
    }

    const debouncedSearchNames = React.useRef(
        debounce(async (value) => {
            searchNames(value);
        }, 800)
    ).current

    const changeYearHandler = (date: moment.Moment | null) => {
        setYear(date);
        setPage(1);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        if (!autoCompleteVisible) {
            setAutoCompleteVisible(true);
        }

        selectQuery(event.target.value);
        debouncedSearchNames(event.target.value);
    }

    const onFocusHandler = () => {
        setAutoCompleteVisible(true);
    }

    const handleOuterClick = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setAutoCompleteVisible(false);
            setFocusIndex(-1);
        }
    }

    const handleNavigation = (event: React.KeyboardEvent) => {
        let index;
        switch (event.key) {
            case (keys.DOWN):
                event.preventDefault();
                index = (focusIndex + 1) % props.searchedSeries.suggestedNames.length;
                setFocusIndex(index);
                selectQuery(props.searchedSeries.suggestedNames[index].value);
                break;
            case (keys.UP):
                event.preventDefault();
                index = (focusIndex - 1 + props.searchedSeries.suggestedNames.length) % props.searchedSeries.suggestedNames.length;
                setFocusIndex(index);
                selectQuery(props.searchedSeries.suggestedNames[index].value);
                break;
            default:
                break
        }
    }

    return (
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    defaultSelectedKeys={['home']}
                    style={{height: '100%', borderRight: 0}}>
                    <Menu.Item>
                        <YearPicker onChange={changeYearHandler} value={year ? moment.default(year, 'YYYY') : null}/>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content
                    className="site-layout-background content-section">
                    <p>Search Series</p>
                    <div className="search-wrapper" ref={searchRef as React.RefObject<HTMLDivElement>}>
                        <Input.Search placeholder="search" name="query" className='search-field' value={query}
                                      onChange={onChangeHandler} enterButton onSearch={onSearch} autoComplete={"off"}
                                      onFocus={onFocusHandler} onKeyDown={handleNavigation}/>
                        {autoCompleteVisible && query.length > 0 &&
                        <ul className="autosuggest-list">
                            {props.searchedSeries.suggestedNames.map((item, index) => {
                                return (
                                    <li className={`list-item ${focusIndex === index ? 'active' : ""}`} key={item.key}
                                        onClick={optionClick}
                                        data-name={item.value}>{item.value}</li>)
                            })}
                        </ul>
                        }

                    </div>
                    <Row gutter={[16, 16]}>

                        {props.searchedSeries.isFetching ?
                            <Spin size={"large"} className="custom-spinner"/>
                            :
                            hasSearched ? props.searchedSeries.list.length > 0 ? renderMediaCards(props.searchedSeries.list, props.mode) :
                                <p>NO RESULTS FOUND</p>
                                : null}
                    </Row>
                    {props.searchedSeries.isFetching ? null
                        :
                        hasSearched ? props.searchedSeries.list.length > 0 && (props.searchedSeries.pageable.total_results && props.searchedSeries.pageable.total_results > 20) ?
                            <Pagination current={props.searchedSeries.pageable.page} pageSize={20}
                                        total={props.searchedSeries.pageable.total_results}
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

export default connector(SearchSeries);