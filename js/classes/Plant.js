export class Plant {
    constructor(type, minMoisture, maxMoisture) {
        this.type = type;
        this.minMoisture = minMoisture;
        this.maxMoisture = maxMoisture;
        this.growth = 1;
        this.isAlive = true;
        this.cell = null;
        this.element = null;
    }

    grow() {
        if (!this.isAlive) return;

        // Проверяем условия для роста
        if (this.cell.moisture >= this.minMoisture && 
            this.cell.moisture <= this.maxMoisture) {
            this.growth = Math.min(3, this.growth + 0.1);
        } else {
            // Растение погибает при неподходящей влажности
            this.isAlive = false;
            this.element.style.opacity = '0.3';
        }

        this.updateAppearance();
    }

    updateAppearance() {
        if (!this.cell || !this.cell.element) return;

        // Удаляем старое растение
        const oldPlant = this.cell.element.querySelector('.plant');
        if (oldPlant) {
            oldPlant.remove();
        }

        if (this.isAlive) {
            const plantElement = document.createElement('div');
            plantElement.className = `plant plant-growth-${Math.floor(this.growth)}`;
            plantElement.textContent = this.getEmoji();
            this.element = plantElement;
            this.cell.element.appendChild(plantElement);
        }
    }

    getEmoji() {
        // Будет переопределено в дочерних классах
        return '🌱';
    }
}