// src/components/ConstellationRing.jsx
import React, { useState } from 'react';
import { messierObjects, objectSymbols, objectColors } from '../utils/messierData';
import { CONSTELLATION_DISTANCE, CONSTELLATION_SCALE } from '../utils/config';

const ConstellationRing = () => {
    // Add state for hover information
    const [hoveredObject, setHoveredObject] = useState(null);

    const createArcPath = (startAngle, endAngle, radius) => {
        // Convert angles to radians
        const start = -startAngle * Math.PI / 180;
        const end = -endAngle * Math.PI / 180;

        // Calculate start and end points
        const startX = centerPoint + radius * Math.cos(start);
        const startY = centerPoint + radius * Math.sin(start);
        const endX = centerPoint + radius * Math.cos(end);
        const endY = centerPoint + radius * Math.sin(end);

        // Create arc flag (0 for minor arc, 1 for major arc)
        const arcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

        // Create SVG path
        return `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 ${arcFlag} 1 ${endX} ${endY}
    L ${centerPoint} ${centerPoint}
    Z
  `;
    };

    const containerSize = 2000;
    const centerPoint = containerSize / 2;
    const radius = CONSTELLATION_DISTANCE * CONSTELLATION_SCALE;

   
    // Create constellation data with proper angles (counterclockwise from Aries)
    const constellations = [
        "Aries", "Taurus", "Gemini", "Cancer",
        "Leo", "Virgo", "Libra", "Scorpio",
        "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ].map((name, index) => {
        const startAngle = -index * 30; // Negative for counterclockwise motion
        const angle = startAngle * (Math.PI / 180);
        return {
            name,
            angle: startAngle,
            x: centerPoint + radius * Math.cos(angle),
            y: centerPoint + radius * Math.sin(angle),
            start: index * 30,
            end: (index + 1) * 30
        };
    });

    // Function to convert ecliptic coordinates to x,y position
    const getPositionFromEcliptic = (longitude, latitude) => {
        // Convert degrees to radians and negate for counterclockwise motion
        const lonRad = -longitude * (Math.PI / 180);
        const latRad = latitude * (Math.PI / 180);

        // Calculate position
        const latitudeScale = 0.5;
        const distanceFromCenter = radius * (1 - Math.abs(latitude) / 90 * latitudeScale);

        return {
            x: centerPoint + distanceFromCenter * Math.cos(lonRad),
            y: centerPoint + distanceFromCenter * Math.sin(lonRad)
        };
    };

    return (
        <svg
            width={containerSize}
            height={containerSize}
            className="absolute top-0 left-0"
            style={{ zIndex: 1 }}
        >
            {/* Main ecliptic circle */}
            <circle
                cx={centerPoint}
                cy={centerPoint}
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
            />

            {/* Latitude reference circles */}
            {[-60, -30, 30, 60].map(latitude => (
                <circle
                    key={`lat-${latitude}`}
                    cx={centerPoint}
                    cy={centerPoint}
                    r={radius * (1 - Math.abs(latitude) / 90 * 0.5)}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeDasharray="5,5"
                    strokeWidth="1"
                />
            ))}
            {/* Constellation segments */}
            {constellations.map((constellation, index) => {
                const colors = [
                    'rgba(255, 200, 200, 0.03)', // Reddish
                    'rgba(200, 255, 200, 0.03)', // Greenish
                    'rgba(200, 200, 255, 0.03)', // Bluish
                    'rgba(255, 255, 200, 0.03)', // Yellowish
                ];
                const color = colors[index % colors.length];

                return (
                    <path
                        key={`segment-${constellation.name}`}
                        d={createArcPath(index * 30, (index + 1) * 30, radius)}
                        fill={color}
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="1"
                    />
                );
            })}
            {/* Constellation labels */}
            {constellations.map((constellation) => {
                const angle = constellation.angle * (Math.PI / 180);
                const textRadius = radius + 20;
                const x = centerPoint + textRadius * Math.cos(angle);
                const y = centerPoint + textRadius * Math.sin(angle);

                // Add 90 to start Aries at vertical and rotate counterclockwise
                const textRotation = constellation.angle + 90;

                return (
                    <g key={constellation.name}>
                        <text
                            x={x}
                            y={y}
                            fill="rgba(255, 255, 255, 0.4)"
                            fontSize="20"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${textRotation},${x},${y})`}
                        >
                            {constellation.name}
                        </text>
                    </g>
                );
            })}


            {/* Messier Objects */}
            {Object.entries(messierObjects).map(([id, object]) => {
                const pos = getPositionFromEcliptic(object.longitude, object.latitude);
                const symbol = objectSymbols[object.type];
                const size = Math.max(16, 24 - object.magnitude * 1.5);

                return (
                    <g
                        key={id}
                        onMouseEnter={() => setHoveredObject({ id, ...object })}
                        onMouseLeave={() => setHoveredObject(null)}
                        style={{ cursor: 'pointer' }}
                    >
                        <text
                            x={pos.x}
                            y={pos.y}
                            fill={objectColors[object.type]}
                            fontSize={size}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="select-none"
                        >
                            {symbol}
                        </text>

                        <text
                            x={pos.x}
                            y={pos.y + size}
                            fill="rgba(255, 255, 255, 0.4)"
                            fontSize="12"
                            textAnchor="middle"
                            dominantBaseline="top"
                            className="select-none"
                        >
                            {id}
                        </text>

                        {/* Tooltip */}
                        {hoveredObject && hoveredObject.id === id && (
                            <g>
                                <rect
                                    x={pos.x + 15}
                                    y={pos.y - 40}
                                    width="160"
                                    height="90"  // Increased height to accommodate new line
                                    fill="rgba(0, 0, 0, 0.8)"
                                    rx="5"
                                />
                                <text
                                    x={pos.x + 25}
                                    y={pos.y - 20}
                                    fill="white"
                                    fontSize="14"
                                    textAnchor="start"
                                >
                                    {object.name}
                                </text>
                                <text
                                    x={pos.x + 25}
                                    y={pos.y}
                                    fill="rgba(255, 255, 255, 0.8)"
                                    fontSize="12"
                                    textAnchor="start"
                                >
                                    {object.type}
                                </text>
                                <text
                                    x={pos.x + 25}
                                    y={pos.y + 20}
                                    fill="rgba(255, 255, 255, 0.8)"
                                    fontSize="12"
                                    textAnchor="start"
                                >
                                    Magnitude: {object.magnitude}
                                </text>
                                <text
                                    x={pos.x + 25}
                                    y={pos.y + 40}
                                    fill="rgba(255, 255, 255, 0.8)"
                                    fontSize="12"
                                    textAnchor="start"
                                >
                                    {object.constellation}
                                </text>
                            </g>
                        )}
                    </g>
                );
            })}

            {/* Legend */}
            <g transform={`translate(${centerPoint - radius + 50}, ${centerPoint - radius + 50})`}>
                <rect
                    x="-10"
                    y="-10"
                    width="160"
                    height="180"
                    fill="rgba(0, 0, 0, 0.5)"
                    rx="5"
                />
                {Object.entries(objectSymbols).map(([type, symbol], index) => (
                    <g key={type} transform={`translate(0, ${index * 25})`}>
                        <text
                            x="0"
                            y="0"
                            fill={objectColors[type]}
                            fontSize="16"
                            textAnchor="start"
                            dominantBaseline="middle"
                        >
                            {symbol}
                        </text>
                        <text
                            x="30"
                            y="0"
                            fill="rgba(255, 255, 255, 0.4)"
                            fontSize="14"
                            textAnchor="start"
                            dominantBaseline="middle"
                        >
                            {type}
                        </text>
                    </g>
                ))}
            </g>
        </svg>
    );
};

export default ConstellationRing;