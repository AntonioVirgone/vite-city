import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";

const startScreen = new StartScreen(() => {
    startScreen.hide();
    const gameScreen = new GameScreen();
    gameScreen.show();
});
