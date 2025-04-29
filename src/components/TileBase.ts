import {TileType} from "../types/RockEvents.ts";

export abstract class TileBase {
    protected element: HTMLDivElement;
    protected isAnimating = false;
    protected progressBar: HTMLDivElement;
    protected isCompleted = false;

    constructor(parent: Element,
                onClick: (tile: TileBase) => void,
                type: TileType) {
        this.element = document.createElement("div");
        this.element.classList.add("tile");

        this.progressBar = document.createElement("div");
        this.progressBar.className = "progress-bar";
        this.element.appendChild(this.progressBar);

        if (type === TileType.Mountain) {
            this.element.classList.add("mountain");
        }

        this.element.addEventListener("click", () => onClick(this));

        parent.appendChild(this.element);
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    reset() {
        this.isCompleted = false;
        this.isAnimating = true;
        this.element.style.backgroundColor = "#FF9933";
        this.progressBar.style.opacity = "0";
        this.progressBar.style.width = "0";
    }

    public isReadyForReset(): boolean {
        return this.isCompleted && !this.isAnimating;
    }
}