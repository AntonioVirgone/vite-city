import { StartScreen } from "./screens/StartScreen";

window.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    if (app) {
        new StartScreen(app);
    }
});
