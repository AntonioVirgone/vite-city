import {TileBase} from "./TileBase.ts";
import {TileType} from "../types/RockEvents.ts";

export class MountainTile extends TileBase {
    private tileType: TileType = TileType.Normal;

    constructor(parent: Element, onClick: (tile: MountainTile) => void, type: TileType = TileType.Normal) {
        super(parent, (tile) => onClick(tile as MountainTile), type);

        this.tileType = type;

        if (this.tileType === TileType.Mountain) {
            this.element.classList.add(TileType.Mountain);
        }

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
}