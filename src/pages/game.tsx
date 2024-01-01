import GameScene from "../scene/gameScene"
import Modal from "../components/modal";
import { useState, useEffect } from "react";

const GamePage = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);


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
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} startGame={() => {
                setIsModalOpen(false);
                setIsGameStarted(true)
            }} />

            {isGameStarted && <div id="game-canvas"></div>}
        </div>
    );
}

export default GamePage;