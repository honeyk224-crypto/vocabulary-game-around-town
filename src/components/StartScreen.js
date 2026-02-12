import React from 'react';

const StartScreen = () => {
    const handleStartClick = () => {
        // Implement logic to start the game
    };

    return (
        <div className="start-screen">
            <h1>Welcome to Vocabulary Game!</h1>
            <button onClick={handleStartClick}>Start Game</button>
        </div>
    );
};

export default StartScreen;