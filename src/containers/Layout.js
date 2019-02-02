import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


const styles = theme => ({
    root: {
      backgroundColor: "white",  
    },
    
  });


class CustomLayout extends React.Component {
componentDidMount(){
    this.props.onTryAutoSignup()
}

    render() {
        const {classes} = this.props
        
        return (
            

            <div className={classes.root}>
                {this.props.children}
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