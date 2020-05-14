import React from 'react';
import '../../App.less';

import MediaCardLarge from "../../Components/MediaCardLarge/MediaCardLarge";
import {MOVIES_MODE} from '../../Utils/constants';



function SingleMovie(props) {
    return (
        <MediaCardLarge mode={MOVIES_MODE} routeProps={props}/>
    );
}

export default SingleMovie;