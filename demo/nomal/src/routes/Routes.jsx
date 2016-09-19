/**
 * Created by daishun on 2016/9/18.
 */
import React from 'react';
import { Router, Route ,hashHistory} from 'react-router';
import AppList from '../components/AppList/AppList';
import NotFound from '../components/NotFound/NotFound';
import Welcome from '../components/Welcome/Welcome';
const Routes = () =>
    <Router history={hashHistory}>
        <Route path="/" component={Welcome} />
        <Route path="/AppList" component={AppList} />
        <Route path="/*" component={NotFound} />
    </Router>;

export default Routes;