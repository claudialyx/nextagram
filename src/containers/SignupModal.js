import React, { Component } from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

export default class SignupModal extends React.Component {
    state = {
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
        hasErrors: false,
        errors: [],
        status: false,
        signupMessage: [],
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/new',
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(response => {
                console.log(response);
                // debugger
                this.props.toggleSignup(); //calling the function from Navbar to show the successful signup msg
                // Check whether the sign up succeeded or failed, then handle accordingly
                this.setState({
                    status: true,
                    signupMessage: response.data.message,
                    hasErrors: '',
                })
            })
            .catch(error => {
                console.log('ERROR', error)
                // debugger
                this.setState({
                    hasErrors: true,
                    errors: error.response.data.message,
                })
            })
    }

    emailInput = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    passwordInput = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    usernameInput = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    confirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value,
        })
    }

    validateEmail = () => {
        const expression = /\S+@\S+\.\S+/
        console.log(expression.test(this.state.email.toLowerCase()))
        return expression.test(this.state.email.toLowerCase())
    }

    render() {
        const { toggle, isOpen, signUpToggle } = this.props
        const { email, password, username, confirmPassword, hasErrors, errors } = this.state
        return (
            <>
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
                    <ModalBody>
                        {/* ERROR */}
                        {hasErrors ? errors.map((errors) => (<Alert color="danger">{errors}</Alert>)) : null}

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input type="text" onChange={this.usernameInput} value={username} placeholder="e.g hellokitty" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" onChange={this.emailInput} value={email} placeholder="e.g: abc@gmail.com" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" onChange={this.passwordInput} value={password} placeholder="Select an alphanumeric password" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Confirm Password</Label>
                                <Input type="password" onChange={this.confirmPassword} value={confirmPassword} placeholder="Confirm password" />
                            </FormGroup>
                        </Form>
                        <ModalFooter>
                            <Button color="info" onClick={signUpToggle}>Log in</Button>{' '}
                            <Button disabled={this.state.email && this.state.password && this.validateEmail() ? false : true} color="primary" type="submit" value="submit" onClick={this.handleSubmit}>Confirm</Button>{' '}
                            {/* {password === this.state.confirmPassword ? null : <FormText color="danger" > Please re-enter inputs for password & confirm password field. </FormText>} */}
                            {console.log('username:', this.state.username)}
                            {console.log('signupemail:', this.state.email)}
                            {console.log('signuppassword:', this.state.password)}
                            {console.log('confirmpassword:', this.state.confirmPassword)}
                        </ModalFooter>
                    </ModalBody>
                </Modal >
            </>
        )
    }
}

