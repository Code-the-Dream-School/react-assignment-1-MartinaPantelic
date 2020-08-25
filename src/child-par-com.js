import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './images/logo.png';
import x_sign from './images/x_sign.png';
import o_sign from './images/o_sign.png';


class App extends React.Component {

  render() {
    return (
      <div className="content">
        <div className="container">
          <WelcomeScreen />
          <Game />
        </div>
      </div>
    )
  }

}

class WelcomeScreen extends React.Component {

  render() {
    return (
      <div className="center welcome-msg">
        <img className="logo" src={logo} alt="logo"></img>
        <h1 className="niceFont">TIC TAC TOE</h1>
        <StartBtn />
      </div>
    );
  }
}




function Square(props) {
  return (
    <button className="square btn btn-outline-dark" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


function ResetBtn(props) {
  return (
    <button className="btn btn-dark niceFont" onClick={props.onClick}>
      Reset
    </button>
  );
}

function NewGameBtn(props) {
  return (
    <button className="btn btn-dark niceFont" onClick={props.onClick}>
      New Game
    </button>
  );
}
const StartBtn = () => {
  const [showResults, setShowResults] = React.useState(false)
  const [hideStartBtn, setHideStartBtn] = React.useState(true)
  const onClickBoard = () => {setShowResults(true); 
                             setHideStartBtn(console.log(hideStartBtn))}
 // const onClickBtn = () => sethideStartBtn(false)
  function ShowStartBtn() {
    return (
      <input type="submit" value="Start"  className="btn btn-dark niceFont" onClick={onClickBoard}/>
    );
  }  
  
  // const ShowStartBtn = <input type="submit" value="Start" onClick={onClickBoard} className="btn btn-dark niceFont"/>
  return (
        <div> 
    
      { showResults ? <Board /> : null }
      { hideStartBtn ? <ShowStartBtn  />  : null }
    
    </div>
  )
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
    // e.preventDefault();
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
      status = 'Winner is ' + this.state.fromChild + ' with X';
    }
    else if (winner === this.state.O) {
      status = 'Winner is ' + this.state.fromChild2 + ' with: O';
    }

    else {
      status = 'Next player: ' + (this.state.xIsNext ? this.state.fromChild1 : this.state.fromChild2);
    }

    return (
      <div>
       
       {/* PLAYERS FORM */}

        <Form handlerFromParent={this.handleData} />

         {/* BOARD GAME */}

        <article className="full-board" hidden={this.state.hidden}>
        <div className="form-row space">
            <div className="players"><img className="icon" src={x_sign} alt="x"></img>{this.state.fromChild1}<span>&nbsp;</span></div>
            <div className="players"><img className="icon" src={o_sign} alt="x"></img>{this.state.fromChild2}<span>&nbsp;</span>{this.state.fromChild2}</div>

          </div>
        <div className="alert alert-info">
        <h1 className="niceFont status">{status}</h1>
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
    );
  }
}
//test
class Form extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      nameOne: "",
      nameTwo: "",

    };
  }
  handleChange(event) {
    let target = event.target;
    let { value, name } = target;

    this.setState({
      [name]: target.value
    });
  }
  submitHandler(event) {
    event.preventDefault();


    this.props.handlerFromParent(this.state.nameOne, this.state.nameTwo);
    this.setState({
      nameOne: "",
      nameTwo: "",
     
    });
  
  }



  render() {
    return (
      <div>

        <form onSubmit={this.submitHandler}>
          <div class="center">
            <div class="form-row">
              <div class="form-group col-md-6 niceFont">
                <label>
                  Name
              <span>&nbsp;</span><img className="icon" src={x_sign} alt="x"></img>
                </label>
                <input className="form-control"
                  name="nameOne"
                  type="text"
                  value={this.state.nameOne}
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group col-md-6 niceFont">
                <label>
                  Name
              <span>&nbsp;</span><img className="icon" src={o_sign} alt="o"></img>
                </label>
                <input className="form-control"
                  name="nameTwo"
                  type="text"
                  value={this.state.nameTwo}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <input type="submit" value="Start game" className="btn btn-dark niceFont" />
          </div>
        </form>
      </div>

    );
  }
}
class Game extends React.Component {
  render() {
    return (
      
      <div className="game center">
        <div className="game-board">
       
          {/* <Board /> */}
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}





// ========================================

ReactDOM.render(<App />, document.getElementById("root"));

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
  //
  return null;

}
