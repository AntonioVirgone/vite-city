import { Tile } from "../components/Tile";
import { Collector } from "../utils/Collector";
import {EventType} from "../types/Events.ts";

export class GameScreen {
    private element = document.getElementById("game-screen")!;
    private grid = document.querySelector(".grid")!;
    private buttons = document.querySelectorAll("[data-event]");
    private selectedEvent: EventType = EventType.None;
    private collector = new Collector();

    private tiles: Tile[] = [];

    constructor() {
        this.buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const type = (btn as HTMLElement).dataset.event!;
                this.selectedEvent = type as EventType;
            });
        });

        this.createGrid();
    }

    show() {
        this.element.style.display = "flex";
    }

    private createGrid() {
        for (let i = 0; i < 200; i++) {
            const tile = new Tile(this.grid, (tileInstance) => {
                if (tileInstance.isReadyForReset()) {
                    tileInstance.reset();
                    this.collector.add(1); // raccolta completata
                } else {
                    tileInstance.setEvent(this.selectedEvent, () => {
                        // azione completata
                    });
                }
            });
            this.tiles.push(tile);
        }
    }
}
