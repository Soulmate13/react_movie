import reducer from "../searchedMovies";
import {
    GET_SEARCHED_MOVIES, GET_SEARCHED_MOVIES_NAMES
} from '../../../Actions/actionsList';
import {
    SUCCESS,
    REQUEST,
    FAILURE,
} from '../../../constants';
import {ISearchedMovies} from "../../../../Utils/Interfaces/movies";

describe("searched series reducer", () => {

    const initialState: ISearchedMovies = {
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

    it('should return the initial state', () => {

        expect(reducer(undefined, {})).toEqual(
            initialState
        )
    });

    it('should handle GET_SEARCHED_MOVIES_PENDING action', () => {
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

        expect(reducer(initialState, {type: REQUEST(GET_SEARCHED_MOVIES)})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_MOVIES_SUCCESS action', () => {

        const testPayload = {
            list: [{
                adult: false,
                backdrop_path: "path",
                genre_ids: [1,3,4],
                id: 1,
                original_language: "en",
                original_title: "Avengers: Infinity War",
                overview: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
                popularity: 374.917,
                poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
                release_date: "2018-04-25",
                title: "Avengers: Infinity War",
                video: false,
                vote_average: 8.3,
                vote_count: 21373,
            }],
            pageable: {page: 1, total_results: 1},
            prevSearchParams: {query: "Avengers: Infinity War", year: null},
        }

        const expectedState = {
            isFetching: false,
            didInvalidate: false,
            list: [{
                adult: false,
                backdrop_path: "path",
                genre_ids: [1,3,4],
                id: 1,
                original_language: "en",
                original_title: "Avengers: Infinity War",
                overview: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
                popularity: 374.917,
                poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
                release_date: "2018-04-25",
                title: "Avengers: Infinity War",
                video: false,
                vote_average: 8.3,
                vote_count: 21373,
            }],
            pageable: {page: 1, total_results: 1},
            prevSearchParams: {query: "Avengers: Infinity War", year: null},
            suggestedNames: []
        }

        expect(reducer(initialState, {type: SUCCESS(GET_SEARCHED_MOVIES), payload: testPayload})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_MOVIES_FAILURE action', () => {

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

        expect(reducer(initialState, {type: FAILURE(GET_SEARCHED_MOVIES)})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_MOVIES_NAMES_PENDING action', () => {
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

        expect(reducer(initialState, {type: REQUEST(GET_SEARCHED_MOVIES_NAMES)})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_MOVIES_NAMES_SUCCESS action', () => {

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

        expect(reducer(initialState, {type: SUCCESS(GET_SEARCHED_MOVIES_NAMES), payload: testPayload})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_MOVIES_NAMES_FAILURE action', () => {

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

        expect(reducer(initialState, {type: FAILURE(GET_SEARCHED_MOVIES_NAMES)})).toEqual(
            expectedState
        )
    });

})