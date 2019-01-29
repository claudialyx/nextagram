import React from "react"
import UserImages from "../containers/UserImages";
import LoadingIndicator from "../components/LoadingIndicator";

class UserProfilePage extends React.Component {   

    render(){
        const {users,isLoading} = this.props;
        let userId = this.props.match.params.id;
        const user = users.find((user)=>(user.id == this.props.match.params.id));
        
        // username = user.username 
        return (
            <div className= "container-fluid">
                <div className= "row">
                    {/* <div className = "row-sm-5"> */}
                        {user?<h1> Profile page of {user.username}</h1>:<LoadingIndicator/>}
                        <br/>
                        {user?<img className="my-5 rounded-circle w-50 h-50" src={user.profileImage}/>:<LoadingIndicator/>}
                    {/* </div> */}
                </div>
                <div className= "row">
                    <UserImages userId = {userId}/>
                </div>
            </div>
        )
    }
}

export default UserProfilePage