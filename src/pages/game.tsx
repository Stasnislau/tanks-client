import GameScene from "../scene/gameScene"
import { useState, useEffect } from "react";

const GamePage = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);


    useEffect(() => {
        const startGame = async () => {
            await GameScene.getInstance().load();
            GameScene.getInstance().render();
        }

        if (isGameStarted) {
            startGame();
        }
    }, [isGameStarted]);

    return (
        <div>
            <h1>Game Page</h1>
            <button onClick={() => setIsGameStarted(true)}>Start Game</button>
            {isGameStarted && <div id="game-canvas"></div>}
        </div>
    );
}

export default GamePage;