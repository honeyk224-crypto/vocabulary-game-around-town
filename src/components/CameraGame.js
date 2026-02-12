import React, { useEffect, useRef, useState } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import { drawHand } from './utilities'; // Assuming a utility to draw detected hands

const CameraGame = () => {
    const [score, setScore] = useState(0);
    const [currentWord, setCurrentWord] = useState('');
    const [fallingImages, setFallingImages] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const words = ['Vocabulary', 'Game', 'Around', 'Town', 'React', 'TensorFlow', 'Handpose', 'Model', 'Images', 'Click', 'Select', 'Answers', 'Score', 'Tracking', 'Progression']; // Sample words

    useEffect(() => {
        const setupCamera = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            await new Promise((resolve) => {
                videoRef.current.onloadedmetadata = () => {
                    resolve();
                };
            });
            videoRef.current.play();
        };  

        const loadModel = async () => {
            const model = await handpose.load();
            detectHands(model);
        };

        const detectHands = async (model) => {
            const predictions = await model.estimateHands(videoRef.current);
            drawHand(predictions, canvasRef.current);
            requestAnimationFrame(() => detectHands(model));
        };

        const startGame = () => {
            setGameActive(true);
            spawnFallingImages();
        };  

        const spawnFallingImages = () => {
            const interval = setInterval(() => {
                if (fallingImages.length < 15) {
                    const nextWord = words[Math.floor(Math.random() * words.length)];
                    setFallingImages(prev => [...prev, { word: nextWord, position: 0 }]);
                }
            }, 2000); // spawn every 2 seconds

            return () => clearInterval(interval);
        };

        setupCamera();
        loadModel();
        startGame();
    }, []);

    const updateGameLoop = () => {
        setFallingImages(prev => prev.map(image => ({ ...image, position: image.position + 2 })));
    };

    useEffect(() => {
        const gameLoop = setInterval(updateGameLoop, 30); // update every 30ms
        return () => clearInterval(gameLoop);
    }, []);

    return (
        <div>
            <video ref={videoRef} style={{ display: 'none' }} />
            <canvas ref={canvasRef} />
            <h1>Score: {score}</h1>
            {fallingImages.map((image, index) => (
                <div key={index} style={{ position: 'absolute', top: image.position, left: `${Math.random() * 100}%` }}> {/* Random horizontal position */}
                    {image.word}
                </div>
            ))}
        </div>
    );
};

export default CameraGame;