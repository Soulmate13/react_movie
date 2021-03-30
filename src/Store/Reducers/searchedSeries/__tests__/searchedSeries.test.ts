import reducer from "../searchedSeries";
import {
    GET_SEARCHED_SERIES, GET_SEARCHED_SERIES_NAMES
} from '../../../Actions/actionsList';
import {
    SUCCESS,
    REQUEST,
    FAILURE,
} from '../../../constants';
import {ISearchedSeries} from "../../../../Utils/Interfaces/series";

describe("searched series reducer", () => {

    const initialState: ISearchedSeries = {
        isFetching: false,
        didInvalidate: false,
        list: [],
        pageable: {
            page: undefined,
            total_results: 0
        },
        prevSearchParams: {
            query: "",
            year: null,
        },
        suggestedNames: []
    }

    it('should return the initial state', () => {

        expect(reducer(undefined, {})).toEqual(
            initialState
        )
    });

    it('should handle GET_SEARCHED_SERIES_PENDING action', () => {
        const expectedState = {
            isFetching: true,
            didInvalidate: false,
            prevSearchParams: {
                query: "",
                year: null,
                page: undefined
            },
            list: [],
            pageable: {
                page: undefined,
                total_results: 0
            },
            suggestedNames: []
        }

        expect(reducer(initialState, {type: REQUEST(GET_SEARCHED_SERIES)})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_SERIES_SUCCESS action', () => {

        const testPayload = {
            list: [{
                backdrop_path: "/path.jpg",
                first_air_date: "2002-10-27",
                genre_ids: [1],
                id: 1,
                name: "title",
                origin_country: ["en"],
                original_language: "en",
                original_name: "title",
                overview: "Overview",
                popularity: 1,
                poster_path: "/path.jpg",
                vote_average: 1,
                vote_count: 1,
            }],
            pageable: {page: 1, total_results: 1},
            prevSearchParams: {query: "title", year: null},
        }

        const expectedState = {
            isFetching: false,
            didInvalidate: false,
            list: [{
                backdrop_path: "/path.jpg",
                first_air_date: "2002-10-27",
                genre_ids: [1],
                id: 1,
                name: "title",
                origin_country: ["en"],
                original_language: "en",
                original_name: "title",
                overview: "Overview",
                popularity: 1,
                poster_path: "/path.jpg",
                vote_average: 1,
                vote_count: 1,
            }],
            pageable: {page: 1, total_results: 1},
            prevSearchParams: {query: "title", year: null},
            suggestedNames: []
        }

        expect(reducer(initialState, {type: SUCCESS(GET_SEARCHED_SERIES), payload: testPayload})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_SERIES_FAILURE action', () => {

        const expectedState = {
            isFetching: false,
            didInvalidate: true,
            prevSearchParams: {
                query: "",
                year: null,
                page: undefined
            },
            list: [],
            pageable: {
                page: undefined,
                total_results: 0
            },
            suggestedNames: []
        }

        expect(reducer(initialState, {type: FAILURE(GET_SEARCHED_SERIES)})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_SERIES_NAMES_PENDING action', () => {
        const expectedState = {
            isFetching: false,
            didInvalidate: false,
            prevSearchParams: {
                query: "",
                year: null,
                page: undefined
            },
            list: [],
            pageable: {
                page: undefined,
                total_results: 0
            },
            suggestedNames: []
        }

        expect(reducer(initialState, {type: REQUEST(GET_SEARCHED_SERIES_NAMES)})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_SERIES_NAMES_SUCCESS action', () => {

        const testPayload = {
            suggestedNames : ["name1", "name2"]
        }

        const expectedState = {
            isFetching: false,
            didInvalidate: false,
            prevSearchParams: {
                query: "",
                year: null,
                page: undefined
            },
            list: [],
            pageable: {
                page: undefined,
                total_results: 0
            },
            suggestedNames: ["name1", "name2"]
        }

        expect(reducer(initialState, {type: SUCCESS(GET_SEARCHED_SERIES_NAMES), payload: testPayload})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_SERIES_NAMES_FAILURE action', () => {

        const expectedState = {
            isFetching: false,
            didInvalidate: false,
            prevSearchParams: {
                query: "",
                year: null,
                page: undefined
            },
            list: [],
            pageable: {
                page: undefined,
                total_results: 0
            },
            suggestedNames: []
        }

        expect(reducer(initialState, {type: FAILURE(GET_SEARCHED_SERIES_NAMES)})).toEqual(
            expectedState
        )
    });

})