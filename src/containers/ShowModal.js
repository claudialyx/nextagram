import React, { Component } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';


export default class ShowModal extends React.Component {
    state = {
        signup: false,
    }

    signUpToggle = (event) => {
        this.setState({
            signup: !this.state.signup,
            email: '',
            password: '',
            username: '',
            confirmPassword: '',
        })
    }
    render() {
        const { toggleLogin, toggleSignup, toggle, isOpen, ShowName } = this.props
        return (
            <>
                {!this.state.signup ?
                    <LoginModal ShowName={ShowName} toggleLogin={toggleLogin} signup={this.signup} signUpToggle={this.signUpToggle} toggle={toggle} isOpen={isOpen} />
                    :
                    <SignupModal toggleSignup={toggleSignup} signup={this.signup} signUpToggle={this.signUpToggle} toggle={toggle} isOpen={isOpen} />
                }
            </>
        );
    }
}
