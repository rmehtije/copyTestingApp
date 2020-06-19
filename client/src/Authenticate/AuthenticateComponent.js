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

                const getUserData = (profile) => {
                    return {
                        name: profile.getName(),
                        email: profile.getEmail(),
                        imageUrl: profile.getImageUrl(),
                    };
                };

                let userData = null;

                if(isSignedIn) {
                    const user = authInstance.currentUser.get();
                    const profile = user.getBasicProfile();

                    userData = getUserData(profile);
                }

                this.props.signIn(isSignedIn, signOut, userData);

                if(!isSignedIn) {
                    authInstance.currentUser.listen(currentUser => {
                        userData = getUserData(currentUser.getBasicProfile());
                        this.props.signIn({isSignedIn: true}, signOut, userData);
                    });

                    gapi.load('signin2', () => {
                        gapi.signin2.render('loginButton');
                    });
                }
            });
        })
    }

    render() {
        const loginButton = (<div id="loginButton" className="mx-auto">Sign in with Google</div>);
        const checkLoginMessage = 'Checking if you are signed in...';

        return (
            <div className="py-2 text-center">
                <img className="d-block mx-auto mb-1" src={process.env.PUBLIC_URL + '/images/logo.png'} alt="CopyTesting"/>
                <p className="lead">
                    Welcome
                </p>
                {this.props.isSignedIn === null ? checkLoginMessage : loginButton}
            </div>
        );

    }
}

export default AuthenticateComponent;