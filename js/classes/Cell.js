export class Cell {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.moisture = 0;
        this.plant = null;
        this.element = null;
    }

    createElement() {
        const cell = document.createElement('div');
        cell.className = `cell ${this.type}`;
        cell.dataset.x = this.x;
        cell.dataset.y = this.y;
        this.element = cell;
        this.updateAppearance();
        return cell;
    }

    updateAppearance() {
        if (!this.element) return;

        if (this.type === 'earth') {
            const intensity = Math.min(100, Math.max(0, this.moisture));
            const red = 240 - Math.floor(intensity * 1.2);
            const green = 220 - Math.floor(intensity * 1.5);
            const blue = 60 - Math.floor(intensity * 0.4);
            this.element.style.background = `rgb(${red}, ${green}, ${blue})`;
        }

        // Обновляем отображение растения
        if (this.plant) {
            this.plant.updateAppearance();
        }
    }

    setMoisture(value) {
        this.moisture = Math.max(0, Math.min(100, value));
        this.updateAppearance();
    }

    addPlant(plant) {
        this.plant = plant;
        plant.cell = this;
        this.updateAppearance();
    }

    removePlant() {
        if (this.element) {
        const plantElement = this.element.querySelector('.plant');
            if (plantElement) {
                plantElement.remove();
            }
        }
        this.plant = null;
        this.updateAppearance();
    }

    calculateMoisture(waterCells, gridSize) {
        if (this.type === 'water') {
            this.setMoisture(100);
            return;
        }

        let totalMoisture = 0;
        let waterCount = 0;

        waterCells.forEach(waterCell => {
            const distance = Math.sqrt(
                Math.pow(this.x - waterCell.x, 2) + Math.pow(this.y - waterCell.y, 2)
            );
            if (distance <= 3) {
                const moisture = Math.max(0, 100 - (distance * 25));
                totalMoisture += moisture;
                waterCount++;
            }
        });

        const averageMoisture = waterCount > 0 ? totalMoisture / waterCount : 0;
        this.setMoisture(averageMoisture);
    }
}