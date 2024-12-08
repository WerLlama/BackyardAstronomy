// Import configuration and planet data
import {
    SCALE_FACTOR,
    SUN_SIZE,
    SUN_COLOR,
    DEFAULT_ZOOM_LEVEL,
    START_DATE,
    DEBUG_ENABLED,
    INNER_PLANETS
} from './config.js';

import {
    planetData,
    getPlanetList,
    getMaxOrbitDistance
} from './planetData.js';

// State management
const state = {
    centerX: 0,
    centerY: 0,
    isAnimating: true,
    animationFrameId: null,
    speedMultiplier: 1,
    zoomLevel: DEFAULT_ZOOM_LEVEL,
    currentDate: new Date(START_DATE)
};

// Utility functions
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function updateDateDisplay() {
    document.getElementById('currentDate').textContent =
        `Current Date: ${state.currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })}`;
    document.getElementById('dateInput').value = state.currentDate.toISOString().slice(0, 16);
}

function updateDebugInfo() {
    if (!DEBUG_ENABLED) return;

    const debug = document.getElementById('debug');
    let debugText = 'Planet Positions:\n\n';
    Object.entries(planetData).forEach(([name, data]) => {
        const daysSinceStart = (state.currentDate - START_DATE) / (1000 * 60 * 60 * 24);
        const orbitProgress = (daysSinceStart / data.periodDays) * 360;
        const currentAngle = (data.horizonsData.longitude + orbitProgress) % 360;
        debugText += `${name}:\n`;
        debugText += `  Base Longitude: ${data.horizonsData.longitude.toFixed(2)}°\n`;
        debugText += `  Current Angle: ${currentAngle.toFixed(2)}°\n`;
        debugText += `  Distance: ${data.horizonsData.distance.toFixed(3)} AU\n\n`;
    });
    debug.textContent = debugText;
}

function updateZoom() {
    const solarSystem = document.getElementById('solar-system');
    solarSystem.style.transform = `translate(-50%, -50%) scale(${state.zoomLevel})`;
}

function createSun(solarSystem) {
    const sun = document.createElement('div');
    sun.className = 'celestial-body';
    sun.style.width = `${SUN_SIZE}px`;
    sun.style.height = `${SUN_SIZE}px`;
    sun.style.backgroundColor = SUN_COLOR;
    sun.style.left = `${state.centerX}px`;
    sun.style.top = `${state.centerY}px`;
    sun.style.zIndex = '1000';

    const sunLabel = document.createElement('div');
    sunLabel.className = 'planet-label';
    sunLabel.textContent = 'Sun';
    sun.appendChild(sunLabel);
    solarSystem.appendChild(sun);
}

function createPlanet(name, data, solarSystem) {
    // Create orbit
    const orbit = document.createElement('div');
    orbit.className = 'orbit';
    // Use different scale factors for inner and outer planets
    const scaleFactor = INNER_PLANETS.includes(name) ? SCALE_FACTOR.INNER : SCALE_FACTOR.OUTER;
    const orbitSize = data.horizonsData.distance * scaleFactor * 2;
    orbit.style.width = `${orbitSize}px`;
    orbit.style.height = `${orbitSize}px`;
    solarSystem.appendChild(orbit);

    // Create planet
    const planet = document.createElement('div');
    planet.className = 'celestial-body';
    planet.id = `planet-${name}`;
    planet.style.width = `${data.size}px`;
    planet.style.height = `${data.size}px`;
    planet.style.backgroundColor = data.color;

    const label = document.createElement('div');
    label.className = 'planet-label';
    label.textContent = name;
    planet.appendChild(label);
    solarSystem.appendChild(planet);
}

function updatePlanetPositions() {
    Object.entries(planetData).forEach(([name, data]) => {
        const planet = document.getElementById(`planet-${name}`);
        const daysSinceStart = (state.currentDate - START_DATE) / (1000 * 60 * 60 * 24);
        const orbitProgress = (daysSinceStart / data.periodDays) * 360;
        const currentAngle = toRadians(data.horizonsData.longitude + orbitProgress);
        // Use different scale factors for inner and outer planets
        const scaleFactor = INNER_PLANETS.includes(name) ? SCALE_FACTOR.INNER : SCALE_FACTOR.OUTER;
        const distance = data.horizonsData.distance * scaleFactor;

        const x = state.centerX + Math.cos(currentAngle) * distance;
        const y = state.centerY - Math.sin(currentAngle) * distance;

        planet.style.left = `${x}px`;
        planet.style.top = `${y}px`;
    });

    updateDebugInfo();
    updateDateDisplay();
}

function init() {
    const solarSystem = document.getElementById('solar-system');

    // Calculate system size using both scale factors
    const maxOuterDistance = Math.max(...Object.entries(planetData)
        .filter(([name]) => !INNER_PLANETS.includes(name))
        .map(([_, data]) => data.horizonsData.distance)) * SCALE_FACTOR.OUTER;

    const systemSize = maxOuterDistance * 2.2; // Added padding

    // Set the solar system size
    solarSystem.style.width = `${systemSize}px`;
    solarSystem.style.height = `${systemSize}px`;

    // Calculate center based on the system size
    state.centerX = systemSize / 2;
    state.centerY = systemSize / 2;

    solarSystem.innerHTML = '';

    // Create sun and planets
    createSun(solarSystem);
    Object.entries(planetData).forEach(([name, data]) => {
        createPlanet(name, data, solarSystem);
    });

    updateZoom();
    updatePlanetPositions();
}

// Export functions and state
export {
    state,
    init,
    updatePlanetPositions,
    updateZoom,
    toRadians
};