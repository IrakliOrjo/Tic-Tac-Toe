import { useEffect, useState } from "react"
import Box from "./Box"

const WINNING_NUMBERS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
]

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xPlaying, setXPlaying] = useState(true)
  const [winner, setWinner] = useState(false)
  const [score, setScore] = useState({xScore: 0, oScore: 0})


  const updateBoard = (idx: number) => {
    if(board[idx] || checkWinner()){
      
      return
    }
    const updatedBoard = board.map((val, i) => {
      if(idx === i){

        if(xPlaying){
          return 'x'
        }else{
          return 'o'
        }
      }else{
        return val
      }
    })
    setBoard(updatedBoard)
    setXPlaying(!xPlaying) 
  }

  const checkWinner = () => {
    for(let i=0; i<WINNING_NUMBERS.length; i++){
      const [x,y,z] = WINNING_NUMBERS[i]
      if(board[x] && board[x] === board[y] && board[y] === board[z]){
        
        return board[x]
      }
    }
    return null
  }

  const winSome = checkWinner()
    let status;
    if (winSome) {
      status = "Winner: " + winSome;
    } else {
      status = "Next player: " + (xPlaying ? "X" : "O");
    }

    if(!winner){
      if(winSome){
        if(winSome === 'x'){
          setScore((prevScore) => ({ ...prevScore, xScore: prevScore.xScore + 1 }));
          setWinner(true)
        }else{
          setScore((prevScore) => ({ ...prevScore, oScore: prevScore.oScore + 1 }));
    setWinner(true);
        }
      }
    }

    const reset = () => {
      const newArr = Array(9).fill(null)
      setBoard(newArr)
      setWinner(false)
    }

  return (
    <div>
      <p>Hey {xPlaying ? 'X' : 'O'}'s turn to play!</p>
      <p>THE STATUS: {status}</p>
      <p>X SCORE: {score.xScore} O SCORE: {score.oScore}</p>
      <div className="grid">
        {
        board.map((val,i) => {
          return (
            <Box winner={winner} value={val} onClick={() => {updateBoard(i)}}/>
          )
        })
      }
      </div>
      
 
      <button onClick={reset}>RESET</button>
    </div>
  )
}

export default Board