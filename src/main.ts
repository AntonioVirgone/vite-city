import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import "bootstrap/dist/css/bootstrap.min.css";

const startScreen = new StartScreen(() => {
    startScreen.hide();
    const gameScreen = new GameScreen();
    gameScreen.show();
});
