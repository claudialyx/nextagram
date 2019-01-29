import React, { Component } from 'react';
import axios from 'axios';
import LoadingIndicator from './LoadingIndicator';
import Image from 'react-graceful-image';


export default class MyProfilePage extends React.Component {
    state = {
        profilePic: [],
        pictures: [],
    }

    componentDidMount() {
        // const me = localStorage.getItem('me.jwt')
        const me = JSON.parse(localStorage.me).auth_token
        const profilePic = JSON.parse(localStorage.me).profilePic

        axios({
            method: 'GET',
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: {
                Authorization: `Bearer ${me}`,
            }
        })
            .then(result => {
                console.log(result);
                const pictures = result.data;
                this.setState({
                    pictures,
                    isLoading: false,
                });
            })
            .catch(error => {
                console.log('ERROR', error)
            })
    }

    render() {
        const { isLoading } = this.props
        const { pictures } = this.state
        return (
            <>
                <LoadingIndicator isLoading={isLoading} />
                <li>{pictures.map((pictures, index) => <Image key={index} className="my-3 mx-1" width="250" height="200" src={pictures} />)}</li>
            </>
        )
    }
}