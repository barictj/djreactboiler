import React from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/home'
import Signup from './components/Signup'


//Set up all routes here
//An example to use a dynamic path would be:
//<Route exact path='userinformation/:user/' component={UserInformation}
//You could feed the username threw the browser to user for fetchuser in Reux actions auth.js
const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup/' component={Signup} />
        </div>
);

export default BaseRouter;