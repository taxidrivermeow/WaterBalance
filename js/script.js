const waterVolumeInput = document.getElementById('waterVolume');
const waterNormDiv = document.getElementById('waterNorm');
const percentsDiv = document.getElementById('percents');
const dailyNormDiv = document.getElementById('dailyNorm');
const DAILY_NORM = 2000;

const storageItems = localStorage.getItem("storageData");
const waterVolume = (JSON.parse(storageItems)) ? JSON.parse(storageItems) : [];
calculatePercent();

function isNumber(x) {
    if ((x === "") || (isNaN(+x))) {
        return false;
    } else {
        return true;
    }
}

function calculatePercent() {
    let sum = 0;
    for (const value of waterVolume) {
        sum += value;
    }
    const percentWater = sum * 100 / DAILY_NORM;
    render(percentWater);
}

function render(percentWater) {
    dailyNormDiv.textContent = `Daily norm: ${DAILY_NORM} ml`;
    percentsDiv.innerHTML = `${percentWater}%`;
    waterNormDiv.innerHTML =
        `<div class="waterValue" style='height: ${percentWater}%'></div>`;
}

function addWater() {
    if (isNumber(waterVolumeInput.value)) {
        waterVolume.push(+waterVolumeInput.value);
    } else {
        alert('NaN');
    }
    calculatePercent();
    localStorage.setItem("storageData", JSON.stringify(waterVolume));
}

function resetStorage() {
    waterVolume.length = 0;
    localStorage.setItem("storageData", '[]');
    calculatePercent();
}