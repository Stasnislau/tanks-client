
const GreetingsModal = (
    { isOpen, startGame }: { isOpen: boolean, startGame: () => void }
) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70"
        >
            <div
                className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm w-full text-center"
            >
                <div className="">
                    <p className="text-xl font-semibold">
                        Welcome to the TANKS game!
                    </p>
                    <img src="logo.jpg" alt="tanks-logo" className="
                        lg:w-1/2 w-2/3 mx-auto my-4 rounded-full shadow-lg
                    " />
                </div>
                <p className="my-4  text-lg">
                    The rules are simple:
                </p>
                <p className="my-4  text-md">
                    You have to <b>destroy</b> the enemy tanks before they <b>destroy</b> you.
                </p>

                <div className="flex justify-center">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full
                        focus:outline-none focus:shadow-outline
                        hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out
                        "
                        onClick={startGame}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    );
}


export default GreetingsModal;