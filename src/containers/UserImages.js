import React, { Component } from 'react';
import axios from 'axios';
import Image from 'react-graceful-image';
import LoadingIndicator from '../components/LoadingIndicator';


export default class UserImages extends React.Component {
    state = {
        userImages: [],
        isLoading: true,
    }

    componentDidMount = () => {
        const { userId, isLoading } = this.props
        // console.log(this.props) //get back 22 objects e.g {userId:x, isLoading:false}
        // console.log(userId) // get back 22 ids (not in array)
        axios({
            method: 'get',
            url: (`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
        })
            .then(result => {
                const userImages = result.data;
                // console.log(userImages) // get back 22 arrays with image url strings
                this.setState({
                    userImages, // can put {userImages} becos userImages:userImages
                    isLoading: false,
                });
            })
            .catch(error => {
                console.log("ERROR", error)
            })
    }


    render() {
        const { userImages, isLoading } = this.state; //storing 22 arrays of images in {userImages}
        // console.log(userImages)
        return (
            <div>
                <LoadingIndicator isLoading={isLoading} />
                <li>{userImages.map((user, index) => <Image key={index} className="my-3 mx-1" width="250" height="200" src={user} />)}</li>
            </div>
        )
    }
}
