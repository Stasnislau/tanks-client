import { bulletInterface, playerInterface } from "../../interfaces";
const shoot = (player: playerInterface) => {
  const direction = player.direction;
  const x = player.x;
  const y = player.y;
  const bullet: bulletInterface = {
    id: 0,
    x,
    y,
    direction,
    isPlayer: true,
  };
};
