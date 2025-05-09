export class EnergyManager {
    private element: HTMLElement;
    private _energy: number;

    constructor(startingEnergy: number = 10) {
        this.element = document.getElementById("energy-count")!;
        this._energy = startingEnergy;
        this.updateDisplay();
    }

    // Azione consumo energia: per eliminare un ostacolo devo consumare n-energia
    consume(amount: number): boolean {
        if (this._energy >= amount) {
            this._energy -= amount;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    restore(amount: number) {
        this._energy += amount;
        this.updateDisplay();
    }

    get energy(): number {
        return this._energy;
    }

    private updateDisplay() {
        this.element.textContent = `${this._energy}`;
    }
}