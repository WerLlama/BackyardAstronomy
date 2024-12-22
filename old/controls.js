// Import configuration and core functionality
import {
    MIN_ZOOM,
    MAX_ZOOM,
    START_DATE,
    DAYS_PER_STEP
} from './config.js';

import {
    state,
    init,
    updatePlanetPositions,
    updateZoom
} from './core.js';

// Animation function
function animate() {
    if (state.isAnimating) {
        state.currentDate = new Date(state.currentDate.getTime() +
            DAYS_PER_STEP * state.speedMultiplier * 24 * 60 * 60 * 1000);
        updatePlanetPositions();
        state.animationFrameId = requestAnimationFrame(animate);
    }
}

// Initialize controls
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const dateInput = document.getElementById('dateInput');
const setDateBtn = document.getElementById('setDateBtn');
const zoomSlider = document.getElementById('zoomSlider');
const zoomValue = document.getElementById('zoomValue');

// Set initial control values
dateInput.value = START_DATE.toISOString().slice(0, 16);
zoomSlider.value = state.zoomLevel * 100;
zoomValue.textContent = `${state.zoomLevel.toFixed(1)}x`;

// Play/Pause button handler
pauseBtn.addEventListener('click', () => {
    state.isAnimating = !state.isAnimating;
    pauseBtn.textContent = state.isAnimating ? 'Pause' : 'Resume';
    if (state.isAnimating) {
        animate();
    } else {
        cancelAnimationFrame(state.animationFrameId);
    }
});

// Reset button handler
resetBtn.addEventListener('click', () => {
    state.currentDate = new Date(START_DATE);
    updatePlanetPositions();
});

// Speed slider handler
speedSlider.addEventListener('input', (e) => {
    state.speedMultiplier = e.target.value / 100;
    speedValue.textContent = `${state.speedMultiplier}x`;
});

// Date setter handler
setDateBtn.addEventListener('click', () => {
    const newDate = new Date(dateInput.value);
    if (!isNaN(newDate)) {
        state.currentDate = newDate;
        updatePlanetPositions();
    }
});

// Zoom slider handler
zoomSlider.addEventListener('input', (e) => {
    state.zoomLevel = e.target.value / 100;
    zoomValue.textContent = `${state.zoomLevel.toFixed(1)}x`;
    updateZoom();
});

// Mouse wheel zoom handler
document.getElementById('solar-system-container').addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = -Math.sign(e.deltaY) * 0.1;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, state.zoomLevel + delta));
    if (newZoom !== state.zoomLevel) {
        state.zoomLevel = newZoom;
        zoomSlider.value = state.zoomLevel * 100;
        zoomValue.textContent = `${state.zoomLevel.toFixed(1)}x`;
        updateZoom();
    }
});

// Window resize handler
window.addEventListener('resize', init);

// Initialize everything and start animation
init();
animate();
