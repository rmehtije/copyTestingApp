import React, { Component } from 'react';
import UserManagementComponent from "./UserManagementComponent";

import Table from 'react-bootstrap/Table';

class UserDataComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            isNewUser: false,
        };
    }

    componentDidMount() {

        const getUserInformation = async () => {
            const response = await fetch(`/user/${this.state.userData.email}` );
            const body = await response.json();

            if (response.status !== 200) {
                throw Error(body.message)
            }
            return body;
        };

        getUserInformation().then((data) => {
            this.setState({userData: {...data.user, ...this.state.userData}, isNewUser: !!data.created});
        });
    }
    render() {
        if(this.state.isNewUser || this.props.edit) {
            return (<UserManagementComponent { ...this.state } edit={this.props.edit} />);
        }
        else {
            return (
                <div className="py-3 text-center">
                    <img src={this.state.userData.imageUrl} alt="profile"/>
                    <h3>{this.state.userData.name}</h3>
                    <Table responsive>
                        <tbody>
                            <tr>
                                <td>Email:</td>
                                <td>{this.state.userData.email}</td>
                            </tr>
                            <tr>
                                <td>Country:</td>
                                <td>{this.state.userData.country}</td>
                            </tr>
                            <tr>
                                <td>Birthday:</td>
                                <td>{this.state.userData.birthday}</td>
                            </tr>
                            <tr>
                                <td>Short Bio:</td>
                                <td>{this.state.userData.bio}</td>
                            </tr>
                            <tr>
                                <td>Created:</td>
                                <td>{this.state.userData.created}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export default UserDataComponent;