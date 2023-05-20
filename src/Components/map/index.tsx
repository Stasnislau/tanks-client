import { Box, Grid } from "@mui/material";
import { MapComponentProps } from "@/interfacesClient";

const MapComponent = ({ map, sizes }: MapComponentProps) => {
  const minimumDimension = Math.min(map.dimensionX, map.dimensionY)
  const elementSize = minimumDimension / map.dimensionX;
  const Styles = {
    tile: {
      height: elementSize,
      width: elementSize,
    },
    emptyTile: {
      background: "grey",
    },
    wallTile: {
      background: "black",
    },
    blueTeamTile: {
      background: "blue",
    },
    redTeamTile: {
      background: "red",
    },
    bulletTile: {
      background: "yellow",
    },
  };
  return (
    <div  style={{ display: "flex", justifyContent: "center" }}>
      <Grid
        container
        spacing={0}
        sx={{
          width: minimumDimension,
          height: minimumDimension,
          display: "grid",
          gridTemplateColumns: `repeat(${map.dimensionX}, ${elementSize}px)`,
          justifyContent: "center",
          gridAutoRows: "1fr",
          border: "1px solid black",
        }}
      >
        {map.tiles.map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ display: "flex", flexWrap: "wrap" }}>
            {row.map((tile, tileIndex) => {
              switch (tile.occupation) {
                case "empty":
                  return (
                    <Box
                      key={`${rowIndex}-${tileIndex}`}
                      sx={[Styles.emptyTile, Styles.tile]}
                    />
                  );
                case "wall":
                  return (
                    <Box
                      key={`${rowIndex}-${tileIndex}`}
                      sx={[Styles.wallTile, Styles.tile]}
                    />
                  );
                case "blue-team":
                  return (
                    <Box
                      key={`${rowIndex}-${tileIndex}`}
                      sx={[Styles.blueTeamTile, Styles.tile]}
                    />
                  );
                case "red-team":
                  return (
                    <Box
                      key={`${rowIndex}-${tileIndex}`}
                      sx={[Styles.redTeamTile, Styles.tile]}
                    />
                  );
                case "bullet":
                  return (
                    <Box
                      key={`${rowIndex}-${tileIndex}`}
                      sx={[Styles.bulletTile, Styles.tile]}
                    />
                  );
                default:
                  return null;
              }
            })}
          </Box>
        ))}
      </Grid>
    </div>
  );
};

export default MapComponent;
