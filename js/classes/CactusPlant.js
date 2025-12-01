import { Plant } from './Plant.js';

export class CactusPlant extends Plant {
    constructor() {
        super('cactus', 0, 30);
    }

    getEmoji() {
        return '🌵';
    }
}