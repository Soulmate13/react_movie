import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import MediaCardLargeMovieConnect, {MediaCardLargeMovie} from '../MediaCardLargeMovie';
import {ModeType} from "../../../Utils/Interfaces/interfaces";
import thunk from 'redux-thunk';
import configureStore, {MockStore} from 'redux-mock-store';
import {Spin as Spin} from "antd";

const buildStore = configureStore([thunk]);

describe('Media Card Component', () => {

    const MOVIES_MODE: ModeType = "MOVIES_MODE"
    let wrapper: ShallowWrapper;
    let container: ShallowWrapper;
    let store: MockStore;

    describe('connect component', () => {

        it('should render inner component', () => {
            const initialState = {
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    }
                },
            }
            store = buildStore(initialState);
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                data: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            wrapper = shallow(<MediaCardLargeMovieConnect store={store} {...testProps}/>);

            expect(wrapper.length).toEqual(1);
        });
    });

    describe('inner component', () => {

        it('should render nothing if mode is not given', () => {
            const testProps = {
                id: "1",
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.hostNodes().isEmptyRender()).toBeTruthy();
        });
    })

    describe('inner component in movie specific mode', () => {

        it('should render a single movie mediacard', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-movie').exists()).toBeTruthy();
        });

        it('should show the spinner when the movie is loading', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: true,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('Spin').exists()).toBeTruthy();
        });

        it('should not show the spinner when the movie is not loading', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

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
                    mode: MOVIES_MODE,
                    singleMovie: {
                        isFetching: false,
                        didInvalidate: false,
                        data: {
                            genres: [
                                {
                                    id: 0,
                                    name: ""
                                },
                            ],
                            homepage: "",
                            id: 0,
                            imdb_id: "",
                            overview: "",
                            poster_path: "",
                            release_date: "",
                            tagline: "",
                            title: title
                        },
                    },
                    getDetails: jest.fn()
                };
                container = shallow(<MediaCardLargeMovie {...testProps} />);

                expect(container.find('.single-title').text()).toBe(expected);
            });
        });

        describe.each
        `date            | expected
        ${"10.10.2010"}  | ${"Released on: 10.10.2010"}
        ${""}            | ${"Date Unavailable"}
        ${" "}           | ${"Date Unavailable"}
        ${null}          | ${"Date Unavailable"}
        ${undefined}     | ${"Date Unavailable"}
        `('When the date is $date', ({date, expected}) => {
            it(`${expected} text is rendered`, () => {
                const testProps = {
                    id: "1",
                    mode: MOVIES_MODE,
                    singleMovie: {
                        isFetching: false,
                        didInvalidate: false,
                        data: {
                            genres: [
                                {
                                    id: 0,
                                    name: ""
                                },
                            ],
                            homepage: "",
                            id: 0,
                            imdb_id: "",
                            overview: "",
                            poster_path: "",
                            release_date: date,
                            tagline: "",
                        },
                    },
                    getDetails: jest.fn()
                };
                container = shallow(<MediaCardLargeMovie {...testProps} />);

                expect(container.find('.single-date').text()).toBe(expected);
            });
        });

        it('should show the tagline if given', () => {
            const testTagline = "tagline";
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: testTagline,
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-tagline').text()).toBe(testTagline);
        });

        it('should not show the tagline if not given', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-tagline').exists()).toBeFalsy();
        });

        it('should show the overview if given', () => {
            const testOverview = "overview";
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: testOverview,
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-overview').text()).toBe(`Overview: ${testOverview}`);
        });

        it('should not show the overview if not given', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        poster_path: "",
                        release_date: "",
                        title: "",
                        tagline: ""
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-overview').exists()).toBeFalsy();
        });

        it('should not show the overview if given an empty string with a space', () => {
            const testOverview = " ";
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        poster_path: "",
                        release_date: "",
                        title: "",
                        tagline: "",
                        overview: testOverview
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-overview').exists()).toBeFalsy();
        });

        it('should show the correct homepage link if given', () => {
            const testHomePageLink = "link";
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: testHomePageLink,
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-link').prop('href')).toBe(testHomePageLink);
        });

        it('should not show the homepage link if not given', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        id: 0,
                        imdb_id: "",
                        release_date: "",
                        title: "",
                        tagline: "",
                        overview: ""
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-link').exists()).toBeFalsy();
        });

        it('should not show the homepage link if given an empty string with a space', () => {
            const testHomePageLink = " ";
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: testHomePageLink,
                        id: 0,
                        imdb_id: "",
                        poster_path: "",
                        release_date: "",
                        title: "",
                        tagline: "",
                        overview: ""
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-overview').exists()).toBeFalsy();
        });

        it('should show the correct imdb link if imdb_id given', () => {
            const testIMDBid = "link";
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: testIMDBid,
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.imdb-link').prop('href')).toBe(`https://www.imdb.com/title/${testIMDBid}`);
        });

        it('should not show the imdb link if imdb_id is not given', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        release_date: "",
                        title: "",
                        tagline: "",
                        overview: ""
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.imdb-link').exists()).toBeFalsy();
        });

        it('should not show the imdb link if given an empty string with a space', () => {
            const testIMDBid = " ";
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: testIMDBid,
                        poster_path: "",
                        release_date: "",
                        title: "",
                        tagline: "",
                        overview: ""
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);

            expect(container.find('.single-overview').exists()).toBeFalsy();
        });

        it('should show the list of genres if available', () => {
            const testGenres = [{id: 1, name: "genre one"}, {id: 2, name: "genre two"}]
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: testGenres,
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps}/>);
            expect(container.find('.single-genres').text()).toBe(`Genres: ${testGenres[0].name.toString()}, ${testGenres[1].name.toString()}`);
        });

        it('should not show the list of genres if none available', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps}/>)
            expect(container.find('.single-genres').exists()).toBeFalsy();


        });

        it('should show the filtered list of genres where empty names are omitted', () => {
            const testGenres = [{id: 1, name: "genre one"}, {id: 2, name: ""}, {id: 3, name: "genre three"}]
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: testGenres,
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps}/>)
            expect(container.find('.single-genres').text()).toBe(`Genres: ${testGenres[0].name.toString()}, ${testGenres[2].name.toString()}`);


        });

        it('should call discover function on page load', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };

            container = shallow(<MediaCardLargeMovie {...testProps} />);
            expect(testProps.getDetails).toBeCalledWith({mode: MOVIES_MODE, id: "1"});
        });

        it('should call discover function on page load once', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: false,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };

            container = shallow(<MediaCardLargeMovie {...testProps} />);
            expect(testProps.getDetails).toHaveBeenCalledTimes(1);
        });

        it('should display an error message if the request failed', () => {
            const testProps = {
                id: "1",
                mode: MOVIES_MODE,
                singleMovie: {
                    isFetching: false,
                    didInvalidate: true,
                    data: {
                        genres: [
                            {
                                id: 0,
                                name: ""
                            },
                        ],
                        homepage: "",
                        id: 0,
                        imdb_id: "",
                        overview: "",
                        poster_path: "",
                        release_date: "",
                        tagline: "",
                        title: "",
                    },
                },
                getDetails: jest.fn()
            };
            container = shallow(<MediaCardLargeMovie {...testProps} />);
            expect(container.find('.not-found').exists()).toBeTruthy();
        })

    });


});