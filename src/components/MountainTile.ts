import { TileBase } from "./TileBase.ts";
import { TileType } from "../types/TileType.ts";

export class MountainTile extends TileBase {
    constructor(parent: Element, onClick: (tile: MountainTile) => void, type: TileType = TileType.Mountain) {
        super(parent, (tile) => onClick(tile as MountainTile), type);

        this.element.classList.add("mountain");

        this.element.addEventListener("click", () => {
            if (!this.isAnimating) {
                onClick(this);
            }
        });
    }

    public destroyMountain(duration: number, onDestroy: () => void): void {
        if (this.tileType !== TileType.Mountain || this.isAnimating) return;

        this.isAnimating = true;
        this.progressBar.style.transition = `width ${duration}ms linear`;
        this.progressBar.style.width = "100%";
        this.progressBar.style.opacity = "1";

        setTimeout(() => {
            this.tileType = TileType.Normal;
            this.isAnimating = false;
            this.progressBar.style.width = "0";
            this.progressBar.style.opacity = "0";
            this.element.classList.remove("mountain");
            this.element.style.backgroundColor = "#FF9933";
            onDestroy();
        }, duration);
    }
}
