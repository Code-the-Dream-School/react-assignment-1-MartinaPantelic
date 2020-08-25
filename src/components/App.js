import React from 'react';
import ReactDOM from 'react-dom';


import StartBtn from './StartBtn';

import logo from '../images/logo.png';

class App extends React.Component {

  render() {
    return (
      <div className="content">
        <div className="container">
        <div className="center welcome-msg">
        <img className="logo" src={logo} alt="logo"></img>
        <h1 className="niceFont">TIC TAC TOE</h1>

      {/* START GAME */}

        <StartBtn />

          </div>
        </div>
      </div>
    )
  }

}












ReactDOM.render(<App />, document.getElementById("root"));



export default App;
