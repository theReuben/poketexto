import React, { useState } from 'react';
import axios from 'axios';
import ResponseBox from './response-box/ResponseBox';

function App() {
    const [pokemon, setPokemon] = useState('');
    const [number, setNumber] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [correctGuess, setCorrectGuess] = useState(false);
    const [textEntered, setTextEntered] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (pokemon.trim() === '' || correctGuess) {
            return; // Prevent submitting empty requests
        }
        if (guesses.some(guess => guess.name === pokemon)) {
            setDuplicateGuess(true);
        } else {
            const response = await axios.get(`/guess/${pokemon}`);
            setGuesses([...guesses, response.data].sort((a, b) => a.integer - b.integer));
            setPokemon('');
            setNumber(response.data.integer);
            if (response.data.integer === 1) {
                setCorrectGuess(true);
            }
            setDuplicateGuess(false);
        }
    };

    const handleChange = (event) => {
        if (correctGuess) {
            return; // Prevent entering text after correct guess
        }
        setPokemon(event.target.value);
        if (event.target.value !== '') {
            setTextEntered(true);
        } else {
            setTextEntered(false);
            setDuplicateGuess(false); // Reset duplicate guess message when text is cleared
        }
    };
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit}>
            <input 
                value={pokemon} 
                onChange={handleChange} 
                style={{ margin: '0 auto', marginBottom: '20px' }} 
                placeholder={correctGuess ? "Congratulations!" : "Enter your guess here..."} // Add a placeholder
            />

                <button type="submit">Guess</button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ResponseBox isCorrectGuess={number === 1} isDuplicateGuess={duplicateGuess} />
                {guesses.map((guess, index) => (
                    <div 
                        key={index} 
                        className={`guess ${guess.integer === 1 ? 'success' : ''} ${duplicateGuess && guess.name === pokemon ? 'duplicate' : ''}`}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>{guess.name}</p>
                            <p style={{ textAlign: 'right' }}>{guess.integer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
