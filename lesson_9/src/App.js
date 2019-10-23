import React from 'react';
import ReactDom from 'react-dom';
import './App.css';
import store from'./store/index'
import {Provider, connect} from 'react-redux'
import  {createStore, combineReducers} from 'redux';

console.log(store);

const Button = (props)=>{
    return <button>{props.children}</button>
}

const Input = (props) => {
    return <input value={props.increment}/>
}

const mapStateToProps = (state)=>{return {
    state: state.increment
}}

const InputWithStore = connect(mapStateToProps,)(Input)

class Lesson extends React.Component{


    render() {
        return(
        <Provider store={store}>
        <Button>+1</Button>
        <Input />
        <Button>-1</Button>
        </Provider>
    )}
}

export default Lesson

