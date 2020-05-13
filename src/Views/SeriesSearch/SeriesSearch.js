import React from 'react';
import '../../App.less';
import Search from "../../Components/Search/Search";

import {SERIES_MODE} from '../../Utils/constants';

function SeriesSearch() {
    return (
        <Search mode={SERIES_MODE}/>
    );
}

export default SeriesSearch;