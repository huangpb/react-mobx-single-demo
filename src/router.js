import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable'
import Loading2 from './components/loading2/index'


let Home = Loadable({
    loader: () => import('@/pages/home'),
    loading: Loading2
})
let User = Loadable({
    loader: () => import('@/pages/user'),
    loading: Loading2
})
let Others = Loadable({
    loader: () => import('@/pages/others'),
    loading: Loading2
})

export default class RootRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/user" component={User}/>
                    <Route exact path="/others" component={Others}/>
                    <Route component={Home}/>
                </Switch>
            </Router>
        )
    }
}
