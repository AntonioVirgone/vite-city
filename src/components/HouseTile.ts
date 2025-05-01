import {TileBase} from "./TileBase.ts";
import {TileType} from "../types/TileType.ts";

export class HouseTile extends TileBase {
    private intervalId?: number;

    constructor(parent: Element, onClick: (tile: HouseTile) => void, type: TileType = TileType.House) {
        super(parent, (tile) => onClick(tile as HouseTile), type);

        this.element.classList.add("house-tile");
        this.element.style.backgroundColor = "#6ac13f"; // colore casa
        this.startProduction();

        this.element.addEventListener("click", () => {
            if (!this.isAnimating) {
                onClick(this);
            }
        });

        parent.appendChild(this.element);
    }

    private startProduction() {
        console.log("Starting production");
        this.intervalId = window.setInterval(() => {
            console.log("Produzione cittadino");
            // Puoi integrarlo con un gestore della popolazione
        }, 5000); // ogni 5 secondi produce un cittadino
    }

    public destroy(): void {
        if (this.intervalId) clearInterval(this.intervalId);
        this.element.remove();
    }

    /*
    private getColorSteps(event: HouseEventType): string[] {
        switch (event) {
            case HouseEventType.Base:
                return ["#4dd1d6", "#318387", "#1a4547"];
            case HouseEventType.Middle:
                return ["#6ac13f", "#457e28", "#244214"];
            case HouseEventType.Big:
                return ["#b93ad5", "#732385", "#3c1145"];
            default:
                return ["#AB631B", "#AB631B", "#AB631B"];
        }
    }
     */
}