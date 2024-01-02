
const GreetingsModal = (
    { isOpen, startGame }: { isOpen: boolean, startGame: () => void }
) => {
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
        }}
        >
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px'
            }}
            >
                <h2>Welcome to the Tank Game!</h2>
                <p>This is a game where you control a tank and try to defeat your enemies.</p>
                <button onClick={startGame}>Start Game</button>
            </div>
        </div>
    );
}


export default GreetingsModal;