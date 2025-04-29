import { Tile } from "../components/Tile";
import { EventType } from "../types/Events";

export class GameScreen {
    private selectedEvent: EventType = EventType.None;

    constructor(private app: HTMLElement) {
        this.render();
    }

    private render() {
        this.app.innerHTML = `
      <div class="event-menu">
        <button id="noneBtn">Nessun Evento</button>
        <button id="fireBtn">Fuoco</button>
        <button id="waterBtn">Acqua</button>
        <button id="grassBtn">Erba</button>
      </div>
      <div class="grid"></div>
    `;

        this.setupEventButtons();
        this.createGrid();
    }

    private setupEventButtons() {
        (document.getElementById("noneBtn") as HTMLButtonElement).addEventListener("click", () => this.selectEvent(EventType.None));
        (document.getElementById("fireBtn") as HTMLButtonElement).addEventListener("click", () => this.selectEvent(EventType.Fire));
        (document.getElementById("waterBtn") as HTMLButtonElement).addEventListener("click", () => this.selectEvent(EventType.Water));
        (document.getElementById("grassBtn") as HTMLButtonElement).addEventListener("click", () => this.selectEvent(EventType.Grass));
    }

    private selectEvent(eventType: EventType) {
        this.selectedEvent = eventType;
    }

    private createGrid() {
        const grid = document.querySelector(".grid") as HTMLElement;
        for (let i = 0; i < 200; i++) {
            new Tile(grid, (tile) => tile.setEvent(this.selectedEvent));
        }
    }
}
