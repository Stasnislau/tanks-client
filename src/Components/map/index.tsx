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
      {map.tiles.map((row, rowIndex) => {
        switch (row[rowIndex].occupation) {
          case "empty":
            console.log("empty");
            return <Box sx={[Styles.emptyTile, Styles.tile]} />;
          case "wall":
            console.log("wall");
            return <Box sx={[Styles.wallTile, Styles.wallTile]} />;
          case "player":
            console.log("player");
            return <Box sx={[Styles.playerTile, Styles.playerTile]} />;
          case "ai":
            console.log("ai");
            return <Box sx={[Styles.enemyTile, Styles.enemyTile]} />;
          case "ai-bullet":
            console.log("bullet");
            return <Box sx={[Styles.bulletTile, Styles.bulletTile]} />;
          case "player-bullet":
            console.log("bullet");
            return <Box sx={[Styles.bulletTile, Styles.bulletTile]} />;
          default:
            console.log("error");
            return null;
        }
      })}
      Размер карты: {map.dimensionX}x{map.dimensionY}
    </Box>
  );
};

export default MapComponent;
