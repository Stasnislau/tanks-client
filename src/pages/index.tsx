import { io } from "socket.io-client";
import MapComponent from "../Components/map";
import Header from "../Components/Header";
import WinnerModal from "@/Components/WinnerModal";

import { debounce, throttle } from "lodash";
import { useEffect, useState } from "react";
import React from "react";
import { mapInterface } from "./api/interfaces";
const socket = io("http://localhost:3001", {
  transports: ["websocket"],
});
const MainPage = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [shoot, setShoot] = useState(false);
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });
  const [gameOver, setGameOver] = useState<null | string>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [value, setValue] = useState({} as mapInterface);

  const headerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight - headerRef.current?.clientHeight!;

    setSizes({
      width,
      height,
    });
  }, []);
  const commandStack = {
    blueNumber: 1,
    redNumber: 3,
  };

  useEffect(() => {
    socket.on("server-client-map", (value: mapInterface) => {
      setValue(value);
    });
    socket.emit("start-game", { commandStack });
    socket.on("server-client-map", (value: mapInterface) => {
      setValue(value);
    });
    socket.on("server-client-game-over", (status: string) => {
      setGameOver(status);
      console.log("status received", status);
      setIsModalOpened(true);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isMoving) {
      socket.emit("move", { direction });
    }
  });

  useEffect(() => {
    if (gameStarted) {
      socket.emit("start-game", { commandStack });
    }
  }, [gameStarted]);
  const sendDirection = throttle(() => {
    socket.emit("direction", direction);
  }, 500);
  const sendShoot = throttle(() => {
    socket.emit("shoot");
  }, 500);
  const handleKeyUp = debounce((e) => {
    if (e.key === "w") {
      setIsMoving(false);
      setDirection("");
    } else if (e.key === "a") {
      setIsMoving(false);
      setDirection("");
    } else if (e.key === "d") {
      setIsMoving(false);
      setDirection("");
    } else if (e.key === "s") {
      setIsMoving(false);
      setDirection("");
    } else if (e.key === " ") {
      setShoot(false);
    }
  }, 200);
  const handleKeyDown = debounce((e) => {
    if (e.key === "w") {
      setIsMoving(true);
      setDirection("up");
    } else if (e.key === "s") {
      setIsMoving(true);
      setDirection("down");
    } else if (e.key === "a") {
      setIsMoving(true);
      setDirection("left");
    } else if (e.key === "d") {
      setIsMoving(true);
      setDirection("right");
    } else if (e.key === " ") {
      setShoot(true);
    }
  }, 200);
  useEffect(() => {
    if (gameStarted) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [gameStarted, handleKeyDown, handleKeyUp]);
  useEffect(() => {
    if (direction !== "") {
      sendDirection();
    }
  }, [direction, sendDirection]);
  useEffect(() => {
    if (shoot) {
      sendShoot();
    }
  }, [shoot, sendShoot]);
  return (
    <div>
      <Header ref={headerRef} secondsElapsed={0} kills={0} />
      {!gameStarted && (
        <button
          onClick={() => {
            setGameStarted(true);
          }}
        >
          Start Game
        </button>
      )}
      {gameStarted && <MapComponent map={value} sizes={sizes} />}
      {gameOver && isModalOpened && (
        <WinnerModal
          status={gameOver}
          onClose={() => {
            setIsModalOpened(false);
          }}
        />
      )}
    </div>
  );
};

export default MainPage;
