import {EventType} from "../types/Events";

export class Tile {
    element: HTMLDivElement;
    eventType: EventType = EventType.None;
    private isAnimating: boolean = false;
    private transitionDuration = 5000; // ms (puoi renderlo modificabile da fuori)

    constructor(parent: HTMLElement, onClick: (tile: Tile) => void) {
        this.element = document.createElement("div");
        this.element.className = "tile";
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
        this.startTransition(eventType);
    }

    private startTransition(eventType: EventType) {
        this.isAnimating = true;

        const colorSteps = this.getColorSteps(eventType);

        // STEP 1
        this.element.style.backgroundColor = colorSteps[0];

        setTimeout(() => {
            // STEP 2
            this.element.style.backgroundColor = colorSteps[1];
        }, this.transitionDuration / 3);

        setTimeout(() => {
            // STEP 3 (finale)
            this.element.style.backgroundColor = colorSteps[2];
            this.isAnimating = false;
        }, this.transitionDuration);
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
                return ["lightgray", "lightgray", "lightgray"];
        }
    }

    private reset() {
        this.eventType = EventType.None;
        this.element.style.backgroundColor = "lightgray";
    }

    // (Opzionale) Metodo per personalizzare la durata
    setTransitionDuration(ms: number) {
        this.transitionDuration = ms;
    }
}
