import { Box } from "@mui/material";
import { MapComponentProps } from "@/interfaces";

const MapComponent = ({ map }: MapComponentProps) => {
  const Styles = {
    emptyTile: {
      background: "grey",
    },
    wallTile: {
      background: "black",
    },
    playerTile: {
      background: "blue",
    },
    enemyTile: {
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
        width: "100%",
        height: "100%",
      }}
    >
      {map.tiles.map((row, rowIndex) => {
        switch (row[rowIndex].occupation) {
          case "empty":
            return <Box sx={Styles.emptyTile} />;
          case "wall":
            return <Box sx={Styles.wallTile} />;
          case "player":
            return <Box sx={Styles.playerTile} />;
          case "ai":
            return <Box sx={Styles.enemyTile} />;
          case "ai-bullet":
            return <Box sx={Styles.bulletTile} />;
          case "player-bullet":
            return <Box sx={Styles.bulletTile} />;
          default:
            return null;
        }
      })}
    </Box>
  );
};

export default MapComponent;
