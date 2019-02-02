import React from 'react';
import * as actions from '../store/actions/auth'
import { connect } from 'react-redux';

class UserList extends React.Component{
    componentDidMount(){
        this.props.fetchUserList();  //Grabs user list in an array this.props.users.users
      }
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
const mapStateToProps = (state) => {
    return{
        users: state.users,
    }
  }
  const mapStateToDispatch = (dispatch) => ({
    fetchUserList: () => dispatch(actions.fetchUserList()),
  })

  export default connect(mapStateToProps, mapStateToDispatch)(UserList)