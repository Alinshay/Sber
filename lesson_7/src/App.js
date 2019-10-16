import React from 'react';
import './App.css';

const MyButton = (props) => {
    return <button onClick = {props.onClick} className='my-button' id={props.num}> <p> {props.name} </p> </button>
}

/**
 * Как высчитываются очки
 *
 *.----------.------.-------.----------.
 *|          | Rock | Paper | Scissors |
 *:----------+------+-------+----------:
 *| Rock     |    0 |     0 |        1 |
 *:----------+------+-------+----------:
 *| Paper    |    1 |     0 |        0 |
 *:----------+------+-------+----------:
 *| Scissors |    0 |     1 |        0 |
 *'----------'------'-------'----------'
 * */

const truthTable = [
    [0,0,1],
    [1,0,0],
    [0,1,0]
]

const checkWinner = (playerChoice, computerChoice ) => {

    const playerScore = truthTable[playerChoice][computerChoice];
    const computerScore = truthTable[computerChoice][playerChoice];
    if (playerScore > computerScore) {
        return 'Ты';
    } else if (computerScore > playerScore) {
        return 'Комп';
    } else if (playerScore === computerScore) {
        return 'Никто';
    }

}

const buttons = [{str: 'камень', type: 'rock', score: 0}, {str: 'бумага', type: 'paper', score: 1}, {str: 'ножницы', type: 'scissors', score: 2}]


const i = Math.floor(Math.random()*2);
export default class App extends React.Component {


    state = {
        compChoice: buttons[i].str,
        userChoice: '',
        userNum: 0
    }


    onClickHandler = (event) => {

        document.getElementById('result').style.display = 'block';
        this.setState({userNum: event.target.id});
        return this.setState({userChoice: event.target.innerText});

    }



        render() {
        return (
            <div className="App">
            <header className="App-header">
            <p>Камень, Ножницы, Бумага!</p>
        </header>
        <div>

                {buttons.map(item => < MyButton num ={item.score} name={item.str} onClick={this.onClickHandler} /> )}

                <div id='result'>
                <p>Комп выбрал: {this.state.compChoice}</p>
                <p>А твой выбор: {this.state.userChoice}</p>
                <p>Победитель: {checkWinner(parseInt(this.state.userNum),i)} </p>
                </div>
    </div>

        </div>
    );
    }
}
