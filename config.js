// Scale factors
const SCALE_FACTOR = {
    INNER: 40,  // Higher scale for inner planets (Mercury to Mars)
    OUTER: 15   // Lower scale for outer planets (Jupiter to Neptune)
};
const SUN_SIZE = 20; // Slightly reduced sun size
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2;

// Time settings
const START_DATE = new Date('2024-11-30T00:00');
const DAYS_PER_STEP = 1;

// Visual settings
const SUN_COLOR = '#FFD700';
const ORBIT_COLOR = 'rgba(255, 255, 255, 0.2)';

// Default states
const DEFAULT_ZOOM_LEVEL = 0.4;
const DEFAULT_SPEED_MULTIPLIER = 1;

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
    DEBUG_ENABLED
};