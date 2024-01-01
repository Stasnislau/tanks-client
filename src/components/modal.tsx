import { useState, useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';

const Modal = (
    { isOpen, setIsOpen, startGame }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, startGame: () => void }
) => {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsOpen(false));
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
                ref={ref}
            >
                <h2>Welcome to the Tank Game!</h2>
                <p>This is a game where you control a tank and try to defeat your enemies.</p>
                <button onClick={startGame}>Start Game</button>
            </div>
        </div>
    );
}


export default Modal;