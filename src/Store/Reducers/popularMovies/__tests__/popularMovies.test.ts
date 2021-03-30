import reducer from "../popularMovies";
import {
    GET_POPULAR_MOVIES
} from '../../../Actions/actionsList';
import {
    SUCCESS,
    REQUEST,
    FAILURE,
} from '../../../constants';
import {IPopularMovies} from "../../../../Utils/Interfaces/movies";

describe("popular movies reducer", () => {

    const initialState: IPopularMovies = {
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

    it('should handle GET_POPULAR_MOVIES_PENDING action', () => {
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

        expect(reducer(initialState, {type: REQUEST(GET_POPULAR_MOVIES)})).toEqual(
            expectedState
        )
    });

    it('should handle GET_POPULAR_MOVIES_SUCCESS action', () => {

        const testPayload = {
            list: [{
                backdrop_path: "path.jpg",
                genre_ids: [1],
                id: 1,
                overview: "Overview",
                popularity: 1,
                poster_path: "path.jpg",
                release_date: "2021-03-18",
                title: "title",
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
                backdrop_path: "path.jpg",
                genre_ids: [1],
                id: 1,
                overview: "Overview",
                popularity: 1,
                poster_path: "path.jpg",
                release_date: "2021-03-18",
                title: "title",
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

        expect(reducer(initialState, {type: SUCCESS(GET_POPULAR_MOVIES), payload: testPayload})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SEARCHED_MOVIES_FAILURE action', () => {

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

        expect(reducer(initialState, {type: FAILURE(GET_POPULAR_MOVIES)})).toEqual(
            expectedState
        )
    });

})