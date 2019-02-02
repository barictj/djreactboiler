import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';

import CustomLayout from './containers/Layout';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();

    // const username = this.props.username
  
   
    
    //

    
    // this.props.fetchuser(username);
  }

  render() {
    
    return (
     
        <Router>
          <CustomLayout {...this.props}>
              <BaseRouter />
          </CustomLayout>
        </Router>
        
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    username: state.username,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    getfetchUser: id => dispatch( actions.fetchUser( id ) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
