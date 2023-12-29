import "./style.css"
import GameScene from "./scene/gameScene"

await GameScene.getInstance().load();
GameScene.getInstance().render();