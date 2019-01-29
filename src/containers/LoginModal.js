import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Alert, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';


export default class LoginModal extends React.Component {
    state = {
        email: '',
        password: '',
        validateEmail: false,
        loginStatus: false,
        loginMessage: [],
        hasErrors: false,
        errors: "",

    };

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log('Email submitted: ', this.state.email);
        // console.log('password submitted: ', this.state.password);

        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(response => {
                console.log(response);
                debugger
                localStorage.setItem('me', JSON.stringify(response.data));
                console.log(localStorage);
                this.props.toggleLogin();
                // this.props.showName();
                this.setState({
                    loginStatus: true,
                    loginMessage: response.data.message,
                })

            })
            .catch(error => {
                console.log('ERROR', error)
                debugger
                this.setState({
                    hasErrors: true,
                    errors: error.response.data.message,
                })
            })
    }

    // https://github.com/rajaraodv/react-redux-blog/blob/master/public/src/components/SignInForm.js
    // https://github.com/rajaraodv/react-redux-blog/blob/master/public/src/actions/users.js


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

    validateEmail = () => {
        const expression = /\S+@\S+\.\S+/
        console.log(expression.test(this.state.email.toLowerCase()))
        return expression.test(this.state.email.toLowerCase())
    }


    render() {
        const { signup, signUpToggle, toggle, isOpen } = this.props;
        const { hasErrors, errors, loginMessage, email, password, loginStatus } = this.state;
        return (
            <>
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Login</ModalHeader>
                    <ModalBody>
                        {/* ERROR */}
                        {hasErrors ? <Alert color="danger">{errors}</Alert> : null}

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" onChange={this.emailInput} value={email} placeholder="type email here" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" onChange={this.passwordInput} value={password} placeholder="type password here" />
                            </FormGroup>
                            <FormGroup>
                                <FormText>Forget password? Click reset password!</FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody >
                    <ModalFooter>
                        <Button disabled={this.state.email && this.state.password && this.validateEmail() ? false : true} color="primary" type="submit" value="submit" onClick={this.handleSubmit}>Login</Button>{' '}
                        {console.log('email:', this.state.email)}
                        {console.log('password:', this.state.password)}
                    </ModalFooter>
                    <ModalFooter>
                        <FormGroup>
                            <FormText>You don't have an account? Sign up now! </FormText>
                        </FormGroup>
                        <hr />
                        <Button color="info" onClick={signUpToggle}>Sign Up</Button>{' '}
                    </ModalFooter>
                </Modal >
            </>
        );
    }
}

