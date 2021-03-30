import '../../App.less';
import React, {ReactEventHandler} from "react";
const imageSrcString = 'https://image.tmdb.org/t/p/w300'

export interface IPosterImageProps {
    imageSrc?: string | null,
    errorHandler: ReactEventHandler
}

export const PosterImage = (props: IPosterImageProps) => {

    return (
        <img className="poster-image"
             src={imageSrcString + props.imageSrc}
             onError={props.errorHandler} alt="media poster"/>
    );
}