import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';


const styles = theme => ({
//To stye the form

    textField:{
        backgroundColor: 'white',
        width: '100px',
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit ,
        // justifyContent: 'right',
        // alignItems: 'right',
        // textAlign: 'right'



    },
    loginForm:{
        padding: theme.spacing.unit * 0,
        margin: 0,
        // justifyContent: 'right',
        // alignItems: 'right',
        // textAlign: 'right',
        marginBottom: theme.spacing.unit * 1,

      },
    
    button: {
        position:'relative',
        backgroundColor:'#5a48a7',
        color: 'white',
        height: '20px !important',
        marginTop: theme.spacing.unit ,
        
      },
  });
  





class LoginForm extends React.Component {
    //Takes username and password and submits to store
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.onAuth(e.target.userName.value, e.target.password.value)
      };
    
  
    render() {
      const { classes, loading } = this.props;
      console.log(this.props)
      console.log(loading)
      let errorMessage = null;
      if (this.props.error) {
          errorMessage = (
              <p>{this.props.error.message}</p>
          );
      }
      return (
            <React.Fragment>
            <div className={classes.loginForm}>
            {errorMessage}
      
                <form onSubmit={this.handleSubmit}>
                <TextField 
                name="userName"
                placeholder="Your name" 
                className={classes.textField}
                required
                />      
                <TextField 
                name="password"
                placeholder="Password"
                type='password' 
                required
                className={classes.textField}
                />   
                 <Button 
                 size="small"
                 label="Submit" 
                 type="submit" 
                 className={classes.button}>
                 Login
                 </Button>
                <Typography>
                Or <Link to='/signup/'>Or Signup</Link>
                </Typography>
                </form>
            
            </div>
            </React.Fragment>
        )}
    }
    LoginForm.propTypes = {
        classes: PropTypes.object.isRequired,
      };
    const mapStateToProps = (state) => {
        return {
            loading: state.loading,
            error: state.error
        }
    }
    
    const mapDispatchToProps = dispatch => {
        return {
            onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
        }
    }
    
    export default compose(withStyles(styles, { name: 'LoginForm' }),
        connect(mapStateToProps, mapDispatchToProps)
      )(LoginForm);