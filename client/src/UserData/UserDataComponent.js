import React, { Component } from 'react';

class UserDataComponent extends Component {

    state = {
        demographic: null,
    };

    componentDidMount() {

        const callBackendAPI = async () => {
            const response = await fetch(`/user/${this.props.email}` );
            const body = await response.json();

            if (response.status !== 200) {
                throw Error(body.message)
            }
            return body;
        };

        callBackendAPI().then((user) => {
            console.log('CALLBACK USER', user);
        })
    }
    render() {
        return (
            <div className="App">
                <img src={this.props.imageUrl}/>
                <div>Name: {this.props.name}</div>
                <div>Email: {this.props.email}</div>
            </div>
        );
    }
}

export default UserDataComponent;