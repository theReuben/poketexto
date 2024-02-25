import React from 'react';
import './ResponseBox.css';

function ResponseBox({ isCorrectGuess, isDuplicateGuess, hasTextEntered }) {
    return (
        <div className={`response-box ${hasTextEntered ? 'has-text-entered' : ''} ${isCorrectGuess ? 'congratulations' : isDuplicateGuess ? 'already-guessed' : ''}`}>
            {isCorrectGuess && <p>Congratulations, you guessed the pokemon!</p>}
            {isDuplicateGuess && <p>You already guessed this</p>}
        </div>
    );
}

export default ResponseBox;
