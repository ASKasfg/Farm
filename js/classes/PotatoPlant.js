import { Plant } from './Plant.js';

export class PotatoPlant extends Plant {
    constructor() {
        super('potato', 40, 80); 
    }

    getEmoji() {
        return '🥔';
    }
}