import React from 'react';
import ReactDom from 'react-dom';
import  {createStore, combineReducers} from 'redux';

//import actions from './actions'
import * as reducers from "./reducers"


const INCREMENT = 'INCREMENT';
const DATA ='DATA';
const USER = 'USER';


//const action = {type: USER}
//export {actions}
export default createStore(combineReducers(reducers));



/*
const reducerUser=(state={}, action) =>{

    switch(action.type){
        case USER:
            return action.name;

        default: return state
    }
}



const reducerData=(state={}, action)=>{

    switch(action.type){
        case DATA:
            return state;

        default: return state
    }
}
*/

/*
const reducer =(state, action)=>{

    const user = reducerUser(state.user, action)
    const data = reducerData(state.data, action)

    return {user,
            data}
}
*/
