import reducer from '../singleMovie'
import {
    GET_SINGLE_MOVIE
} from '../../../Actions/actionsList';


import {
    SUCCESS,
    REQUEST,
    FAILURE,
} from '../../../constants';
import {ISingleMovie} from "../../../../Utils/Interfaces/movies";


describe('single series reducer', () => {

    const initialState: ISingleMovie = {
        isFetching: false,
        didInvalidate: false,
        data: {
            adult: false,
            backdrop_path: "",
            belongs_to_collection: null,
            budget: 0,
            genres: [
                {
                    id: 0,
                    name: ""
                },
            ],
            homepage: "",
            id: 0,
            imdb_id: "",
            original_language: "",
            original_title: "",
            overview: "",
            popularity: 0,
            poster_path: "",
            production_companies: [{
                id: 0,
                logo_path: "",
                name: "",
                origin_country: ""
            }],
            production_countries: [{
                iso_3166_1: "",
                name: ""
            }],
            release_date: "",
            revenue: 0,
            runtime: 0,
            spoken_languages: [
                {
                    english_name: "English",
                    iso_639_1: "en",
                    name: "English"
                }],
            status: "Rumored",
            tagline: "",
            title: "",
            video: false,
            vote_average: 0,
            vote_count: 0,
        }
    }

    it('should return the initial state', () => {

        expect(reducer(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle GET_SINGLE_MOVIE_PENDING action', () => {
        const expectedState = {
            isFetching: true,
            didInvalidate: false,
            data: {
                adult: false,
                backdrop_path: "",
                belongs_to_collection: null,
                budget: 0,
                genres: [
                    {
                        id: 0,
                        name: ""
                    },
                ],
                homepage: "",
                id: 0,
                imdb_id: "",
                original_language: "",
                original_title: "",
                overview: "",
                popularity: 0,
                poster_path: "",
                production_companies: [{
                    id: 0,
                    logo_path: "",
                    name: "",
                    origin_country: ""
                }],
                production_countries: [{
                    iso_3166_1: "",
                    name: ""
                }],
                release_date: "",
                revenue: 0,
                runtime: 0,
                spoken_languages: [
                    {
                        english_name: "English",
                        iso_639_1: "en",
                        name: "English"
                    }],
                status: "Rumored",
                tagline: "",
                title: "",
                video: false,
                vote_average: 0,
                vote_count: 0,
            }
        }

        expect(reducer(initialState, {type: REQUEST(GET_SINGLE_MOVIE)})).toEqual(
            expectedState
        )
    })

    it('should handle GET_SINGLE_MOVIES_SUCCESS action', () => {
        const testPayload = {
            data: {
                adult: false,
                backdrop_path: "",
                belongs_to_collection: null,
                budget: 0,
                genres: [
                    {
                        id: 0,
                        name: ""
                    },
                ],
                homepage: "",
                id: 0,
                imdb_id: "",
                original_language: "",
                original_title: "",
                overview: "",
                popularity: 0,
                poster_path: "",
                production_companies: [{
                    id: 0,
                    logo_path: "",
                    name: "",
                    origin_country: ""
                }],
                production_countries: [{
                    iso_3166_1: "",
                    name: ""
                }],
                release_date: "",
                revenue: 0,
                runtime: 0,
                spoken_languages: [
                    {
                        english_name: "English",
                        iso_639_1: "en",
                        name: "English"
                    }],
                status: "Rumored",
                tagline: "",
                title: "",
                video: false,
                vote_average: 0,
                vote_count: 0,
            }
        }
        const expectedState = {
            isFetching: false,
            didInvalidate: false,
            data: {
                adult: false,
                backdrop_path: "",
                belongs_to_collection: null,
                budget: 0,
                genres: [
                    {
                        id: 0,
                        name: ""
                    },
                ],
                homepage: "",
                id: 0,
                imdb_id: "",
                original_language: "",
                original_title: "",
                overview: "",
                popularity: 0,
                poster_path: "",
                production_companies: [{
                    id: 0,
                    logo_path: "",
                    name: "",
                    origin_country: ""
                }],
                production_countries: [{
                    iso_3166_1: "",
                    name: ""
                }],
                release_date: "",
                revenue: 0,
                runtime: 0,
                spoken_languages: [
                    {
                        english_name: "English",
                        iso_639_1: "en",
                        name: "English"
                    }],
                status: "Rumored",
                tagline: "",
                title: "",
                video: false,
                vote_average: 0,
                vote_count: 0,
            }
        }


        expect(reducer(initialState, {
            type: SUCCESS(GET_SINGLE_MOVIE),
            payload: testPayload
        })).toEqual(
            expectedState
        )
    })

    it('should handle GET_SINGLE_MOVIES_FAILURE action', () => {
        const expectedState = {
            isFetching: false,
            didInvalidate: true,
            data: { adult: false,
                backdrop_path: "",
                belongs_to_collection: null,
                budget: 0,
                genres: [
                    {
                        id: 0,
                        name: ""
                    },
                ],
                homepage: "",
                id: 0,
                imdb_id: "",
                original_language: "",
                original_title: "",
                overview: "",
                popularity: 0,
                poster_path: "",
                production_companies: [{
                    id: 0,
                    logo_path: "",
                    name: "",
                    origin_country: ""
                }],
                production_countries: [{
                    iso_3166_1: "",
                    name: ""
                }],
                release_date: "",
                revenue: 0,
                runtime: 0,
                spoken_languages: [
                    {
                        english_name: "English",
                        iso_639_1: "en",
                        name: "English"
                    }],
                status: "Rumored",
                tagline: "",
                title: "",
                video: false,
                vote_average: 0,
                vote_count: 0,
            }}

        expect(reducer(initialState, {type: FAILURE(GET_SINGLE_MOVIE)})).toEqual(
            expectedState
        )
    })

})