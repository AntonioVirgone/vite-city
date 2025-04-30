import { TileType } from "../types/RockEvents.ts";

export abstract class TileBase {
    protected element: HTMLDivElement;
    protected progressBar: HTMLDivElement;

    protected isAnimating = false;
    protected isCompleted = false;
    protected tileType: TileType;

    constructor(parent: Element, protected onClick: (tile: TileBase) => void, type: TileType) {
        this.tileType = type;

        this.element = document.createElement("div");
        this.element.className = "tile";

        this.progressBar = document.createElement("div");
        this.progressBar.className = "progress-bar";

        this.element.appendChild(this.progressBar);
        parent.appendChild(this.element);
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    public reset(): void {
        this.isCompleted = false;
        this.isAnimating = false;
        this.element.style.backgroundColor = "#FF9933";
        this.progressBar.style.transition = "none";
        this.progressBar.style.width = "0";
        this.progressBar.style.opacity = "0";
    }

    public isReadyForReset(): boolean {
        return this.isCompleted && !this.isAnimating;
    }
}
