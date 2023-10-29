
import { useState } from "react"
import GameBoard from "./GameBoard"
import Player from "./Player"
import Log from "./Log";
import GameOver from './GameOver';
import { WINNING_COMBINATIONS } from "../winning-combinations";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player==='X'){
      currentPlayer  = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array=> [...array])];
  for (const turn of gameTurns){
       const {square,player} = turn;
       const {row,col} = square;
       gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard,WINNING_COMBINATIONS){
  let winner ;
  for(const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
  
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
  
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
  
        if(firstSquareSymbol && 
          firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol){
             winner = players[firstSquareSymbol];
          }
  
  }
  return winner;
}
function App() {

const [players,setPlayers] = useState({
       'X' : 'Player 1',
       'O' : 'Player 2'
});
const [gameTurns,setGameTurns] = useState([]);
 const activePlayer = deriveActivePlayer(gameTurns);

 const gameBoard = deriveGameBoard(gameTurns);
const winner = deriveWinner(gameBoard,WINNING_COMBINATIONS);

const hasDraw = gameTurns.length === 9 && !winner;

 function handleSelectSquare(row,col){
  
   setGameTurns(prevTurns =>{
    const currentPlayer = deriveActivePlayer(prevTurns);

        const updatedTurns = [
          { square :
          {row : row, col : col},
          player : currentPlayer
          }
          ,...prevTurns];
          return updatedTurns;
   });
 }
 
 function handleRematch(){
  setGameTurns([]);
 }

 function playerNameChange(symbol,newName){
    setPlayers(prevPlayers =>{
         return {
           ...prevPlayers,
           [symbol] : newName
         };
    });
 }
  return (
       <main>
         <div id="game-container">
               <ol id="players" className ="highlight-player" >
                 <Player name = 'Player 1' symbol="X"  isActive={activePlayer==='X'} onChangeName={playerNameChange}/>
                 <Player name = 'Player 2' symbol="O" isActive={activePlayer==='O'} onChangeName={playerNameChange}/>
               </ol>
               {(winner|| hasDraw) && <GameOver winner ={winner}  onRematch={handleRematch}/>}
               <GameBoard 
               onSelectSquare={handleSelectSquare}
               board = {gameBoard}
               />
         </div>
         <Log turns={gameTurns}/>
       </main>
  )
}

export default App
