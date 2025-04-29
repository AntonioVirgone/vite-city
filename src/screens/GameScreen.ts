import {Tile} from "../components/Tile";
import {Collector} from "../utils/Collector";
import {CropEventType} from "../types/CropEvents.ts";
import {EnergyManager} from "../utils/EnergyManager.ts";
import {TileType} from "../types/RockEvents.ts";

export class GameScreen {
    private element = document.getElementById("game-screen")!;
    private grid = document.querySelector(".grid")!;
    private buttons = document.querySelectorAll("[data-event]");
    private selectedEvent: CropEventType = CropEventType.None;
    private collector = new Collector();
    private energyManager = new EnergyManager();

    private tiles: Tile[] = [];

    constructor() {
        this.buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const type = (btn as HTMLElement).dataset.event!;
                this.selectedEvent = type as CropEventType;
            });
        });

        this.createGrid();
    }

    show() {
        this.element.style.display = "flex";
    }

    private createGrid() {
        for (let i = 0; i < 200; i++) {
            const type = Math.random() < 0.1 ? TileType.Mountain : TileType.Normal;

            const tile = new Tile(this.grid, (tileInstance) => {
                if (tileInstance.isMountain()) {
                    if (this.energyManager.consume(2)) {
                        tileInstance.destroyMountain(4000, () => {
                            // eventualmente: callback o suono
                        });
                    } else {
                        alert("Energia insufficiente per rimuovere la montagna!");
                    }
                } else if (tileInstance.isReadyForReset()) {
                    tileInstance.reset();
                    this.collector.add(1); // raccolta completata
                    this.energyManager.restore(10); // aumenta di 10 l'energia
                } else {
                    tileInstance.setEvent(this.selectedEvent, () => {
                        // azione completata
                    });
                }
            }, type);
            this.tiles.push(tile);
        }
    }
}
