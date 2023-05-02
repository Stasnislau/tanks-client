import { Context } from "../pages/_app";
import Header from "../Components/Header";
import MapComponent from "@/Components/map";
import { mapInterface } from "@/interfaces";
import generateMap from "../logic/mapGenerator";
import { useContext, useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import React from "react";

const MainPage = observer(() => {
  const context = useContext(Context);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState("");
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
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
  useEffect(() => {
    if (context.gameStarted) {
      context.setMap(generateMap(10, 10));
    }
  }, [context.gameStarted]);

  useEffect(() => {
    if (context.gameStarted && isMoving) {
      const intervalId = setInterval(() => {
        context.map.tiles;
        if (direction === "up") {
          context.movePlayer("up");
        } else if (direction === "down") {
          context.movePlayer("down");
        } else if (direction === "left") {
          context.movePlayer("left");
        } else if (direction === "right") {
          context.movePlayer("right");
        }
      }, 100);
    }
  }, [direction]);

  useEffect(() => {
    if (context.gameStarted) {
      window.addEventListener("keydown", (e) => {
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
      });
      window.addEventListener("keyup", (e) => {
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
      });
    }
  }, [context.gameStarted]);
  return (
    <div>
      <Header ref={headerRef} />
      {!context.gameStarted && (
        <button
          onClick={() => {
            context.startGame();
          }}
        >
          Start Game
        </button>
      )}
      {context.gameStarted && <MapComponent map={context.map} sizes={sizes} />}
    </div>
  );
});

export default MainPage;
