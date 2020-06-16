import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import AuthenticateComponent from './Authenticate/AuthenticateComponent'
import UserDataComponent from "./UserData/UserDataComponent";
import UserManagementComponent from "./UserData/UserManagementComponent";
import './App.css';

class App extends Component {
    state = {
        isSignedIn: null
    };


    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    // callBackendAPI = async () => {
    //     const response = await fetch('/express_backend');
    //     const body = await response.json();
    //
    //     if (response.status !== 200) {
    //         throw Error(body.message)
    //     }
    //     return body;
    // };

    onSignIn(isSignedIn) {
        this.setState({isSignedIn})
    }

    ifUserSignedIn(Component) {
        return this.state.isSignedIn ?
            <Component/> :
            <AuthenticateComponent isSignedIn={this.state.isSignedIn} signIn={this.onSignIn.bind(this)}/>
    }

    render() {
        return (
            <BrowserRouter>
                { this.state.isSignedIn && <Link to="/edit">Edit</Link> }
                <Link to="/">Home</Link>
                <Switch>
                    <Route path="/edit" render={() => this.ifUserSignedIn(UserManagementComponent)} />
                    <Route path="/" render={() => this.ifUserSignedIn(UserDataComponent)} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;