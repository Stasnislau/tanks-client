import {
  MoveValidatorProps,
} from "../../interfaces";
const validateMove = ({ map, move }: MoveValidatorProps) => {
  if (
    move.xAfter < 0 ||
    move.yAfter < 0 ||
    move.xAfter >= map.dimensionX ||
    move.yAfter >= map.dimensionY
  ) {
    return false;
  }
  if (map.tiles[move.xAfter][move.yAfter].occupation !== "empty") {
    return false;
  }
  if (move.xBefore === move.xAfter && move.yBefore === move.yAfter) {
    return false;
  }
  if (
    move.xBefore !== move.xAfter &&
    move.yBefore !== move.yAfter &&
    Math.abs(move.xBefore - move.xAfter) !== 1 &&
    Math.abs(move.yBefore - move.yAfter) !== 1
  ) {
    return false;
  }
  return true;
};

export default validateMove;
