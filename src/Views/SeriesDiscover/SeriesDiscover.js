import React from 'react';
import '../../App.less';
import Discover from "../../Components/Discover/Discover";

import {SERIES_MODE} from '../../Utils/constants';

function SeriesDiscover() {
    return (
        <Discover mode={SERIES_MODE}/>

    );
}

export default SeriesDiscover;