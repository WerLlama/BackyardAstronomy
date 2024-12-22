// Import configuration
import { PLANET_SIZES } from './config.js';

// Planet data from HORIZONS for 2024-Nov-30
const planetData = {
    Mercury: {
        horizonsData: {
            longitude: 36.8688835,
            latitude: -1.3946813,
            distance: 0.320733481
        },
        color: '#A0522D',
        size: PLANET_SIZES.INNER,
        speed: 4.74,
        periodDays: 87.97
    },
    Venus: {
        horizonsData: {
            longitude: 0.0077432,
            latitude: -3.3022499,
            distance: 0.726560253
        },
        color: '#DEB887',
        size: PLANET_SIZES.INNER,
        speed: 3.50,
        periodDays: 224.70
    },
    Earth: {
        horizonsData: {
            longitude: 67.918741,
            latitude: -0.0029907,
            distance: 0.986275625
        },
        color: '#4169E1',
        size: PLANET_SIZES.INNER,
        speed: 2.98,
        periodDays: 365.26
    },
    Mars: {
        horizonsData: {
            longitude: 93.6589564,
            latitude: 1.2876501,
            distance: 1.578479974
        },
        color: '#CD5C5C',
        size: PLANET_SIZES.INNER,
        speed: 2.41,
        periodDays: 686.98
    },
    Jupiter: {
        horizonsData: {
            longitude: 75.24618,
            latitude: -0.5571953,
            distance: 5.072198657
        },
        color: '#DAA520',
        size: PLANET_SIZES.OUTER,
        speed: 1.31,
        periodDays: 4332.59
    },
    Saturn: {
        horizonsData: {
            longitude: 348.383957,
            latitude: -2.0322473,
            distance: 9.640104845
        },
        color: '#F4A460',
        size: PLANET_SIZES.OUTER,
        speed: 0.97,
        periodDays: 10759.22
    },
    Uranus: {
        horizonsData: {
            longitude: 55.0348931,
            latitude: -0.2513567,
            distance: 19.55868164
        },
        color: '#87CEEB',
        size: PLANET_SIZES.OUTER,
        speed: 0.68,
        periodDays: 30688.5
    },
    Neptune: {
        horizonsData: {
            longitude: 358.5891503,
            latitude: -1.2906704,
            distance: 29.89513546
        },
        color: '#1E90FF',
        size: PLANET_SIZES.OUTER,
        speed: 0.54,
        periodDays: 60182
    }
};

// Helper functions for planet data
function getPlanetList() {
    return Object.keys(planetData);
}

const satelliteData = {
    Moon: {
        parent: 'Earth',
        horizonsData: {
            longitude: 233.5762957,
            latitude: -3.8305829,
            distance: 0.0026408907
        },
        color: '#CCCCCC',
        size: PLANET_SIZES.INNER * 0.27,
        periodDays: 27.32166,
        scale: 0.15  // Much smaller scale factor
    }
};



function getMaxOrbitDistance() {
    return Math.max(...Object.values(planetData)
        .map(data => data.horizonsData.distance));
}

function getMinOrbitDistance() {
    return Math.min(...Object.values(planetData)
        .map(data => data.horizonsData.distance));
}

// Export the data and helper functions
export {
    planetData,
    satelliteData,
    getPlanetList,
    getMaxOrbitDistance,
    getMinOrbitDistance
};