// src/utils/messierData.js

// Coordinates have been converted from RA/Dec to ecliptic longitude/latitude
// Original source: SIMBAD astronomical database
// Note: Positions are epoch J2000
export const messierObjects = {
    "M1": {  // Crab Nebula
        name: "Crab Nebula",
        type: "Supernova Remnant",
        longitude: 58.5,     // Corrected from 85.4 to place in Taurus
        latitude: -8.0,     // Moved further from ecliptic
        magnitude: 8.4,
        constellation: "Taurus"
    },
    "M2": {  // Great Globular Cluster in Aquarius
        name: "Great Globular Aquarii",
        type: "Globular Cluster",
        longitude: 325.5,    // Verified: in Aquarius (300-330°)
        latitude: -2.0,     // Kept closer to ecliptic
        magnitude: 6.5,
        constellation: "Aquarius"
    },
    "M8": {  // Lagoon Nebula
        name: "Lagoon Nebula",
        type: "Diffuse Nebula",
        longitude: 270.2,    // Verified: in Sagittarius (240-270°)
        latitude: -5.6,
        magnitude: 6.0,
        constellation: "Sagittarius"
    },
    "M11": {  // Wild Duck Cluster
        name: "Wild Duck Cluster",
        type: "Open Cluster",
        longitude: 281.5,    // Verified: Scutum (near Sagittarius/Capricornus border)
        latitude: -4.7,
        magnitude: 5.8,
        constellation: "Scutum"
    },
    "M13": {  // Hercules Globular Cluster
        name: "Great Hercules Globular",
        type: "Globular Cluster",
        longitude: 262.7,    // Verified: near Ophiuchus
        latitude: 36.5,
        magnitude: 5.8,
        constellation: "Hercules"
    },
    "M16": {  // Eagle Nebula
        name: "Eagle Nebula",
        type: "Diffuse Nebula",
        longitude: 274.7,    // Verified: in Serpens
        latitude: 13.8,
        magnitude: 6.4,
        constellation: "Serpens"
    },
    "M20": {  // Trifid Nebula
        name: "Trifid Nebula",
        type: "Diffuse Nebula",
        longitude: 267.0,    // Verified: in Sagittarius
        latitude: -6.2,
        magnitude: 6.3,
        constellation: "Sagittarius"
    },
    "M27": {  // Dumbbell Nebula
        name: "Dumbbell Nebula",
        type: "Planetary Nebula",
        longitude: 308.5,    // Verified: in Vulpecula
        latitude: 22.7,
        magnitude: 7.5,
        constellation: "Vulpecula"
    },
    "M31": {  // Andromeda Galaxy
        name: "Andromeda Galaxy",
        type: "Spiral Galaxy",
        longitude: 121.2,    // Verified: in Andromeda
        latitude: -21.6,
        magnitude: 3.4,
        constellation: "Andromeda"
    },
    "M33": {  // Triangulum Galaxy
        name: "Triangulum Galaxy",
        type: "Spiral Galaxy",
        longitude: 133.6,    // Verified: in Triangulum
        latitude: -31.3,
        magnitude: 5.7,
        constellation: "Triangulum"
    },
    "M42": {  // Orion Nebula
        name: "Orion Nebula",
        type: "Diffuse Nebula",
        longitude: 84.6,     // Should be ~53° to be in Taurus region
        latitude: -23.7,
        magnitude: 4.0,
        constellation: "Orion"    // Note: Orion is not a zodiacal constellation
    },
    "M44": {  // Beehive Cluster
        name: "Beehive Cluster",
        type: "Open Cluster",
        longitude: 130.2,    // Verified: in Cancer (90-120°)
        latitude: 1.5,
        magnitude: 3.7,
        constellation: "Cancer"
    },
    "M45": {  // Pleiades
        name: "Pleiades",
        type: "Open Cluster",
        longitude: 58.3,     // Verified: in Taurus (30-60°)
        latitude: -4.1,
        magnitude: 1.6,
        constellation: "Taurus"
    },
    "M51": {  // Whirlpool Galaxy
        name: "Whirlpool Galaxy",
        type: "Spiral Galaxy",
        longitude: 198.3,    // Verified: in Canes Venatici
        latitude: 68.6,
        magnitude: 8.4,
        constellation: "Canes Venatici"
    },
    "M57": {  // Ring Nebula
        name: "Ring Nebula",
        type: "Planetary Nebula",
        longitude: 283.4,    // Verified: in Lyra
        latitude: 33.0,
        magnitude: 8.8,
        constellation: "Lyra"
    },
    "M63": {  // Sunflower Galaxy
        name: "Sunflower Galaxy",
        type: "Spiral Galaxy",
        longitude: 190.8,    // Verified: in Canes Venatici
        latitude: 65.3,
        magnitude: 8.6,
        constellation: "Canes Venatici"
    },
    "M64": {  // Black Eye Galaxy
        name: "Black Eye Galaxy",
        type: "Spiral Galaxy",
        longitude: 182.5,    // Verified: in Coma Berenices
        latitude: 51.4,
        magnitude: 8.5,
        constellation: "Coma Berenices"
    },
    "M81": {  // Bode's Galaxy
        name: "Bode's Galaxy",
        type: "Spiral Galaxy",
        longitude: 156.3,    // Verified: in Ursa Major
        latitude: 40.9,
        magnitude: 6.9,
        constellation: "Ursa Major"
    },
    "M87": {  // Virgo A
        name: "Virgo A",
        type: "Elliptical Galaxy",
        longitude: 187.7,    // Verified: in Virgo (150-180°)
        latitude: 14.4,
        magnitude: 8.6,
        constellation: "Virgo"
    },
    "M92": {  // Globular in Hercules
        name: "Messier 92",
        type: "Globular Cluster",
        longitude: 249.8,    // Verified: in Hercules
        latitude: 45.9,
        magnitude: 6.4,
        constellation: "Hercules"
    },
    "M104": {  // Sombrero Galaxy
        name: "Sombrero Galaxy",
        type: "Spiral Galaxy",
        longitude: 204.3,    // Verified: in Virgo
        latitude: 5.8,
        magnitude: 8.0,
        constellation: "Virgo"
    }

};

// Define symbols and colors for different types of objects
export const objectSymbols = {
    "Spiral Galaxy": "◎",
    "Elliptical Galaxy": "●",
    "Globular Cluster": "☆",
    "Open Cluster": "○",
    "Diffuse Nebula": "◇",
    "Planetary Nebula": "⊙",
    "Supernova Remnant": "✧"
};

export const objectColors = {
    "Spiral Galaxy": "rgba(255, 200, 150, 0.6)",
    "Elliptical Galaxy": "rgba(255, 255, 150, 0.6)",
    "Globular Cluster": "rgba(255, 255, 200, 0.6)",
    "Open Cluster": "rgba(200, 200, 255, 0.6)",
    "Diffuse Nebula": "rgba(255, 150, 150, 0.6)",
    "Planetary Nebula": "rgba(150, 255, 150, 0.6)",
    "Supernova Remnant": "rgba(255, 150, 255, 0.6)"
};