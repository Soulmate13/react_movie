import React, {ReactEventHandler} from "react";
import {shallow} from "enzyme";
import {PosterImage} from "../PosterImage";

describe('Poster Image Component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = null;
    });

    it('should display correct poster when given poster_path', () => {
        const imageSrcString = 'https://image.tmdb.org/t/p/w300';
        const posterPath = "poster_path";
        const testProps = {imageSrc: posterPath, errorHandler: () => {}};
        wrapper = shallow(<PosterImage {...testProps}/>);

        expect(wrapper.props().src).toEqual(imageSrcString + posterPath);
    });

    it('should display backup poster image when poster_path fails', () => {
        const posterPath = undefined;
        const mockErrorHandle = jest.fn();
        const testProps = {imageSrc: posterPath, errorHandler: mockErrorHandle};
        wrapper = shallow(<PosterImage {...testProps}/>);
        wrapper.find('.poster-image').simulate("error");

        expect(mockErrorHandle).toHaveBeenCalled();
    });

});