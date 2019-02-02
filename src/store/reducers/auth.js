import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null, 
    loading: false,
    username: '',
    user: {},
    programminglanguage: {},
    users: {}
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
        user: action.user.user,
        username: action.username
    });
}
const getUserInformation = (state, action) => {

    return Object.assign({}, state, {
          user: action.user,
          loading: false
        
    })
}
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        loading: false,
        user: {}
    });
}
const userList = (state, action) => {
    console.log('money')
    return updateObject(state, {
        users: action.users
    })
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.GET_USER_INFORMATION: return getUserInformation(state, action)
        case actionTypes.GET_USER_LIST: return userList(state, action)
        default:
            return state;
    }
}

export default reducer;