import reducer from "../popularSeries";
import {
    GET_POPULAR_SERIES
} from '../../../Actions/actionsList';
import {
    SUCCESS,
    REQUEST,
    FAILURE,
} from '../../../constants';
import {IPopularSeries} from "../../../../Utils/Interfaces/series";

describe("Popular series reducer", () => {
    const initialState: IPopularSeries = {
        isFetching: false,
        didInvalidate: false,
        list: [],
        pageable: {
            page: undefined,
            total_results: 0
        },
        prevSearchParams: {
            year: null,
            genres: [],
            filterCriterion: "popularity.desc",
            page: undefined

        },
    }

    it('should return the initial state', () => {

        expect(reducer(undefined, {})).toEqual(
            initialState
        )
    });

    it('should handle GET_POPULAR_SERIES_PENDING action', () => {
        const expectedState = {
            isFetching: true,
            didInvalidate: false,
            list: [],
            pageable: {
                page: undefined,
                total_results: 0
            },
            prevSearchParams: {
                year: null,
                genres: [],
                filterCriterion: "popularity.desc",
                page: undefined
            },
        }

        expect(reducer(initialState, {type: REQUEST(GET_POPULAR_SERIES)})).toEqual(
            expectedState
        )
    });

    it('should handle GET_POPULAR_SERIES_SUCCESS action', () => {

        const testPayload = {
            list: [{
                backdrop_path: "/path.jpg",
                first_air_date: "2021-03-19",
                genre_ids: [1],
                id: 1,
                name: "Title",
                overview: "Overview",
                popularity: 1,
                poster_path: "path.jpg",
            }],
            pageable: {
                page: 1,
                total_results: 1
            },
            prevSearchParams: {
                year: null,
                genres: [1],
                filterCriterion: "popularity.desc",
                page: 1
            },
        }

        const expectedState = {
            isFetching: false,
            didInvalidate: false,
            list: [{
                backdrop_path: "/path.jpg",
                first_air_date: "2021-03-19",
                genre_ids: [1],
                id: 1,
                name: "Title",
                overview: "Overview",
                popularity: 1,
                poster_path: "path.jpg",
            }],
            pageable: {
                page: 1,
                total_results: 1
            },
            prevSearchParams: {
                year: null,
                genres: [1],
                filterCriterion: "popularity.desc",
                page: 1
            },
        }

        expect(reducer(initialState, {type: SUCCESS(GET_POPULAR_SERIES), payload: testPayload})).toEqual(
            expectedState
        )
    });

    it('should handle GET_POPULAR_SERIES_FAILURE action', () => {

        const expectedState = {
            isFetching: false,
            didInvalidate: true,
            list: [],
            pageable: {
                page: undefined,
                total_results: 0
            },
            prevSearchParams: {
                year: null,
                genres: [],
                filterCriterion: "popularity.desc",
                page: undefined

            },
        }

        expect(reducer(initialState, {type: FAILURE(GET_POPULAR_SERIES)})).toEqual(
            expectedState
        )
    });


})