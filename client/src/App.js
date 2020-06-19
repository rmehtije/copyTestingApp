import React, { Component } from 'react';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom'
import AuthenticateComponent from './Authenticate/AuthenticateComponent'
import UserDataComponent from "./UserData/UserDataComponent";

// react-bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

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
        window.location.reload();
    }

    ifUserSignedIn(Component, props) {
        return this.state.isSignedIn ?
            <Component {...props}/> :
            <AuthenticateComponent isSignedIn={this.state.isSignedIn} signIn={this.onSignIn.bind(this)}/>
    }

    render() {
        const userNavigation = (
            <Nav className="justify-content-center">
                <Nav.Item><Nav.Link as={Link} to="/">Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link as={Link} to="/edit">Edit</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link to="/" onClick={this.signOut.bind(this)}>SignOut</Nav.Link></Nav.Item>
            </Nav>
        );
        return (
            <MemoryRouter>
                <Container>
                        { this.state.isSignedIn && userNavigation }

                        <Switch>
                            <Route path="/edit" render={() => this.ifUserSignedIn(UserDataComponent, { ...this.state, edit: true, signOut: this.signOut.bind(this) })} />
                            <Route path="/" render={() => this.ifUserSignedIn(UserDataComponent, { ...this.state, signOut: this.signOut.bind(this) })} />
                        </Switch>
                </Container>
            </MemoryRouter>
        )
    }
}

export default App;