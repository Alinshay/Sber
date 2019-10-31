import React from "react";
import ReactDOM from "react-dom";


// Slomux - реализация Flux, в которой, как следует из нвазвания, что-то сломано.
// Нужно выяснить что здесь сломано

const createStore = (reducer, initialState) => {
    let currentState = initialState;
    const listeners = [];

    const getState = () => currentState;
    const dispatch = action => {
        currentState = reducer(currentState, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = listener => listeners.push(listener);

    return { getState, dispatch, subscribe };
};

const connect = (mapStateToProps, mapDispatchToProps) => Component => {
    return class extends React.Component {
        render() {
            return (
                <Component
                    {...mapStateToProps(window.store.getState(), this.props)}
                    {...mapDispatchToProps(window.store.dispatch, this.props)}
                    {...this.props}
                />
            );
        }

        componentDidMount() {
            window.store.subscribe(this.handleChange);
        }

        handleChange = () => {
            this.forceUpdate();
        };
    };
};

class Provider extends React.Component {
    componentWillMount() {
        window.store = this.props.store;
    }

    render() {
        return this.props.children;
    }
}

// APP

// actions
const ADD_TODO = "ADD_TODO";

// action creators
const addTodo = todo => ({
    type: ADD_TODO,
    payload: todo
});

// reducers
const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            state.unshift(action.payload);
            return state;
        default:
            return state;
    }
};

// components
class ToDoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todoText: ""};

        this.updateText = this.updateText.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    render() {

        return (
            <div>
                <label>{this.props.title || "Без названия"}</label>
                <div>
                    <input
                        value={this.state.todoText}
                        placeholder="Название задачи"
                        onChange={this.updateText}
                    />
                    <button onClick={this.addTodo}>Добавить</button>
                    <ul>
                        {this.props.todos.map((todo, idx) => (
                            <li>{todo}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    updateText(e) {
        const { value } = e.target;
        this.setState({todoText: value})
        //this.state.todoText = value;
    }

    addTodo() {
        this.props.addTodo(this.state.todoText);//??

        this.setState({todoText: ''})
        // this.state.todoText = "";
    }
}

const ToDo = connect(
    state => ({
        todos: state
    }),
    dispatch => ({
        addTodo: text => dispatch(addTodo(text))
    })
)(ToDoComponent); //передать props

function App() {
    return (
        <div className="App">
            <h1>ToDo list</h1>
            <Provider store={createStore(reducer, [])}>
                <ToDo title="Список задач" />
            </Provider>
        </div>
    );
}


export default App
