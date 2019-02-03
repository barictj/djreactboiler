import React from 'react';
import * as actions from '../store/actions/auth'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import LoginForm from '../components/LoginForm'
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import UserList from '../components/UserList';


const theme = createMuiTheme({
    palette: {
      primary: { main: '#311b92' }, // Purple and green play nicely together.
      secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
  });

  //Insert style in JSON below
const styles = theme => ({})
  

class Home extends React.Component{ 
  componentDidMount(){
    this.props.onTryAutoSignup();//Checks to see if user is signed in
    this.props.fetchUserList();  //Grabs user list in an array this.props.users.users

  }

  render() {
    const user = this.props.user //can now refer to as this.props.user or user.  Can restructure in the store as well.
    console.log(user)
    const { classes } = this.props; //For use with Material UI

    return(
        <MuiThemeProvider theme={theme}>
        {
          this.props.loading ?
          <React.Fragment>
            <CircularProgress />
          </React.Fragment>
          :
          <React.Fragment></React.Fragment>
        }
        { 

          this.props.isAuthenticated ?
          <React.Fragment>
            <Typography
            className={classes.welcomeFont}>
              Welcome {user.username}
            </Typography>
            <Typography>Your email is {user.email}
            </Typography>
            <Typography>
              Welcome
             </Typography>
             <Typography>
              to the 
              Django React<br></br>Boilerplate
            </Typography>
          
            <Button 
            size="small" 
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={this.props.logout}
            >
              Logoout!
            </Button>
          </React.Fragment>
          
          :

          <LoginForm></LoginForm>

        }
        <UserList users={this.props.users}/>
        </MuiThemeProvider>

    )
  }
}

//For use with Reedux
  const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.token !== null,
        user: state.user,
        username: state.username,
        loading: state.loading,
        users: state.users
    }
  }
  const mapStateToDispatch = (dispatch) => ({
    logout: () => dispatch(actions.logout()),
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    fetchUserList: () => dispatch(actions.fetchUserList()),

  })
  //For use with React Router and Material UI
  export default withRouter(compose(
    withStyles(styles, { name: 'Home' }),
    connect(mapStateToProps, mapStateToDispatch)
  )(Home));
  