import {CropEventType} from "../types/CropEvents.ts";
import {TileType} from "../types/RockEvents.ts";

export class Tile {
    private element: HTMLDivElement;
    private progressBar: HTMLDivElement;
    private isAnimating = false;
    private isCompleted = false;
    private eventType: CropEventType = CropEventType.None;

    private tileType: TileType = TileType.Normal;

    private durationMap: Record<CropEventType, number> = {
        [CropEventType.None]: 0,
        [CropEventType.Fire]: 3000,
        [CropEventType.Water]: 6000,
        [CropEventType.Grass]: 4500,
    };

    constructor(parent: Element, onClick: (tile: Tile) => void, type: TileType = TileType.Normal) {
        this.tileType = type;

        this.element = document.createElement("div");
        this.element.className = "tile";

        if (this.tileType === TileType.Mountain) {
            this.element.classList.add(TileType.Mountain);
        }

        this.progressBar = document.createElement("div");
        this.progressBar.className = "progress-bar";
        this.element.appendChild(this.progressBar);

        this.element.addEventListener("click", () => {
            if (!this.isAnimating) onClick(this);
        });

        parent.appendChild(this.element);
    }

    isMountain(): boolean {
        return this.tileType === TileType.Mountain;
    }

    destroyMountain(duration: number, onDestroy: () => void): void {
        if (this.tileType !== TileType.Mountain || this.isAnimating) return;

        this.isAnimating = true;
        this.progressBar.style.transition = `width ${duration}ms linear`;
        this.progressBar.style.width = "100%";
        this.progressBar.style.opacity = "1";

        setTimeout(() => {
            this.tileType === TileType.Normal;
            this.isAnimating = false;
            this.progressBar.style.width = "0";
            this.progressBar.style.opacity = "0";
            this.element.classList.remove(TileType.Mountain);
            this.element.style.backgroundColor = "#FF9933";
            onDestroy();
        }, duration);
    }

    setEvent(event: CropEventType, onFinish: () => void) {
        if (this.isAnimating || event === CropEventType.None || this.isCompleted || this.tileType !== TileType.Normal) return;

        this.eventType = event;
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

    reset() {
        this.eventType = CropEventType.None;
        this.isCompleted = false;
        this.element.style.backgroundColor = "#FF9933";
        this.progressBar.style.opacity = "0";
        this.progressBar.style.width = "0";
    }

    isReadyForReset(): boolean {
        return this.isCompleted && !this.isAnimating;
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
