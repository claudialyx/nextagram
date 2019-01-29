import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Router from './Router';
import Navbar1 from './components/Navbar';


class App extends React.Component {
  state = {
    users: [],
    isLoading: true,
  }

  componentDidMount = () => {
    axios({
      method: 'get',
      url: 'https://insta.nextacademy.com/api/v1/users/',
    })
      // performing a GET request to '/api-end-point'
      .then(result => {
        // If successful, we do stuffs with 'result'
        const users = result.data;
        this.setState({
          users, //users:users
          isLoading: false
        });
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR', error)
      })
  }

  UserProfileImage({ match }) {
    return (
      <div>
        <h3>ID:{match.params.id}</h3>
      </div>
    )
  }

  render() {
    const { users, isLoading } = this.state;// users now = an array of objects
    return (
      <div>
        <Navbar1 isLoading={isLoading} />
        <Router users={users} isLoading={isLoading} />
      </div>
    )
  }
}
export default App; 