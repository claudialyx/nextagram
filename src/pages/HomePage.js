import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Image from 'react-graceful-image';
import UserImages from '../containers/UserImages';
import LoadingIndicator from '../components/LoadingIndicator';


export default class HomePage extends React.Component {
    render(){
        const {users, isLoading} = this.props; 
        // console.log(this.props) //will give me 22 arrays with objects & is loading = true or false
        return (
        <div className="container-fluid">
 
                <LoadingIndicator isLoading = {isLoading} />
                {
                  users.map((user,index) =>
                  <div key = {index} className="row">
                    <div className="col-sm-3">
                        <Link to = {`/users/${user.id}`}>
                            <li className="mb-3 my-4 font-weight-bold text-center"> {user.username}<br/>
                                <Image className ="my-2 rounded-circle w-75" src={user.profileImage}/>
                            </li>
                        </Link>
                    </div>
                    <div className="col-sm-9">
                        <UserImages userId={user.id} isLoading ={isLoading}/>                
                    </div>
                  </div>
                  )
                }
        </div>
        )
    }
}
