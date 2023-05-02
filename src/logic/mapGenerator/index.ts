import { mapInterface, tileInterface } from "@/interfaces";

const generateMap = (dimensionX: number, dimensionY: number) => {
  const map: mapInterface = {
    tiles: [],
    dimensionX,
    dimensionY,
  };
  for (let i = 0; i < dimensionY; i++) {
    const row: tileInterface[] = [];
    for (let j = 0; j < dimensionX; j++) {
      if (i === 4 && j === 9) {
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
