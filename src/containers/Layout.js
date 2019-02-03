import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import {  Grid  } from '@material-ui/core'
import Header from './Header'


const styles = theme => ({
    root: {
      backgroundColor: "white",  
    },
    centerGrid: {
        textAlign: 'center',
        justifyContent: 'center,'
    },
    
    
  });


class CustomLayout extends React.Component {

    render() {
        const {classes} = this.props
        
        return (
            

            <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={3}>
                </Grid>
                <Grid item 
                xs={18}
                className={classes.centerGrid}>
                <Header />
                
                    {this.props.children}
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
                
            </div>

               
        );
    }
}

CustomLayout.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.token !== null,
        user: state.user,
        username: state.username,
        loading: state.loading,
        
    }
  }
  const mapStateToDispatch = (dispatch) => ({
      logout: () => dispatch(actions.logout()),
      onTryAutoSignup: () => dispatch(actions.authCheckState()),
  })
  
  export default withRouter(compose(
    withStyles(styles, { name: 'CustomLayout' }),
    connect(mapStateToProps, mapStateToDispatch)
  )(CustomLayout));