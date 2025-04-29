import {EventType} from "../types/Events";

export class Tile {
    element: HTMLDivElement;
    eventType: EventType = EventType.None;

    constructor(parent: HTMLElement, onClick: (tile: Tile) => void) {
        this.element = document.createElement("div");
        this.element.className = "tile";
        this.element.addEventListener("click", () => onClick(this));
        parent.appendChild(this.element);
    }

    setEvent(eventType: EventType) {
        this.eventType = eventType;
        this.updateColor();
    }

    private updateColor() {
        switch (this.eventType) {
            case EventType.Fire:
                this.element.style.backgroundColor = "red";
                break;
            case EventType.Water:
                this.element.style.backgroundColor = "blue";
                break;
            case EventType.Grass:
                this.element.style.backgroundColor = "green";
                break;
            default:
                this.element.style.backgroundColor = "lightgray";
        }
    }
}
