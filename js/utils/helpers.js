export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function updateMoistureForAllCells(cells, gridSize) {
    const waterCells = cells.filter(cell => cell.type === 'water');
    
    cells.forEach(cell => {
        cell.calculateMoisture(waterCells, gridSize);
    });
}