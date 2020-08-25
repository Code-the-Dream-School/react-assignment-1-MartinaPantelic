import React from 'react';

import Form from './Form';

import x_sign from '../images/x_sign.png';
import o_sign from '../images/o_sign.png';


function ResetBtn(props) {
    return (
        <button className="btn btn-dark niceFont" onClick={props.onClick}>
            Reset
      </button>
    );
}

function NewGameBtn(props) {
    return (
        <button className="btn btn-dark niceFont" onClick={() => window.location.reload(false)}>
            New Game
      </button>

    );
}


function Square(props) {
    return (
        <button className="square btn btn-outline-dark" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            nameOne: "",
            nameTwo: "",
            X: <img className="squareIcon" src={x_sign} alt="x"></img>,
            O: <img className="squareIcon" src={o_sign} alt="o"></img>,
            fromChild1: "",
            fromChild2: "",
            hidden: true

        };
        this.handleData = this.handleData.bind(this);

    }
    handleData(nameOne, nameTwo) {
        this.setState({
            fromChild1: nameOne,
            fromChild2: nameTwo,
            hidden: false
        });
    }
    //

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;

        }
        squares[i] = this.state.xIsNext ? this.state.X : this.state.O;
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,

        });
    }

    handleReset() {
        this.setState({
            squares: [],
            xIsNext: true
        });

    }

    handleNewGame(e) {
        
        this.setState({
            squares: [],
            xIsNext: true,
            fromChild1: "",
            fromChild2: "",
            hidden: true
        });

    }


    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;

        if (winner === this.state.X) {
            status = 'Winner is ' + this.state.fromChild1 + ' with X';
        }
        else if (winner === this.state.O) {
            status = 'Winner is ' + this.state.fromChild2 + ' with: O';
        }

        else {
            status = 'Next player: ' + (this.state.xIsNext ? this.state.fromChild1 : this.state.fromChild2);
        }

        return (
            <div>
                <div className="game center">
                    <div className="game-board w-100">

                        {/* PLAYERS FORM */}

                        <Form handlerFromParent={this.handleData} />

                        {/* BOARD GAME */}

                        <article className="w-100" hidden={this.state.hidden}>
                            <div className="form-row space">
                                <div className="players"><img className="icon" src={x_sign} alt="x"></img><span>&nbsp;</span>{this.state.fromChild1}</div>
                                <div className="players"><img className="icon" src={o_sign} alt="x"></img><span>&nbsp;</span>{this.state.fromChild2}</div>

                            </div>
                            <div className="alert alert-info">
                                <h3 className="niceFont status">{status}</h3>
                            </div>
                            <div className="board">
                                <div className="board-row">
                                    {this.renderSquare(0)}
                                    {this.renderSquare(1)}
                                    {this.renderSquare(2)}
                                </div>
                                <div className="board-row">
                                    {this.renderSquare(3)}
                                    {this.renderSquare(4)}
                                    {this.renderSquare(5)}
                                </div>
                                <div className="board-row">
                                    {this.renderSquare(6)}
                                    {this.renderSquare(7)}
                                    {this.renderSquare(8)}
                                </div>
                            </div>
                            <div className="form-row space">

                                <ResetBtn onClick={() => this.handleReset()} />
                                <NewGameBtn onClick={() => this.handleNewGame()} />

                            </div>
                        </article>
                    </div>
                </div>
            </div>
        );
    }
}



//======================  CALCULATING THE WINNER LOGIC

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];

        }
    }

    return null;
}


//======================

export default Board;

