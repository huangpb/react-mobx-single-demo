import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';

import Home from '@/pages/home';
import User from '@/pages/user';
import Others from '@/pages/others';

export default class RootRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/user" component={User}/>
                    <Route path="/others" component={Others}/>
                    <Route component={Home}/>
                </Switch>
            </Router>
        )
    }
}
