import React from 'react';
import '../../App.less';

import {Switch, Route, Redirect} from "react-router-dom";

import MovieDiscover from "../../Views/MovieDiscover/MovieDiscover";
import MovieSearch from "../../Views/MovieSearch/MovieSearch";
import SeriesDiscover from "../../Views/SeriesDiscover/SeriesDiscover";
import SeriesSearch from "../../Views/SeriesSearch/SeriesSearch";


function ContentCustom() {
    return (
            <Switch>
                <Route path={'/movie-discover'} render={props =>  <MovieDiscover {...props} />}/>
                <Route path={'/movie-search'} render={props => <MovieSearch {...props}/>}/>

                <Route path={'/series-discover'} render={props =>  <SeriesDiscover {...props}/>}/>
                <Route path={'/series-search'} render={props => <SeriesSearch {...props}/>}/>

                <Route path={'/'} render={() => <Redirect to='/movie-discover'/>}/>
            </Switch>
    );
}

export default ContentCustom;