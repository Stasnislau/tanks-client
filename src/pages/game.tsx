import GameScene from "../scene/gameScene"
import GreetingsModal from "../components/greetingsModal";
import { useState, useEffect } from "react";
import GameOverModal from "../components/gameOverModal";

const GamePage = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [outcome, setOutcome] = useState<"red" | "green" | "draw">("draw");


    useEffect(() => {
        const startGame = async () => {
            await GameScene.getInstance().load((outcome: "red" | "green" | "draw") => {
                setOutcome(outcome);
                setIsGameOver(true);
            }, 1, 2);
            GameScene.getInstance().render();
        }

        if (isGameStarted) {
            startGame();
        }
    }, [isGameStarted]);

    return (
        <div>
            <GreetingsModal isOpen={isModalOpen} startGame={() => {
                setOutcome(outcome);
                setIsModalOpen(false);
                setIsGameStarted(true)
            }} />
            <GameOverModal isOpen={isGameOver} onRestart={() => {
                setIsGameOver(false);
                setIsGameStarted(true);
            }
            } outcome={outcome} />
            <div id="game-canvas"></div>

        </div>
    );
}

export default GamePage;