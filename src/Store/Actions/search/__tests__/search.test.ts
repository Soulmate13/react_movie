import thunk, {ThunkDispatch} from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {FAILURE, REQUEST, SUCCESS} from '../../../constants';
import {getSearched} from '../search';
import {MOVIES_MODE, SERIES_MODE} from "../../../../Utils/constants";
import {
    GET_SEARCHED_MOVIES,
    GET_SEARCHED_SERIES,
    GET_SEARCHED_SERIES_NAMES,
    GET_SEARCHED_MOVIES_NAMES,
} from "../../actionsList";
import moxios from 'moxios';

const buildStore = configureStore<any, ThunkDispatch<any, any, any>>([thunk]);

describe('getSearched function', () => {

    const mockSuccess = data => ({ status: 200, response: { data } });
    const mockError = error => ({ status: 500, response: error });


    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('in M0VIES_MODE', () => {

        it('dispatches correct "GET_SEARCHED_MOVIE_PENDING" and "GET_SEARCHED_MOVIE_DONE" actions when the request is successful', () => {

            const testArgs = {mode: MOVIES_MODE, page: 1, query: "query", year: "2000"};
            const mockResponseData = {
                id: 1,
                poster_path: "/path.jpg",
                release_date: "2018-04-25",
                title: "Title",
            };
            const expectedActions = [
                REQUEST(GET_SEARCHED_MOVIES),
                SUCCESS(GET_SEARCHED_MOVIES),
            ];
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith(mockSuccess(mockResponseData));
            })

            const store = buildStore({});

            return store.dispatch(getSearched(testArgs)).then(() => {
                const actualActions = store.getActions().map(action => action.type);
                expect(actualActions).toEqual(expectedActions);
            });

        });

    });

})
