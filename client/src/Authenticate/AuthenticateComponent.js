import React, { Component } from 'react';
import { gapi } from 'gapi-script';

class AuthenticateComponent extends Component {
    componentDidMount() {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: '56211615720-rbs6ru30hsiacbudo1tv4jgodnfstqgk.apps.googleusercontent.com',
            }).then(() => {

                const authInstance =  gapi.auth2.getAuthInstance();

                const isSignedIn = authInstance.isSignedIn.get();

                const signOut = () => {
                    authInstance.signOut().then(() => {
                        return authInstance.disconnect();
                    });
                };
                let userData = null;

                if(isSignedIn) {
                    const user = authInstance.currentUser.get();
                    const profile = user.getBasicProfile();

                    userData = {
                        name: profile.getName(),
                        email: profile.getEmail(),
                        imageUrl: profile.getImageUrl(),
                    };
                }

                this.props.signIn(isSignedIn, signOut, userData);

                if(!isSignedIn) {
                    authInstance.isSignedIn.listen(isSignedIn => {
                        this.props.signIn(isSignedIn, signOut, userData);
                    });

                    gapi.load('signin2', () => {
                        gapi.signin2.render('loginButton');
                    });
                }
            });
        })
    }

    render() {
        if (this.props.isSignedIn === null) {
            return (
                <div className="App">
                    Checking if you are signed in...
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <div id="loginButton">Sign in with Google</div>
                </div>
            );
        }

    }
}

export default AuthenticateComponent;