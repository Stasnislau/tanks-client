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
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });
  const [map, setMap] = useState<mapInterface>({
    dimensionX: 0,
    dimensionY: 0,
    tiles: [],
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
      setMap(generateMap(context.dimensionX, context.dimensionY));
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
      {context.gameStarted && <MapComponent map={map} sizes={sizes} />}
    </div>
  );
});

export default MainPage;
