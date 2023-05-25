import { io, Socket } from "socket.io-client";
import MapComponent from "../Components/map";
import Header from "../Components/Header";

import { debounce, set } from "lodash";
import { useEffect, useState } from "react";
import React from "react";
import { mapInterface } from "./api/interfaces";

const MainPage = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });
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
    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
    });
    socket.on("server-client-map", (value: mapInterface) => {
      setValue(value);
    });
    console.log("Sent map", commandStack);
    socket.emit("start-game", { commandStack });

    return () => {
      socket.disconnect();
    };
  }, []);
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
    }
  }, 200);
  console.log("Value on the page", value);
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
    </div>
  );
};

export default MainPage;
