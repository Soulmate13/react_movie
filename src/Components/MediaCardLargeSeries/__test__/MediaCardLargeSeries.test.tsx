import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import MediaCardLargeSeriesConnect from '../MediaCardLargeSeries';
import {ModeType} from "../../../Utils/Interfaces/interfaces";
import thunk from 'redux-thunk';
import configureStore, {MockStore} from 'redux-mock-store';
import {Spin as Spin} from "antd";
import {MediaCardLargeSeries} from "../MediaCardLargeSeries";

const buildStore = configureStore([thunk]);

describe('Media Card Component', () => {

    const SERIES_MODE: ModeType = "SERIES_MODE"
    let wrapper: ShallowWrapper;
    let container: ShallowWrapper;
    let store: MockStore;

    describe('connect component', () => {
        it('should render inner component', function () {
            const initialState = {
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    }
                },
            }
            store = buildStore(initialState);

            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                data: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            wrapper = shallow(<MediaCardLargeSeriesConnect store={store} {...testProps}/>);

            expect(wrapper.length
            ).toEqual(1);
        });
    })

    describe('inner component', () => {
        it('should render nothing if mode is not given', function () {
            const testProps = {
                id: "1",
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.hostNodes().isEmptyRender()).toBeTruthy();
        });
    })

    describe('inner component in series specific mode', () => {

        it('should render a series movie mediacard', function () {
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);
            expect(container.find('.single-series').exists()).toBeTruthy();
        });

        it('should show the spinner when the series is loading', function () {
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: true,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('Spin').exists()).toBeTruthy();
        });

        it('should not show the spinner when the movie is not loading', function () {
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('Spin').exists()).toBeFalsy();
        });

        describe.each
            `title           | expected
        ${"Title"}       | ${"Title"}
        ${""}            | ${"Title Unavailable"}
        ${" "}           | ${"Title Unavailable"}
        ${null}          | ${"Title Unavailable"}
        ${undefined}     | ${"Title Unavailable"}
        `('When the title is $title', ({title, expected}) => {
            it(`${expected} text is rendered`, () => {
                const testProps = {
                    id: "1",
                    mode: SERIES_MODE,
                    singleSeries: {
                        isFetching: false,
                        didInvalidate: false,
                        data: {
                            first_air_date: "",
                            genres: [
                                {
                                    id: 0,
                                    name: ""
                                },
                            ],
                            homepage: "",
                            id: 0,
                            last_air_date: "",
                            name: title,
                            overview: "",
                            poster_path: "",
                            tagline: "",
                        },
                    },
                    getDetails: jest.fn()
                };
                container = shallow(<MediaCardLargeSeries {...testProps} />);

                expect(container.find('.single-title').text()).toBe(expected);
            });
        });

        describe.each
            `date            | expected
        ${"10.10.2010"}  | ${"First aired on: 10.10.2010"}
        ${""}            | ${"Date Unavailable"}
        ${" "}           | ${"Date Unavailable"}
        ${null}          | ${"Date Unavailable"}
        ${undefined}     | ${"Date Unavailable"}
        `('When the first air date is $date', ({date, expected}) => {
            it(`${expected} text is rendered`, () => {
                const testProps = {
                    id: "1",
                    mode: SERIES_MODE,
                    singleSeries: {
                        isFetching: false,
                        didInvalidate: false,
                        data: {
                            first_air_date: date,
                            genres: [
                                {
                                    id: 0,
                                    name: ""
                                },
                            ],
                            homepage: "",
                            id: 0,
                            last_air_date: "",
                            name: "",
                            overview: "",
                            poster_path: "",
                            tagline: "",
                        },
                    },
                    getDetails: jest.fn()
                };
                container = shallow(<MediaCardLargeSeries {...testProps} />);

                expect(container.find('.single-first-air-date').text()).toBe(expected);
            });
        });

        describe.each
            `date            | expected
        ${"10.10.2010"}  | ${"Last aired on: 10.10.2010"}
        ${""}            | ${"Date Unavailable"}
        ${" "}           | ${"Date Unavailable"}
        ${null}          | ${"Date Unavailable"}
        ${undefined}     | ${"Date Unavailable"}
        `('When the last air date is $date', ({date, expected}) => {
            it(`${expected} text is rendered`, () => {
                const testProps = {
                    id: "1",
                    mode: SERIES_MODE,
                    singleSeries: {
                        isFetching: false,
                        didInvalidate: false,
                        data: {
                            first_air_date: "",
                            genres: [
                                {
                                    id: 0,
                                    name: ""
                                },
                            ],
                            homepage: "",
                            id: 0,
                            last_air_date: date,
                            name: "",
                            overview: "",
                            poster_path: "",
                            tagline: "",
                        },
                    },
                    getDetails: jest.fn()
                };
                container = shallow(<MediaCardLargeSeries {...testProps} />);

                expect(container.find('.single-last-air-date').text()).toBe(expected);
            });
        });

        it('should show the tagline if given', () => {
            const testTagline = "tagline";
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: testTagline,
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('.single-tagline').text()).toBe(testTagline);
        });

        it('should not show the tagline if not given', () => {
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('.single-tagline').exists()).toBeFalsy();
        });

        it('should show the overview if given', () => {
            const testOverview = "overview";
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: testOverview,
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('.single-overview').text()).toBe(`Overview: ${testOverview}`);
        });

        it('should not show the overview if not given', () => {
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('.single-overview').exists()).toBeFalsy();
        });

        it('should not show the overview if an empty string with a space is given', () => {
            const testOverview = " ";
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: testOverview,
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('.single-overview').exists()).toBeFalsy();
        });

        it('should show the the correct homepage link if given', () => {
            const testLink = "link";
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: testLink,
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('.single-link').prop('href')).toBe(testLink);
        });

        it('should not show the the homepage link if not given', () => {
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('.single-link').exists()).toBeFalsy();
        });

        it('should not show the the homepage link if given an empty string with a space', () => {
            const testLink = " ";
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: testLink,
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);

            expect(container.find('.single-link').exists()).toBeFalsy();
        });

        it('should show the list of genres if available', () => {
            const testGenres = [{id: 1, name: "genre one"}, {id: 2, name: "genre two"}]
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: testGenres,
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps}/>);

            expect(container.find('.single-genres').text()).toBe(`Genres: ${testGenres[0].name.toString()}, ${testGenres[1].name.toString()}`);
        });

        it('should not show the list of genres if none available', () => {
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: [],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps}/>);

            expect(container.find('.single-genres').exists()).toBeFalsy();
        });

        it('should show the filtered list of genres where empty names are omitted', () => {
            const testGenres = [{id: 1, name: "genre one"}, {id: 2, name: " "}, {id: 3, name: "genre three"}]
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        first_air_date: "",
                        genres: testGenres,
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps}/>);

            expect(container.find('.single-genres').text()).toBe(`Genres: ${testGenres[0].name.toString()}, ${testGenres[2].name.toString()}`);
        });

        it('should display an error message if the request failed', () => {
            const testProps = {
                id: "1",
                mode: SERIES_MODE,
                singleSeries: {
                    isFetching: false,
                    didInvalidate: true,
                    data: {
                        first_air_date: "",
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        last_air_date: "",
                        name: "",
                        overview: "",
                        poster_path: "",
                        tagline: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeSeries {...testProps} />);
            expect(container.find('.not-found').exists()).toBeTruthy();
        })

    })


});