import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Board from './components/Board';

const App = () => {
    const [games, setGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');

    useEffect(() => {
        axios.get('http://localhost:5000/games')
            .then(response => {
                setGames(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the games!', error);
            });
    }, []);

    const handleCellClick = (index) => {
        if (board[index] || calculateWinner(board)) {
            return;
        }
        const newBoard = board.slice();
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        const winner = calculateWinner(newBoard);
        if (winner) {
            axios.post('http://localhost:5000/games', {
                board: newBoard.join(''),
                currentPlayer,
                status: `Winner: ${winner}`
            }).then(response => {
                setGames([...games, response.data]);
                setCurrentGame(response.data);
            }).catch(error => {
                console.error('There was an error creating the game!', error);
            });
        } else {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    return (
        <div>
            <h1>Tic-Tac-Toe</h1>
            <Board board={board} onClick={handleCellClick} />
            <p>Current Player: {currentPlayer}</p>
            {currentGame && <p>{currentGame.status}</p>}
        </div>
    );
};

export default App;
