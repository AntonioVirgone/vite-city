export class StartScreen {
    private element = document.getElementById("start-screen")!;
    private startButton = document.getElementById("start-button")!;

    constructor(onStart: () => void) {
        this.startButton.addEventListener("click", () => onStart());
    }

    hide() {
        this.element.style.display = "none";
    }
}
