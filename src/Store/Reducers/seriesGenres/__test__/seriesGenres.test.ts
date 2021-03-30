import reducer from "../seriesGenres";
import {
    GET_MOVIE_GENRES,
    GET_SERIES_GENRES
} from '../../../Actions/actionsList';
import {
    SUCCESS,
    REQUEST,
    FAILURE,
} from '../../../constants';
import {IGenreEntity} from "../../../../Utils/Interfaces/genres";

describe("series genres reducer", () => {
    const initialState: IGenreEntity = {
        isFetching: false,
        didInvalidate: false,
        list: [],
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            initialState
        )
    });

    it('should handle GET_SERIES_GENRES_PENDING action', () => {
        const expectedState = {
            isFetching: true,
            didInvalidate: false,
            list: [],
        }

        expect(reducer(initialState, {type: REQUEST(GET_SERIES_GENRES)})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SERIES_GENRES_SUCCESS action', () => {

        const testPayload = {
            list: [{id: 1, name: "Genre"}],
        }

        const expectedState = {
            isFetching: false,
            didInvalidate: false,
            list: [{id: 1, name: "Genre"}],
        }

        expect(reducer(initialState, {type: SUCCESS(GET_SERIES_GENRES), payload: testPayload})).toEqual(
            expectedState
        )
    });

    it('should handle GET_SERIES_GENRES_FAILURE action', () => {


        const expectedState = {
            isFetching: false,
            didInvalidate: true,
            list: [],
        }

        expect(reducer(initialState, {type: FAILURE(GET_SERIES_GENRES)})).toEqual(
            expectedState
        )
    });


})