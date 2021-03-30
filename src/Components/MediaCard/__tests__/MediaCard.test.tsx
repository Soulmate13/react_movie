import React from "react";
import {shallow} from "enzyme";
import {MediaCard} from '../MediaCard';
import {ModeType} from "../../../Utils/Interfaces/interfaces";
import {BrowserRouter} from "react-router-dom";

describe('Media Card Component', () => {

    const MOVIES_MODE: ModeType = "MOVIES_MODE"
    const SERIES_MODE: ModeType = "SERIES_MODE"
    let wrapper: any = null;

    beforeEach(() => {
        wrapper = null;
    });


    describe('should render', () => {

        it('movie card if props.mode is MOVIES_MODE', function () {
            const testProps = { mode: MOVIES_MODE, data: {}}
            wrapper = shallow(<MediaCard {...testProps}/>);
            expect(wrapper.find('.movie-card').exists()).toBeTruthy();
        });

        it('series card if props.mode is SERIES_MODE', function () {
            const testProps = { mode: SERIES_MODE, data: {}}
            wrapper = shallow(<MediaCard {...testProps}/>);
            expect(wrapper.find('.series-card').exists()).toBeTruthy();
        });

        it('correct movie title when given', function () {
            const testName = 'Test Name'
            const testProps = { mode: MOVIES_MODE,  data: {title: testName}}
            wrapper = shallow(
                <BrowserRouter>
                    <MediaCard {...testProps}/>
                </BrowserRouter>);
            expect(wrapper.find(MediaCard).dive().find('.card-link').text()).toBe(testName);
        });

        it('hardcoded string instead of a real movie name when it is unavailable', function () {
            const hardcodedString = "Title Unavailable";
            const testProps = { mode: MOVIES_MODE, data: {}}
            wrapper = shallow(
                <BrowserRouter>
                    <MediaCard {...testProps}/>
                </BrowserRouter>);
            expect(wrapper.find(MediaCard).dive().find('.card-link').text()).toBe(hardcodedString);
        });

        it('correct series name when given', function () {
            const testName = 'Test Name'
            const testProps = { mode: SERIES_MODE, data: {name: testName}}
            wrapper = shallow(
                <BrowserRouter>
                    <MediaCard {...testProps}/>
                </BrowserRouter>);
            expect(wrapper.find(MediaCard).dive().find('.card-link').text()).toBe(testName);
        });

        it('hardcoded string instead of a real series name when it is unavailable', function () {
            const hardcodedString = "Title Unavailable";
            const testProps = { mode: SERIES_MODE, data: {}}
            wrapper = shallow(
                <BrowserRouter>
                    <MediaCard {...testProps}/>
                </BrowserRouter>);

            expect(wrapper.find(MediaCard).dive().find('.card-link').text()).toBe(hardcodedString);
        });

        it('correct series first air date name when given', function () {
            const testAirDate = '10.10.2010'
            const testProps = { mode: SERIES_MODE, data: { first_air_date: testAirDate}}
            wrapper = shallow(
                <BrowserRouter>
                    <MediaCard {...testProps}/>
                </BrowserRouter>);
            expect(wrapper.find(MediaCard).dive().find('.card-date').text()).toBe(testAirDate);
        });

        it('hardcoded string instead of a real series first air date when it is unavailable', function () {
            const hardcodedString = "Date Unavailable";
            const testProps = { mode: SERIES_MODE, data: {}}
            wrapper = shallow(
                <BrowserRouter>
                    <MediaCard {...testProps}/>
                </BrowserRouter>);

            expect(wrapper.find(MediaCard).dive().find('.card-date').text()).toBe(hardcodedString);
        });

        it('correct movie release date when given', function () {
            const testReleaseDate = "10.10.2012";
            const testProps = { mode: MOVIES_MODE, data: {release_date: testReleaseDate}}
            wrapper = shallow(
                <BrowserRouter>
                    <MediaCard {...testProps}/>
                </BrowserRouter>);
            expect(wrapper.find(MediaCard).dive().find('.card-date').text()).toBe(testReleaseDate);
        });

        it('hardcoded string instead of a real movie release date when it is unavailable', function () {
            const hardcodedString = "Date Unavailable";
            const testProps = { mode: MOVIES_MODE, data: {}}
            wrapper = shallow(
                <BrowserRouter>
                    <MediaCard {...testProps}/>
                </BrowserRouter>);
            expect(wrapper.find(MediaCard).dive().find('.card-date').text()).toBe(hardcodedString);
        });


    })

    describe('should not render', () => {
        it('series card if props.mode is MOVIES_MODE', function () {
            const testProps = { mode: MOVIES_MODE, data: {}}
            wrapper = shallow(<MediaCard {...testProps}/>);
            expect(wrapper.find('.series-card').exists()).toBeFalsy();
        });

        it('movies card if props.mode is SERIES_MODE', function () {
            let testProps = { mode: SERIES_MODE, data: {}}
            wrapper = shallow(<MediaCard {...testProps}/>);
            expect(wrapper.find('.movie-card').exists()).toBeFalsy();
        });

        it('anything if mode is not given', function () {
            let testProps = {data: {}}
            wrapper = shallow(<MediaCard {...testProps}/>);
            expect(wrapper.hostNodes().isEmptyRender()).toBe(true);
        });

    })



});