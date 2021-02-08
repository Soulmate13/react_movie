import React from 'react';
import '../../App.less';
import {Switch, Route, Redirect} from "react-router-dom";

import {MovieDiscover} from "../../Views/views";
import {MovieSearch} from "../../Views/views";
import {SeriesDiscover} from "../../Views/views";
import {SeriesSearch} from "../../Views/views";
import {SingleMovie} from "../../Views/views";
import {SingleSeries} from "../../Views/views";

export const ContentCustom: React.FC = () => {
    return (
        <Switch>
            <Route path={'/movie-discover'} component={MovieDiscover}/>
            <Route path={'/movie-search'} component={MovieSearch}/>

            <Route path={'/series-discover'} component={SeriesDiscover}/>
            <Route path={'/series-search'} component={SeriesSearch}/>

            <Route path={'/movie/:id'} render={props => <SingleMovie {...props}/>}/>
            <Route path={'/series/:id'} render={props => <SingleSeries {...props}/>}/>

            <Route path={'/'} render={() => <Redirect to='/movie-discover'/>}/>
        </Switch>
    );
};