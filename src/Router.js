import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import MyProfilePage from './components/MyProfilePage';

export default class Router extends React.Component {
    render() {
        const { users, isLoading } = this.props;
        return (
            <>
                <Switch>
                    <Route exact path="/" component={props => <HomePage users={users} isLoading={isLoading}{...props} />} />
                    <Route path="/users/:id" component={props => <UserProfilePage users={users} isLoading={isLoading}{...props} />} />
                    <Route exact path="/profile" component={props => <MyProfilePage isLoading={isLoading}{...props} />} />
                </Switch>
            </>
        )
    }
}
