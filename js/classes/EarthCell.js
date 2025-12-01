import { Cell } from './Cell.js';

export class EarthCell extends Cell {
    constructor(x, y) {
        super('earth', x, y);
        this.moisture = 10;
    }
}