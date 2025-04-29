// GameScreen.ts
import { Collector } from "../utils/Collector";
import { CropEventType } from "../types/CropEvents.ts";
import { EnergyManager } from "../utils/EnergyManager.ts";
import { TileType } from "../types/RockEvents.ts";
import { TileBase } from "../components/TileBase.ts";
import { HarvestableTile } from "../components/HarvestableTile.ts";
import { MountainTile } from "../components/MountainTile.ts";

export class GameScreen {
    private element = document.getElementById("game-screen")!;
    private grid = document.querySelector(".grid")!;
    private buttons = document.querySelectorAll("[data-event]");
    private selectedEvent: CropEventType = CropEventType.None;
    private collector = new Collector();
    private energyManager = new EnergyManager();

    private tiles: TileBase[] = [];

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
        const gridSize = 10;

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const type = Math.random() < 0.1 ? TileType.Mountain : TileType.Normal;

                let tile: TileBase;

                if (type === TileType.Mountain) {
                    tile = new MountainTile(this.grid, (tileInstance) => {
                        if (this.energyManager.consume(20)) {
                            tileInstance.destroyMountain(4000, () => {
                                // eventualmente: callback o suono
                            });
                        } else {
                            alert("Energia insufficiente per rimuovere la montagna!");
                        }
                    }, type);
                } else {
                    tile = new HarvestableTile(this.grid, (tileInstance) => {
                        if (tileInstance.isReadyForReset()) {
                            tileInstance.reset();
                            this.collector.add(1); // raccolta completata
                            this.energyManager.restore(10); // aumenta di 10 l'energia
                        } else {
                            tileInstance.setEvent(this.selectedEvent, () => {
                                // azione completata
                            });
                        }
                    }, type);
                }

                // Posiziona correttamente nella griglia
                const el = tile.getElement();
                el.style.gridColumnStart = (x + 1).toString();
                el.style.gridRowStart = (y + 1).toString();

                this.tiles.push(tile);
            }
        }
    }
}
