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
import {renderMediaCards} from "../../Utils/functions"
import debounce from "lodash/debounce";
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
    searchedMovies: state.searchedMovies,
});

const connector = connect(mapStateToProps, mapDispatchToProps)

export function SearchMovies(props: ISearchProps) {

    const [year, setYear] = useYear(props.searchedMovies.prevSearchParams.year);
    const [query, selectQuery] = useInput(props.searchedMovies.prevSearchParams.query);
    const [page, setPage] = usePage(props.searchedMovies.pageable.page);
    const [hasSearched, setHasSearched] = React.useState<boolean>(false);
    const [autoCompleteVisible, setAutoCompleteVisible] = React.useState<boolean>(false);
    const [focusIndex, setFocusIndex] = React.useState<number>(-1);
    const searchRef = React.createRef<HTMLDivElement>();

    const generateSearchParams = React.useCallback(() => {
        return {
            page: query === props.searchedMovies.prevSearchParams.query ? page ? page : undefined : 1,
            year: year ? moment.default(year).format("YYYY") : null,
            query: query.toString(),
            mode: props.mode
        }
    }, [page, year, query, props.mode, props.searchedMovies.prevSearchParams.query]);

    const onSearch = React.useCallback(
        () => {
            const searchParams = generateSearchParams();

            if (searchParams.query && searchParams.query.toString().trim().length >= 2) {
                let getSearchedFunc = props.getSearched;
                getSearchedFunc(searchParams);
                setHasSearched(true);
                setAutoCompleteVisible(false);
                setFocusIndex(-1);
            }
        }, [generateSearchParams, props.getSearched]
    );

    const handleOuterClick = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setAutoCompleteVisible(false);
            setFocusIndex(-1);
        }
    }

    React.useEffect(() => {
        onSearch();
    }, [page, year]);

    React.useEffect(() => {
        document.addEventListener('click', handleOuterClick);
    });

    const optionClick = (e: React.SyntheticEvent<HTMLElement>) => {
        if (e.currentTarget.dataset.name) {
            selectQuery(e.currentTarget.dataset.name);
            setAutoCompleteVisible(false);
            onSearch();
        }
    }

    const changeYearHandler = (date: moment.Moment | null) => {
        setYear(date);
        setPage(1);
    }

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

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        if (!autoCompleteVisible) {
            setAutoCompleteVisible(true);
        }

        selectQuery(event.target.value);
        debouncedSearchNames(event.target.value);
    }

    const handleNavigation = (event: React.KeyboardEvent) => {
        let index;
        switch (event.key) {
            case (keys.DOWN):
                event.preventDefault();
                index = (focusIndex + 1) % props.searchedMovies.suggestedNames.length
                setFocusIndex(index);
                selectQuery(props.searchedMovies.suggestedNames[index].value);
                break;
            case (keys.UP):
                event.preventDefault();
                index = (focusIndex - 1 + props.searchedMovies.suggestedNames.length) % props.searchedMovies.suggestedNames.length
                setFocusIndex(index);
                selectQuery(props.searchedMovies.suggestedNames[index].value);
                break;
            default:
                break
        }
    }

    const onFocusHandler = () => {
        setAutoCompleteVisible(true);
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
            <Layout className="layout-1">
                <Content
                    className="site-layout-background content-section">
                    <p>Search Movies</p>
                    <div className="search-wrapper" ref={searchRef as React.RefObject<HTMLDivElement>}>
                        <Input.Search placeholder="search" name="query" className='search-field' value={query}
                                      onChange={onChangeHandler} enterButton onSearch={onSearch} autoComplete={"off"}
                                      onFocus={onFocusHandler} onKeyDown={handleNavigation}/>
                        {autoCompleteVisible && query.length > 0 &&
                        <ul className="autosuggest-list">
                            {props.searchedMovies.suggestedNames.map((item, index) => {
                                return (
                                    <li className={`list-item ${focusIndex === index ? 'active' : ""}`} key={item.key}
                                        onClick={optionClick}
                                        data-name={item.value}>{item.value}</li>)
                            })}
                        </ul>
                        }
                    </div>


                    <Row gutter={[16, 16]} className="movies-row">
                        {props.searchedMovies.isFetching ?
                            <Spin size={"large"} className="custom-spinner"/>
                            :
                            hasSearched ? props.searchedMovies.list.length > 0 ? renderMediaCards(props.searchedMovies.list, props.mode) :
                                <p>NO RESULTS FOUND</p>
                                : null}
                    </Row>
                    <div className="movies-pagination">
                        {props.searchedMovies.isFetching ? null
                            :
                            hasSearched ? props.searchedMovies.list.length > 0 && (props.searchedMovies.pageable.total_results && props.searchedMovies.pageable.total_results > 20) ?
                                <Pagination current={props.searchedMovies.pageable.page} pageSize={20}
                                            total={props.searchedMovies.pageable.total_results}
                                            onChange={setPage} showSizeChanger={false}/>
                                :
                                null
                                : null}
                    </div>

                </Content>
                <FooterCustom/>
            </Layout>
        </Layout>
    );

}

export default connector(SearchMovies);