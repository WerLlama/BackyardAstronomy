// Scale factors
const SCALE_FACTOR = {
    INNER: 40,  // Keep inner planets scale the same
    OUTER: 15    // Reduced from 15 to make outer planets more visible at zoom 1.0
};
const SUN_SIZE = 15;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 8;

//constellation features
const CONSTELLATION_DISTANCE = 40; // Reduced from 35 to fit within view
const CONSTELLATION_SCALE = 15; // Reduced to match outer planet scale
const CONSTELLATION_COLOR = 'rgba(255, 255, 255, 0.4)';

// Add constellation data
const CONSTELLATIONS = [
    { name: '♈ Aries', angle: 0 },
    { name: '♉ Taurus', angle: 30 },
    { name: '♊ Gemini', angle: 60 },
    { name: '♋ Cancer', angle: 90 },
    { name: '♌ Leo', angle: 120 },
    { name: '♍ Virgo', angle: 150 },
    { name: '♎ Libra', angle: 180 },
    { name: '♏ Scorpius', angle: 210 },
    { name: '♐ Sagittarius', angle: 240 },
    { name: '♑ Capricornus', angle: 270 },
    { name: '♒ Aquarius', angle: 300 },
    { name: '♓ Pisces', angle: 330 }
];

// Time settings
const START_DATE = new Date('2024-11-30T00:00');
const DAYS_PER_STEP = 1;
const FPS = 60;  // Standard frame rate

// Speed settings
export const TIME_STEPS = [
    0.01,             // Very slow - 0.01 days per second
    0.1,              // Slow - 0.1 days per second
    1,                // 1 day per second
    7,                // 1 week per second
    30,               // 1 month per second
    365               // 1 year per second
];

export const SPEED_LABELS = [
    "0.01 days/sec",
    "0.1 days/sec",
    "1 day/sec",
    "1 week/sec",
    "1 month/sec",
    "1 year/sec"
];


// Visual settings
const SUN_COLOR = '#FFD700';
const ORBIT_COLOR = 'rgba(255, 255, 255, 0.2)';

// Default states
const DEFAULT_ZOOM_LEVEL = 1.0;
const DEFAULT_SPEED_MULTIPLIER = TIME_STEPS[0];

// Planet size multipliers
const PLANET_SIZES = {
    INNER: 5,    // Base size for inner planets
    OUTER: 10    // Base size for outer planets
};

// Define inner planets for scale factor selection
const INNER_PLANETS = ['Mercury', 'Venus', 'Earth', 'Mars'];

// Animation settings
const POSITION_TRANSITION_TIME = '0.1s';

// Debug settings
const DEBUG_ENABLED = true;
console.log('TIME_STEPS:', TIME_STEPS);
console.log('SPEED_LABELS:', SPEED_LABELS);

export {
    SCALE_FACTOR,
    SUN_SIZE,
    MIN_ZOOM,
    MAX_ZOOM,
    START_DATE,
    DAYS_PER_STEP,
    SUN_COLOR,
    ORBIT_COLOR,
    DEFAULT_ZOOM_LEVEL,
    DEFAULT_SPEED_MULTIPLIER,
    PLANET_SIZES,
    INNER_PLANETS,
    POSITION_TRANSITION_TIME,
    DEBUG_ENABLED,
    FPS,
    CONSTELLATION_DISTANCE,
    CONSTELLATION_SCALE,
    CONSTELLATION_COLOR,
    CONSTELLATIONS
};