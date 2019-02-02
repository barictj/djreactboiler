import axios from 'axios';
import * as actionTypes from './actionTypes';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";//Needed for compatibility with Django
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";//Needed for compatibility with Django

  
//authStart is to set loading flag to true
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        loading: true
    }
}
//can be used to grab all user information from the store
export const getUserInformation = user => {
    return {
        type: actionTypes.GET_USER_INFORMATION,
        loading: false,
        payload: user
    }
}
//grabs the token returned from Django and sets the loading flag to false.  Also returns all user information and username for quick reference
export const authSuccess = (token, username, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        loading: false,
        username: username,
        user: {user}
 
    }
}

//To set for error when status returned from Django is an error status (Good for form validation or login failure)
export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
//Removes token and sets user to an empty object
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT,
        user: {},
        loading: false
    };
}
export const userList = (users) => {
    console.log(users)
    return {
        type: actionTypes.GET_USER_LIST,
        users: {users}
     }
}
//for use to check if user still has token
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

//For all api calls use your server's url


export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        localStorage.setItem('username', username)
        axios.post('/rest-auth/login/', {
            username: username,
            password: password,
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);//Can change how long the login token lasts here
            localStorage.setItem('token', token);
            const username = localStorage.getItem('username')
            localStorage.setItem('expirationDate', expirationDate);
            axios.get(`/api/user/${username}/`)//Use 
            .then(res => {
                const user = res.data
                dispatch(authStart())
                dispatch(authSuccess(token, username, user));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            })
            
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}


//Signs up and logs user in with same Token time setting below
export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        localStorage.setItem('username', username)
        axios.post('/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
         ;  localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authStart())
            axios.get(`/api/user/${username}/`)
            .then(res => {
            const user = res.data
              dispatch(authStart())
             
              dispatch(authSuccess(token, username, user));

            })   
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}
//Can be used to fetch user information with just username
export const  fetchUser = (username) => {

    return (dispatch) => {
    dispatch(authStart())
      return axios.get(`/api/user/${username}/`)
        .then(res => {
            const user = res.data
            dispatch(authStart())

          dispatch(getUserInformation(user))
         
        })       
    };
  }
//Checks to see if user is still logged in based on time and token.  Cahange settings below 
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username')
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
                } else {
                    return axios.get(`/api/user/${username}/`)
                    .then(res => {
                        const user = res.data
                        dispatch(authStart())
                        dispatch(authSuccess(token, username, user));
                        dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );  
                    })
                }
               }
        }
}
//Can be used to fetch user information with just username
export const  fetchUserList = () => {

    return (dispatch) => {
    dispatch(authStart())
      return axios.get(`/api/user/`)
        .then(res => {
            const users = res.data
            console.log(users)

            dispatch(userList(users))

         
        })       
    };
  }
