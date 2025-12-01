import { EarthCell } from './classes/EarthCell.js';
import { WaterCell } from './classes/WaterCell.js';
import { SwampPlant } from './classes/SwampPlant.js';
import { PotatoPlant } from './classes/PotatoPlant.js';
import { CactusPlant } from './classes/CactusPlant.js';
import { updateMoistureForAllCells } from './utils/helpers.js';

class FarmSimulator {
    constructor() {
        this.gridSize = 10;
        this.cells = [];
        this.selectedTool = 'shovel';
        this.selectedSeed = '';
        this.init();
    }

    init() {
        this.createGrid();
        this.setupEventListeners();
        this.startGameLoop();
    }

    createGrid() {
        const grid = document.getElementById('game-grid');
        grid.innerHTML = '';

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                // Создаем только земляные клетки
                const cell = new EarthCell(x, y);
                
                this.cells.push(cell);
                grid.appendChild(cell.createElement());
            }
        }

        updateMoistureForAllCells(this.cells, this.gridSize);
    }

    setupEventListeners() {
        const grid = document.getElementById('game-grid');
        const tools = document.querySelectorAll('.tool[data-tool]');
        const seeds = document.getElementById('seeds');

        // Обработчики для инструментов
        tools.forEach(tool => {
            tool.addEventListener('click', (e) => {
                tools.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedTool = e.target.dataset.tool;
                this.selectedSeed = '';
                seeds.value = '';
            });
        });

        // Обработчик для семян
        seeds.addEventListener('change', (e) => {
            this.selectedSeed = e.target.value;
            this.selectedTool = 'seeds';
            tools.forEach(t => t.classList.remove('active'));
        });

        // Обработчик для клеток
        grid.addEventListener('click', (e) => {
            const cellElement = e.target.closest('.cell');
            if (!cellElement) return;

            const x = parseInt(cellElement.dataset.x);
            const y = parseInt(cellElement.dataset.y);
            const cell = this.cells.find(c => c.x === x && c.y === y);

            this.handleCellClick(cell);
        });
    }

    handleCellClick(cell) {
        const moistureDisplay = document.getElementById('cell-moisture');
        moistureDisplay.textContent = Math.round(cell.moisture);

        switch (this.selectedTool) {
            case 'shovel':
                this.useShovel(cell);
                break;
            case 'water':
                this.useWater(cell);
                break;
            case 'bucket':
                this.useBucket(cell);
                break;
            case 'seeds':
                this.plantSeed(cell);
                break;
        }

        updateMoistureForAllCells(this.cells, this.gridSize);
    }

    useShovel(cell) {
        if (cell.type === 'water') {
            // Превращаем воду в землю
            const index = this.cells.indexOf(cell);
            this.cells[index] = new EarthCell(cell.x, cell.y);
            this.updateCellElement(this.cells[index]);
        } else if (cell.plant) {
            // Убираем растение
            cell.removePlant();
        } else {
            // Копаем землю (ничего не делаем)
            console.log('Копаем землю...');
        }
    }

    useWater(cell) {
        if (cell.type === 'earth') {
            // Превращаем землю в воду
            const index = this.cells.indexOf(cell);
            this.cells[index] = new WaterCell(cell.x, cell.y);
            this.updateCellElement(this.cells[index]);
        }
    }

    useBucket(cell) {
        if (cell.type === 'water') {
            // Превращаем воду в землю
            const index = this.cells.indexOf(cell);
            this.cells[index] = new EarthCell(cell.x, cell.y);
            this.updateCellElement(this.cells[index]);
        }
    }

    plantSeed(cell) {
        if (cell.type !== 'earth' || cell.plant || !this.selectedSeed) {
            return;
        }

        let plant;
        switch (this.selectedSeed) {
            case 'swamp':
                plant = new SwampPlant();
                break;
            case 'potato':
                plant = new PotatoPlant();
                break;
            case 'cactus':
                plant = new CactusPlant();
                break;
            default:
                return;
        }

        cell.addPlant(plant);
    }

    updateCellElement(newCell) {
        const grid = document.getElementById('game-grid');
        const oldElement = grid.querySelector(`[data-x="${newCell.x}"][data-y="${newCell.y}"]`);
        if (oldElement) {
            oldElement.replaceWith(newCell.createElement());
        }
    }

    startGameLoop() {
        setInterval(() => {
            this.cells.forEach(cell => {
                if (cell.plant) {
                    cell.plant.grow();
                }
            });
        }, 1000);
    }
}

// Запуск симулятора
new FarmSimulator();