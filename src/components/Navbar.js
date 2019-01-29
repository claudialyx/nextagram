import React, { Component } from 'react';
import {
  Alert,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../components/logo.png';
import ShowModal from '../containers/ShowModal';


export default class Navbar1 extends React.Component {
  state = {
    isOpen: false,
    loggedIn: false,
    signedUp: false,
    userLoggedIn: false,
    logout: false,
    name: '',
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  hideLoginMessage = () => {
    this.setState({
      loggedIn: false,
    })
  }

  hideSignupMessage = () => {
    this.setState({
      signedUp: false,
    })
  }

  hideLogoutMessage = () => {
    this.setState({
      logout: false,
    })
  }

  //if login successful:
  toggleLogin = () => {
    this.setState({
      loggedIn: true, //show the alert msg in nav bar
      isOpen: !this.state.isOpen, //close the modal
      userLoggedIn: true,
    })
    setTimeout(this.hideLoginMessage, 3000)
  }

  //if signup successful:
  toggleSignup = () => {
    this.setState({
      signedUp: true, //show the alert msg in nav bar
      isOpen: !this.state.isOpen, //close the modal
    })
    setTimeout(this.hideSignupMessage, 3000)
  }

  logout = () => {
    localStorage.removeItem("me");
    // debugger
    this.setState({
      userLoggedIn: false,
      logout: true,
    })
    setTimeout(this.hideLogoutMessage, 3000);
  }

  showName = (name) => {
    this.setState({
      name: name,
    })
  }

  render() {
    const styles = { textDecoration: "none", color: "black" }
    const { isOpen, loggedIn, signedUp, userLoggedIn, logout, name } = this.state
    return (
      <div>
        {/* if login successful, show msg */}
        {loggedIn ? <Alert color="success">You have successfully logged in! </Alert> : null}

        {/* if signup successful, show msg */}
        {signedUp ? <Alert color="success">You have successfully registered with us! Please proceed to login.</Alert> : null}

        {isOpen ? <ShowModal showName={this.showName} toggle={this.toggle} isOpen={isOpen} toggleLogin={this.toggleLogin} toggleSignup={this.toggleSignup} /> : null}

        {logout && <Alert color="success">You have successfully logged out! </Alert>}

        <Navbar color="light" light expand="md" >
          <NavbarBrand >
            <img style={{ width: 30, marginRight: 20, fontWeight: "bold" }} src={logo} />
            <Link to="/" style={styles}>Nextagram</Link>
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {/* <text>Hello, {name}</text> */}
              {/* <Input type="text" onChange={this.handleInput} value={this.state.name} placeholder="Search" /> */}
            </NavItem>
            <NavItem className="mr-4">
              <Link to="/" style={styles} > Home</Link>
            </NavItem>
            {userLoggedIn && <NavItem className="mr-4">
              <Link to="/profile" style={styles}>My Profile</Link>
            </NavItem>}
            {userLoggedIn ?
              <NavItem className="mr-4">
                <button onClick={this.logout}>Logout</button>
              </NavItem> :
              <NavItem className="mr-4">
                <button onClick={this.toggle}>Login</button>
              </NavItem>
            }
          </Nav>
        </Navbar>
      </div >
    );
  }
}
