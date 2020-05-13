import React from 'react';
import '../../App.less';

import Search from "../../Components/Search/Search";
import {MOVIES_MODE} from '../../Utils/constants';



function MovieSearch() {
    return (
       <Search mode={MOVIES_MODE}/>
    );
}

export default MovieSearch;