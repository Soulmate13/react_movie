import React from 'react';
import '../../App.less';
import Discover from "../../Components/Discover/Discover";
import {MOVIES_MODE} from '../../Utils/constants';


function MovieDiscover() {
    return (
        <Discover mode={MOVIES_MODE}/>
    );
}

export default MovieDiscover;