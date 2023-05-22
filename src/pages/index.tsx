import { io, Socket } from "socket.io-client";
// import Header from "../Components/Header";

import { debounce, set } from "lodash";
import { useEffect, useState } from "react";
import React from "react";

const MainPage = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });
  const socket = io("http://localhost:3001", {
    transports: ["websocket"],
  });
  const headerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight - headerRef.current?.clientHeight!;

    setSizes({
      width,
      height,
    });
  }, []);
  const [value, setValue] = useState("None");
  socket.on("server-client", (data: string) => {
    setValue(data);
  });

  // useEffect(() => {
  //   if (context.gameStarted) {
  //     context.setMap(generateMap(10, 10));
  //   }
  // }, [context.gameStarted]);
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

  // useEffect(() => {
  //   if (context.gameStarted) {
  //     window.addEventListener("keydown", handleKeyDown);
  //     window.addEventListener("keyup", handleKeyUp);
  //     return () => {
  //       window.removeEventListener("keydown", handleKeyDown);
  //       window.removeEventListener("keyup", handleKeyUp);
  //     };
  //   }
  // }, [context.gameStarted, handleKeyDown, handleKeyUp]);

  // useEffect(() => {
  //   if (isMoving) {
  //     context.movePlayer(direction);
  //   }
  // }, [isMoving, direction]);

  return (
    <div>
      {/* <Header ref={headerRef} /> */}
      {!gameStarted && (
        <button
          onClick={() => {
            socket.emit("something", "test");
            setGameStarted(true);
          }}
        >
          Start Game
        </button>
      )}
      {/* {gameStarted && <MapComponent map={map} sizes={sizes} />} */}
      <div>{value}</div>
    </div>
  );
};

export default MainPage;
