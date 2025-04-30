import { TileBase } from "./TileBase.ts";
import { CropEventType } from "../types/CropEventType.ts";
import { TileType } from "../types/TileType.ts";

export class HarvestableTile extends TileBase {
    private durationMap: Record<CropEventType, number> = {
        [CropEventType.None]: 0,
        [CropEventType.Tomato]: 3000,
        [CropEventType.Potato]: 6000,
        [CropEventType.Grain]: 4500,
    };

    constructor(parent: Element, onClick: (tile: HarvestableTile) => void, type: TileType = TileType.Normal) {
        super(parent, (tile) => onClick(tile as HarvestableTile), type);

        this.element.addEventListener("click", () => {
            if (!this.isAnimating) {
                onClick(this);
            }
        });
    }

    public setEvent(event: CropEventType, onFinish: () => void) {
        if (this.isAnimating || this.isCompleted || event === CropEventType.None) return;

        this.isAnimating = true;
        this.isCompleted = false;

        const duration = this.durationMap[event];
        const steps = this.getColorSteps(event);

        this.element.style.backgroundColor = steps[0];
        this.progressBar.style.transition = `width ${duration}ms linear`;
        this.progressBar.style.width = "100%";
        this.progressBar.style.opacity = "1";

        setTimeout(() => this.element.style.backgroundColor = steps[1], duration / 3);
        setTimeout(() => this.element.style.backgroundColor = steps[2], (2 * duration) / 3);
        setTimeout(() => {
            this.progressBar.style.width = "0";
            this.progressBar.style.opacity = "0";
            this.isAnimating = false;
            this.isCompleted = true;
            onFinish();
        }, duration);
    }

    private getColorSteps(event: CropEventType): string[] {
        switch (event) {
            case CropEventType.Tomato:
                return ["#ffaaaa", "#ff5555", "#cc0000"];
            case CropEventType.Potato:
                return ["#dc4804", "#9f3504", "#531b01"];
            case CropEventType.Grain:
                return ["#F2E098", "#F2D45B", "#F0CB35"];
            default:
                return ["#AB631B", "#AB631B", "#AB631B"];
        }
    }
}
