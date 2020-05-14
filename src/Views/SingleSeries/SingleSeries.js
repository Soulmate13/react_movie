import React from 'react';
import '../../App.less';

import MediaCardLarge from "../../Components/MediaCardLarge/MediaCardLarge";
import {SERIES_MODE} from '../../Utils/constants';



function SingleSeries(props) {
    return (
        <MediaCardLarge mode={SERIES_MODE} routeProps={props}/>
    );
}

export default SingleSeries;