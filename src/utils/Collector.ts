export class Collector {
    private count = 0;
    private counterEl = document.getElementById("collected-count")!;

    add(amount = 1) {
        this.count += amount;
        this.counterEl.textContent = this.count.toString();
    }

    reset() {
        this.count = 0;
        this.counterEl.textContent = "0";
    }
}
