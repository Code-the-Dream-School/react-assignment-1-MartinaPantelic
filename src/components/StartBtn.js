import React from 'react';

import Board from './Board';


const StartBtn = () => {
  const [showResults, setShowResults] = React.useState(false)
  const [hideStartBtn, setHideStartBtn] = React.useState(true)
  const onClickBoard = () => {
    setShowResults(true);
    setHideStartBtn(false)
  }
 
  function ShowStartBtn() {
    return (
      <input type="submit" value="Start" className="btn btn-dark niceFont start-btn" onClick={onClickBoard} />
    );
  }

  return (
    <div className="w-100">

      {showResults ? <Board /> : null}
      {hideStartBtn ? <ShowStartBtn /> : null}
   
    </div>
  )
}

export default StartBtn;
