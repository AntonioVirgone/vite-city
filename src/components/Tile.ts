import { EventType } from "../types/Events";

export class Tile {
    private element: HTMLDivElement;
    private progressBar: HTMLDivElement;
    private eventType = EventType.None;
    private isAnimating = false;
    private isCompleted = false;

    private durationMap: Record<EventType, number> = {
        [EventType.None]: 0,
        [EventType.Fire]: 3000,
        [EventType.Water]: 6000,
        [EventType.Grass]: 4500,
    };

    constructor(parent: Element, onClick: (tile: Tile) => void) {
        this.element = document.createElement("div");
        this.element.className = "tile";

        this.progressBar = document.createElement("div");
        this.progressBar.className = "progress-bar";
        this.element.appendChild(this.progressBar);

        this.element.addEventListener("click", () => {
            if (!this.isAnimating) onClick(this);
        });

        parent.appendChild(this.element);
    }

    setEvent(event: EventType, onFinish: () => void) {
        if (this.isAnimating || event === EventType.None || this.isCompleted) return;

        this.eventType = event;
        const duration = this.durationMap[event];
        const steps = this.getColorSteps(event);

        this.isAnimating = true;
        this.isCompleted = false;

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
        this.eventType = EventType.None;
        this.isCompleted = false;
        this.element.style.backgroundColor = "#FF9933";
        this.progressBar.style.opacity = "0";
        this.progressBar.style.width = "0";
    }

    isReadyForReset(): boolean {
        return !this.isAnimating && this.eventType !== EventType.None;
    }

    private getColorSteps(event: EventType): string[] {
        switch (event) {
            case EventType.Fire:
                return ["#ffaaaa", "#ff5555", "#cc0000"];
            case EventType.Water:
                return ["#aaddff", "#55ccff", "#0077cc"];
            case EventType.Grass:
                return ["#aaffaa", "#55dd55", "#228822"];
            default:
                return ["#FF9933", "#FF9933", "#FF9933"];
        }
    }
}
