import { Box } from "@mui/material";
import { MapComponentProps } from "@/interfaces";

const MapComponent = ({ map }: MapComponentProps) => {
  console.log("map", map);

  const Styles = {
    tile: {
      width: `calc(100% / ${map.dimensionX})`,
      height: `calc(100% / ${map.dimensionY})`,
      border: "1px solid black",
    },
    emptyTile: {
      width: "20px",
      height: "20px",
      background: "grey",
    },
    wallTile: {
      width: "20px",
      height: "20px",
      background: "black",
    },
    playerTile: {
      width: "20px",
      height: "20px",
      background: "blue",
    },
    enemyTile: {
      width: "20px",
      height: "20px",
      background: "red",
    },
    bulletTile: {
      background: "yellow",
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid black",
        width: "100%",
        height: "100%",
      }}
    >
      {map.tiles.map((row, rowIndex) =>
        row.map((tile, tileIndex) => {
          switch (tile.occupation) {
            case "empty":
              console.log("empty");
              return (
                <Box
                  key={`${rowIndex}-${tileIndex}`}
                  sx={[Styles.emptyTile, Styles.tile]}
                />
              );
            case "wall":
              console.log("wall");
              return (
                <Box
                  key={`${rowIndex}-${tileIndex}`}
                  sx={[Styles.wallTile, Styles.tile]}
                />
              );
            case "player":
              console.log("player");
              return (
                <Box
                  key={`${rowIndex}-${tileIndex}`}
                  sx={[Styles.playerTile, Styles.tile]}
                />
              );
            case "ai":
              console.log("ai");
              return (
                <Box
                  key={`${rowIndex}-${tileIndex}`}
                  sx={[Styles.enemyTile, Styles.tile]}
                />
              );
            case "ai-bullet":
              console.log("bullet");
              return (
                <Box
                  key={`${rowIndex}-${tileIndex}`}
                  sx={[Styles.bulletTile, Styles.tile]}
                />
              );
            case "player-bullet":
              console.log("bullet");
              return (
                <Box
                  key={`${rowIndex}-${tileIndex}`}
                  sx={[Styles.bulletTile, Styles.tile]}
                />
              );
            default:
              console.log("error");
              return null;
          }
        })
      )}
    </Box>
  );
};

export default MapComponent;
