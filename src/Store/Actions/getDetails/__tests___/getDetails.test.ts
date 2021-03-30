import thunk, {ThunkDispatch} from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {FAILURE, REQUEST, SUCCESS} from '../../../constants';
import {getDetails} from '../getDetails';
import {MOVIES_MODE, SERIES_MODE} from "../../../../Utils/constants";
import {GET_SINGLE_MOVIE, GET_SINGLE_SERIES} from "../../actionsList";
import moxios from 'moxios';

const buildStore = configureStore<any, ThunkDispatch<any, any, any>>([thunk]);

describe('async getDetails function', () => {

    const mockSuccess = data => ({ status: 200, response: { data } });
    const mockError = error => ({ status: 500, response: error });

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('in M0VIES_MODE', () => {

        it('dispatches correct "GET_SINGLE_MOVIE_PENDING" and "GET_SINGLE_MOVIE_DONE" actions when the request is successful', () => {

            const testArgs = {mode: MOVIES_MODE, id: "1"}
            const mockResponseData = {
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

            };
            const expectedActions = [
                REQUEST(GET_SINGLE_MOVIE),
                SUCCESS(GET_SINGLE_MOVIE),
            ]
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith(mockSuccess(mockResponseData));
            })

            const store = buildStore({});

            return store.dispatch(getDetails(testArgs)).then(() => {
                const actualActions = store.getActions().map(action => action.type);
                expect(actualActions).toEqual(expectedActions);
            });

        });

        it('dispatches correct "GET_SINGLE_MOVIE_PENDING" and "GET_SINGLE_MOVIE_FAILURE" actions when the request failed', () => {
            const testArgs = {mode: MOVIES_MODE, id: "1"}
            const expectedActions = [
                REQUEST(GET_SINGLE_MOVIE),
                FAILURE(GET_SINGLE_MOVIE),
            ]
            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith(mockError("error"));
            })

            const store = buildStore({});

            return store.dispatch(getDetails(testArgs)).then(() => {
                const actualActions = store.getActions().map(action => action.type);
                expect(actualActions).toEqual(expectedActions);
            });

        });

    });


    describe('in SERIES_MODE', () => {

        it('dispatches correct "GET_SINGLE_SERIES_PENDING" and "GET_SINGLE_SERIES_DONE" actions if the request is successful', () => {

            let mockResponseData = {
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

            };
            const testArgs = {mode: SERIES_MODE, id: "1"}
            const store = buildStore({});
            const expectedActions = [
                REQUEST(GET_SINGLE_SERIES),
                SUCCESS(GET_SINGLE_SERIES),
            ]

            moxios.wait(() => {
                const request = moxios.requests.mostRecent()
                request.respondWith(mockSuccess(mockResponseData))
            })


            return store.dispatch(getDetails(testArgs)).then(() => {
                const actualActions = store.getActions().map(action => action.type);
                expect(actualActions).toEqual(expectedActions);
            });

        });

        it('dispatches correct "GET_SINGLE_SERIES_PENDING" and "GET_SINGLE_SERIES_FAILURE" actions when the request failed', () => {

            const testArgs = {mode: SERIES_MODE, id: "1"};
            const store = buildStore({});
            const expectedActions = [
                REQUEST(GET_SINGLE_SERIES),
                FAILURE(GET_SINGLE_SERIES),
            ];

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith(mockError("error"));
            })


            return store.dispatch(getDetails(testArgs)).then(() => {
                const actualActions = store.getActions().map(action => action.type);
                expect(actualActions).toEqual(expectedActions);
            });

        });

    });

})