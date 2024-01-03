import GameScene from "../scene/gameScene"
import GreetingsModal from "../components/greetingsModal";
import { useState, useEffect } from "react";
import GameOverModal from "../components/gameOverModal";

const GamePage = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [shouldRestart, setShouldRestart] = useState(false);
    const [outcome, setOutcome] = useState<"red" | "green" | "draw">("draw");
    const [isFirstRun, setIsFirstRun] = useState(true);


    useEffect(() => {
        const startGame = async () => {
            await GameScene.getInstance().load((outcome: "red" | "green" | "draw") => {
                setOutcome(outcome);
                setIsGameOver(true);
                setIsGameStarted(false);
            }, 1, 1);
            GameScene.getInstance().render();
        }

        if (isGameStarted && isFirstRun) {
            setIsFirstRun(false);
            startGame();
        }
    }, [isFirstRun, isGameStarted]);

    useEffect(() => {
        const restartGame = async () => {
            await GameScene.getInstance().restart(
                1, 1
            );
        }
        if (shouldRestart) {
            restartGame();
            setShouldRestart(false);
        }
    }, [shouldRestart]);

    return (
        <div>
            <GreetingsModal isOpen={isModalOpen} startGame={() => {
                setOutcome(outcome);
                setIsModalOpen(false);
                setIsGameStarted(true)
            }} />
            <GameOverModal isOpen={isGameOver &&
                !isGameStarted
            } onRestart={() => {
                setIsGameOver(false);
                setIsGameStarted(true);
                setShouldRestart(!shouldRestart);
            }
            } outcome={outcome} />
            <div id="game-canvas"></div>
        </div>
    );
}

export default GamePage;