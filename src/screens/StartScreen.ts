import {GameScreen} from "./GameScreen";

export class StartScreen {
    constructor(private app: HTMLElement) {
        this.render();
    }

    private render() {
        this.app.innerHTML = `
          <div class="start-screen">
            <h1>Benvenuto nel Gioco!</h1>
            <button id="startButton">Start</button>
          </div>
        `;

        const startButton = document.getElementById("startButton");
        startButton?.addEventListener("click", () => {
            new GameScreen(this.app);
        });
    }
}
