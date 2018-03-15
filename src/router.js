import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';

let pages = {
    Home: () => require('@/pages/home').default,
    User: () => require('@/pages/user').default,
    Others: () => require('@/pages/others').default
}

export default class RootRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={pages.Home()}/>
                    <Route path="/user" component={pages.User()}/>
                    <Route path="/others" component={pages.Others()}/>
                    <Route component={pages.Home()}/>
                </Switch>
            </Router>
        )
    }
}
