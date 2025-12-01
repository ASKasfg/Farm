import { Plant } from './Plant.js';

export class SwampPlant extends Plant {
    constructor() {
        super('swamp', 70, 100);
    }

    getEmoji() {
        return '🌿';
    }
}