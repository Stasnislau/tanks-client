interface GameOverModalProps {
    onRestart: () => void;
    outcome: "red" | "green" | "draw";
    isOpen: boolean;
}

const GameOverModal = ({ isOpen, onRestart, outcome }: GameOverModalProps) => {

    const outcomeText = outcome === "draw" ? "It's a draw" : `The winner is ${outcome} team!`;

    if (!isOpen) {
        return null;
    }
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px'
            }}>
                <h2>Game Over</h2>
                <p>Is was a nice game</p>
                <p>{outcomeText}</p>

                <button onClick={onRestart}>Restart Game</button>
            </div>
        </div>
    );
};

export default GameOverModal;