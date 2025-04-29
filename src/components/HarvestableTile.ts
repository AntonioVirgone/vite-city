import {TileBase} from "./TileBase.ts";
import {TileType} from "../types/RockEvents.ts";
import {CropEventType} from "../types/CropEvents.ts";

export class HarvestableTile extends TileBase {
    private tileType: TileType = TileType.Normal;

    private durationMap: Record<CropEventType, number> = {
        [CropEventType.None]: 0,
        [CropEventType.Fire]: 3000,
        [CropEventType.Water]: 6000,
        [CropEventType.Grass]: 4500,
    };

    constructor(parent: Element, onClick: (tile: HarvestableTile) => void, type: TileType = TileType.Normal) {
        super(parent, (tile) => onClick(tile as HarvestableTile), type);

        this.tileType = type;

        this.element.addEventListener("click", () => {
            console.log("Clicked tile. isAnimating:", this.isAnimating, "isCompleted:", this.isCompleted);
            if (!this.isAnimating) onClick(this);
        });

        parent.appendChild(this.element);
    }

    setEvent(event: CropEventType, onFinish: () => void) {
        if (this.isAnimating || event === CropEventType.None || this.isCompleted || this.tileType !== TileType.Normal) return;

        this.isAnimating = true;
        this.isCompleted = false;

        const steps = this.getColorSteps(event);
        const duration = this.durationMap[event];

        this.element.style.backgroundColor = steps[0];
        this.progressBar.style.transition = `width ${duration}ms linear`;
        this.progressBar.style.width = "100%";
        this.progressBar.style.opacity = "1";

        setTimeout(() => {
            this.element.style.backgroundColor = steps[1];
        }, duration / 3);

        setTimeout(() => {
            this.element.style.backgroundColor = steps[2];
            this.progressBar.style.opacity = "0";
            this.progressBar.style.width = "0";
            this.isAnimating = false;
            this.isCompleted = true;
            onFinish();
        }, duration);
    }

    private getColorSteps(event: CropEventType): string[] {
        switch (event) {
            case CropEventType.Fire:
                return ["#ffaaaa", "#ff5555", "#cc0000"];
            case CropEventType.Water:
                return ["#aaddff", "#55ccff", "#0077cc"];
            case CropEventType.Grass:
                return ["#aaffaa", "#55dd55", "#228822"];
            default:
                return ["#FF9933", "#FF9933", "#FF9933"];
        }
    }
}