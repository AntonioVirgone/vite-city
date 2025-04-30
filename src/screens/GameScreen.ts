import {CropEventType} from "../types/CropEventType.ts";
import {Collector} from "../utils/Collector.ts";
import {EnergyManager} from "../utils/EnergyManager.ts";
import {TileBase} from "../components/TileBase.ts";
import {TileType} from "../types/TileType.ts";
import {MountainTile} from "../components/MountainTile.ts";
import {HarvestableTile} from "../components/HarvestableTile.ts";
import {HouseEventType} from "../types/HouseEventType.ts";
import {HouseTile} from "../components/HouseTile.ts";

export class GameScreen {
    private element = document.getElementById("game-screen")!;
    private grid = document.querySelector(".grid")!;
    private cropButtons = document.querySelectorAll("[data-event]");
    private buildingButtons = document.querySelectorAll("[data-building]");

    private selectedEvent: CropEventType = CropEventType.None;
    private collector = new Collector();
    private energyManager = new EnergyManager();

    private tiles: TileBase[] = [];

    private selectedBuilding: HouseEventType = HouseEventType.None;

    constructor() {
        this.cropButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const crop = (btn as HTMLElement).dataset.event as CropEventType;
                this.selectedEvent = crop || CropEventType.None;
                this.selectedBuilding = HouseEventType.None;
            });
        });

        this.buildingButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const building = (btn as HTMLElement).dataset.building as HouseEventType;
                this.selectedBuilding = building || HouseEventType.None;
                this.selectedEvent = CropEventType.None;
            });
        });

        this.createGrid();
    }

    public show(): void {
        this.element.style.display = "flex";
    }

    private createGrid(): void {
        const gridSize = 10;

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const type = Math.random() < 0.1 ? TileType.Mountain : TileType.Normal;

                let tile: TileBase;

                if (this.selectedBuilding === HouseEventType.Base) {
                    tile = new HouseTile(this.grid, () => {
                        // Clic sulla casa, se servisse
                    });
                    this.selectedBuilding = HouseEventType.None; // reset dopo uso
                } else if (type === TileType.Mountain) {
                    tile = new MountainTile(this.grid, (tileInstance) => {
                        if (this.energyManager.consume(20)) {
                            tileInstance.destroyMountain(4000, () => {});
                        } else {
                            alert("Energia insufficiente per rimuovere la montagna!");
                        }
                    });
                } else {
                    tile = new HarvestableTile(this.grid, (tileInstance) => {
                        if (tileInstance.isReadyForReset()) {
                            tileInstance.reset();
                            this.collector.add(1);
                            this.energyManager.restore(10);
                            return;
                        }

                        if (this.selectedEvent !== CropEventType.None) {
                            tileInstance.setEvent(this.selectedEvent, () => {});
                        }
                    });
                }

                const el = tile.getElement();
                el.style.gridColumnStart = (x + 1).toString();
                el.style.gridRowStart = (y + 1).toString();

                this.tiles.push(tile);
            }
        }
    }
}
