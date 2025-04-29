import {EventType} from "../types/Events";

export class Tile {
    element: HTMLDivElement;
    eventType: EventType = EventType.None;
    private isAnimating: boolean = false;
    private durationMap: Record<EventType, number> = {
        [EventType.None]: 0,
        [EventType.Fire]: 3000,
        [EventType.Water]: 6000,
        [EventType.Grass]: 4500,
    };
    private progressBar: HTMLDivElement;

    constructor(parent: HTMLElement, onClick: (tile: Tile) => void) {
        this.element = document.createElement("div");
        this.element.className = "tile";

        // Progress bar
        this.progressBar = document.createElement("div");
        this.progressBar.className = "progress-bar";
        this.element.appendChild(this.progressBar);

        this.element.addEventListener("click", () => {
            if (this.isAnimating) return;

            // Se è già nello stato finale → reset
            if (this.eventType !== EventType.None) {
                this.reset();
            } else {
                onClick(this); // Avvia evento
            }
        });
        parent.appendChild(this.element);
    }

    setEvent(eventType: EventType) {
        this.eventType = eventType;
        const duration = this.durationMap[eventType];
        this.startTransition(eventType, duration);
    }

    private startTransition(eventType: EventType, duration: number) {
        this.isAnimating = true;

        const colorSteps = this.getColorSteps(eventType);

        // STEP 1
        this.element.style.backgroundColor = colorSteps[0];

        // Show progress bar
        this.progressBar.style.transition = `width ${duration}ms linear`;
        this.progressBar.style.width = "100%";
        this.progressBar.style.opacity = "1";

        // Mid step
        setTimeout(() => {
            this.element.style.backgroundColor = colorSteps[1];
        }, duration / 3);

        // Final step
        setTimeout(() => {
            this.element.style.backgroundColor = colorSteps[2];
            this.isAnimating = false;
            this.progressBar.style.opacity = "0";
            this.progressBar.style.transition = "none";
            this.progressBar.style.width = "0";
        }, duration);
    }

    private getColorSteps(eventType: EventType): string[] {
        switch (eventType) {
            case EventType.Fire:
                return ["#ffcccc", "#ff6666", "#cc0000"];
            case EventType.Water:
                return ["#cceeff", "#66ccff", "#0066cc"];
            case EventType.Grass:
                return ["#ccffcc", "#66cc66", "#006600"];
            default:
                return ["#FF9933", "#FF9933", "#FF9933"];
        }
    }

    private reset() {
        this.eventType = EventType.None;
        this.element.style.backgroundColor = "#FF9933";
    }
}
