import { mapInterface, tileInterface } from "@/interfaces";

const generateMap = (dimensionX: number, dimensionY: number) => {
  const map: mapInterface = {
    tiles: [],
    dimensionX,
    dimensionY,
    player: {
      x: 0,
      y: 0,
      direction: "up",
    },
    shots: [],
    ais: [],
  };
  for (let i = 0; i < dimensionY; i++) {
    const row: tileInterface[] = [];
    for (let j = 0; j < dimensionX; j++) {
      if (map.player.x === i && map.player.y === j) {
        row.push({
          x: i,
          y: j,
          occupation: "player",
        });
        continue;
      }
      row.push({
        x: i,
        y: j,
        occupation: "empty",
      });
    }
    map.tiles.push(row);
  }
  return map;
};

export default generateMap;
