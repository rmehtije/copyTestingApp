import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import AuthenticateComponent from './Authenticate/AuthenticateComponent'
import UserDataComponent from "./UserData/UserDataComponent";
import UserManagementComponent from "./UserData/UserManagementComponent";

import './App.css';

class App extends Component {
    state = {
        isSignedIn: null,
        signOut: null,
        userData: null,
    };

    onSignIn(isSignedIn, signOut, userData) {
        this.setState({isSignedIn, signOut, userData});
    }

    signOut() {
        this.state.signOut();
        window.location.reload(false);
    }

    ifUserSignedIn(Component, props) {
        return this.state.isSignedIn ?
            <Component {...props}/> :
            <AuthenticateComponent isSignedIn={this.state.isSignedIn} signIn={this.onSignIn.bind(this)}/>
    }

    render() {
        return (
            <BrowserRouter>
                <Link to="/">Home</Link>
                { this.state.isSignedIn && <Link to="/edit">Edit</Link> }
                { this.state.isSignedIn && <Link to="/" onClick={this.signOut.bind(this)}>SignOut</Link> }
                <Switch>
                    <Route path="/edit" render={() => this.ifUserSignedIn(UserManagementComponent)} />
                    <Route path="/" render={() => this.ifUserSignedIn(UserDataComponent, this.state.userData)} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;