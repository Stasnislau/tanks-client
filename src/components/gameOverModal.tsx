interface GameOverModalProps {
    onRestart: () => void;
    outcome: "red" | "green" | "draw";
    isOpen: boolean;
}

const GameOverModal = ({ isOpen, onRestart, outcome }: GameOverModalProps) => {

    const outcomeText = outcome === "draw" ? "It's a draw" : `The winner is the ${outcome} team!`;

    if (!isOpen) {
        return null;
    }
    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70"
        >
            <div
                className="bg-white rounded-lg shadow-2xl p-6 m-4 max-w-sm w-full text-center"
            >
                <p className="text-2xl font-bold text-red-600">Game Over</p>

                <p className="my-4 text-lg text-gray-700">
                    It was a <span className="font-bold text-purple-600">legendary</span> battle!
                </p>

                <p className="my-4 text-md">
                    {outcomeText}
                </p>

                <button
                    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full
                    focus:outline-none focus:shadow-outline
                    hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out"
                    onClick={onRestart}
                >

                    Restart Game
                </button>
            </div>
        </div>
    );
};

export default GameOverModal;