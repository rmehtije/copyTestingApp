import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class UserManagementComponent extends Component {
    constructor(props) {
        super(props);

        const formInputs = {
            name: '',
            email: '',
            imageUrl: '',
            birthday: '',
            country: '',
            experience: [],
            bio: '',
            created: ''
        };

        this.state = { ...formInputs, ...this.props.userData, showModal: false };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);

    }

    showModal(show) {
        this.setState({showModal: !this.state.showModal});
    }

    getRequestOptions(body) {
        return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...body })
        };
    }

    deleteAccount() {
        fetch('/user/delete', this.getRequestOptions({ email: this.state.email }))
            .then(response => response.json())
            .then(data => {
                if(data.done) {
                    this.showModal(this.state.showModal);
                    this.props.signOut();
                }
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/user/save', this.getRequestOptions(this.state))
            .then(response => response.json())
            .then(data => {
                if(data.done) {
                    alert('Saved');
                }
            });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" value={this.state.name} onChange={this.handleInputChange} placeholder="Type your full name" required />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Country</Form.Label>
                    <Form.Control name="country" type="text" value={this.state.country} onChange={this.handleInputChange} placeholder="Country of residence" required />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control name="birthday" type="date"  onChange={this.handleInputChange} placeholder="04/23/1989"  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Short Bio</Form.Label>
                    <Form.Control as="textarea" name="bio" rows="3" value={this.state.bio} onChange={this.handleInputChange} placeholder="Tell us about your self" required />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>ImageUrl</Form.Label>
                    <Form.Control name="imageUrl" type="text" value={this.state.imageUrl} onChange={this.handleInputChange} placeholder="Image url on the web"/>
                </Form.Group>

                <hr className="mb-4" />

                <Button variant="primary" type="submit" className="btn-lg btn-block">
                    Submit
                </Button>

                <hr className="mb-4" />

                <Button variant="danger" className="btn-lg btn-block mb-4" onClick={this.showModal}>
                    Delete account
                </Button>

                <Modal show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>Are you sure ?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Your account will be permanently deleted</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.showModal}>Cancel</Button>
                        <Button variant="danger" onClick={this.deleteAccount}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        );
    }
}

export default UserManagementComponent;