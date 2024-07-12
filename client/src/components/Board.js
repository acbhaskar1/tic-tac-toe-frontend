import React from 'react';

const Board = ({ board, onClick }) => {
    return (
        <div className="board">
            {board.map((cell, index) => (
                <div key={index} className="cell" onClick={() => onClick(index)}>
                    {cell}
                </div>
            ))}
        </div>
    );
};

export default Board;
