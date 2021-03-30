import React from 'react';
import '../../App.less';
import {Switch, Route, Redirect, RouteComponentProps} from "react-router-dom";
import {MOVIES_MODE, SERIES_MODE} from "../../Utils/constants";
import MediaCardLargeMovie from "../../Components/MediaCardLargeMovie/MediaCardLargeMovie";
import MediaCardLargeSeries from "../../Components/MediaCardLargeSeries/MediaCardLargeSeries";
import SearchMovies from "../../Components/SearchMovies/SearchMovies";
import SearchSeries from "../../Components/SearchSeries/SearchSeries";
import DiscoverMovies from "../../Components/DiscoverMovies/DiscoverMovies";
import DiscoverSeries from "../../Components/DiscoverSeries/DiscoverSeries";

export interface MatchParams {
    id: string
}

export interface MatchProps extends RouteComponentProps<MatchParams> {}

export const ContentCustom: React.FC = () => {
    return (
        <Switch>
            <Route exact path={'/movie-discover'} render={props => <DiscoverMovies {...props} mode={MOVIES_MODE} />}/>
            <Route exact path={'/movie-search'} render={props => <SearchMovies {...props} mode={MOVIES_MODE} />}/>

            <Route exact path={'/series-discover'} render={props => <DiscoverSeries {...props} mode={SERIES_MODE} />}/>
            <Route exact path={'/series-search'} render={props => <SearchSeries {...props} mode={SERIES_MODE} />}/>

            <Route exact path={'/movie/:id'} render={({match}: MatchProps) => <MediaCardLargeMovie mode={MOVIES_MODE} id={match.params.id} />}/>
            <Route exact path={'/series/:id'} render={({match}: MatchProps) => <MediaCardLargeSeries mode={SERIES_MODE} id={match.params.id}/>}/>

            <Route path={'/'} render={() => <Redirect to='/movie-discover'/>}/>
        </Switch>
    );
};