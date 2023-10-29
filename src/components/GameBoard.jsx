import React from 'react'


const GameBoard = ({onSelectSquare,board}) => {
 
//   const [gameBoard , setGameBoard] = useState(initialGameBoard);
//   function handleSelectSquare(rowIndex,colIndex){

//       setGameBoard(prevGameBoard =>{
//             const updatedGameBoard = [...prevGameBoard.map(innerArr => [...innerArr])];
//             updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
//             return updatedGameBoard;
//       });

//       onSelectSquare();

//   }
  return (
        <ol id = "game-board">
        {
        board.map((row,rowIndex) =>(
           <li key={rowIndex}>
              <ol>
                   {row.map((col,colIndex) =>(
                       <li key ={colIndex}><button
                        onClick={onSelectSquare.bind(this, rowIndex, colIndex)}
                        disabled ={col!==null}
                       >{col}</button></li>
                   ))}
              </ol>
           </li>
        ))
        }
        </ol>
  )
}

export default GameBoard