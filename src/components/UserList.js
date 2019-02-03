import React from 'react';


class UserList extends React.Component{

    render(){
            const { users }  = this.props.users //grabs array of users and assigns that to the users const
            console.log(users)

    return(
        <div>
        { users ?

            <React.Fragment>
                <h2>User List</h2>
                {users.map((users) => (
                    <li>{users.username}</li> 
                    ) 
                )}
            </React.Fragment>
            :
            <React.Fragment>Loading</React.Fragment>
        }
        </div>
    )
    }
}


  export default UserList