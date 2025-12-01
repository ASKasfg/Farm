import { Cell } from './Cell.js';

export class WaterCell extends Cell {
    constructor(x, y) {
        super('water', x, y);
        this.moisture = 100;
    }

    updateAppearance() {
        if (this.element) {
            this.element.style.background = 'linear-gradient(45deg, #4169E1, #87CEEB)';
            this.element.textContent = '💧';
        }
    }
}