import React, { useEffect, useRef } from 'react';

const EnhancedEarthTiltView = ({ currentDate }) => {
    const earthRef = useRef(null);

    // Calculate Earth's tilt relative to the Sun based on the date
    const getDayOfYear = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    // Calculate the apparent tilt angle
    const calculateTiltAngle = (date) => {
        const dayOfYear = getDayOfYear(date);
        return -23.4 * Math.sin((dayOfYear - 80) * 2 * Math.PI / 365);
    };

    // Calculate Earth's rotation based on time of day
    const calculateDayRotation = (date) => {
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        return ((hours * 3600 + minutes * 60 + seconds) / 86400) * 360;
    };

    useEffect(() => {
        if (earthRef.current) {
            const dayRotation = calculateDayRotation(currentDate);
            earthRef.current.style.backgroundPosition = `${-dayRotation}px 0`;
        }
    }, [currentDate]);

    const tiltAngle = calculateTiltAngle(currentDate);

    const svgEarth = `
        <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
            <rect width='48' height='48' fill='#1E40AF'/>
            <path d='M0 20 L12 18 L20 25 L30 20 L40 22 L48 18 L48 30 L35 32 L25 28 L15 30 L0 28 Z' fill='#15803D'/>
            <path d='M0 0 L48 0 L48 10 L35 12 L25 8 L15 10 L0 8 Z' fill='#E5E7EB'/>
            <path d='M0 48 L48 48 L48 40 L35 38 L25 42 L15 38 L0 40 Z' fill='#E5E7EB'/>
        </svg>
    `;

    return (
        <div className="fixed bottom-4 right-4 w-80 h-60 bg-black bg-opacity-70 rounded-lg p-4 text-white">
            <h3 className="text-lg font-bold mb-2">Earth's Axial Tilt View</h3>
            <div className="relative h-40 flex items-center justify-center">
                {/* Sun (on the left) */}
                <div className="absolute left-5 w-10 h-10 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />

                {/* Light rays */}
                <div className="absolute left-14 w-20 h-px bg-yellow-400 opacity-30" />

                {/* Main container */}
                <div className="relative">
                    {/* Earth container */}
                    <div className="relative w-14 h-14">
                        {/* Terminator line (fixed vertical) */}
                        <div className="absolute left-1/2 -translate-x-1/2">
                            <div className="absolute w-px h-20 bg-white opacity-50 -top-3" />
                            <div className="absolute whitespace-nowrap text-xs text-white opacity-50 -top-6">
                                Terminator Line
                            </div>
                        </div>

                        {/* Earth texture with rotation */}
                        <div
                            className="absolute inset-0 rounded-full overflow-hidden"
                            style={{ transform: `rotate(${tiltAngle}deg)` }}
                        >
                            <div
                                ref={earthRef}
                                className="absolute inset-0 w-full h-full bg-repeat-x transition-transform duration-300"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgEarth)}")`,
                                    backgroundSize: 'auto 100%'
                                }}
                            />
                        </div>

                        {/* Night shading (fixed) */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-black opacity-30 rounded-r-full" />

                        {/* Rotated axis container */}
                        <div
                            className="absolute inset-0"
                            style={{ transform: `rotate(${tiltAngle}deg)` }}
                        >
                            {/* Axis line */}
                            <div
                                className="absolute w-px bg-white opacity-50"
                                style={{
                                    left: '50%',
                                    top: '-4px',
                                    height: '22px',
                                    transform: 'translateX(-50%)',
                                    transformOrigin: 'center center'
                                }}
                            />

                            {/* Axis label */}
                            <div
                                className="absolute whitespace-nowrap text-xs text-white opacity-50"
                                style={{
                                    left: '50%',
                                    top: '18px',
                                    transform: `translateX(-50%) rotate(${-tiltAngle}deg)`,
                                    transformOrigin: 'top center',
                                    zIndex: 10
                                }}
                            >
                                Axis of Rotation
                            </div>
                        </div>
                    </div>
                </div>

                {/* Annotation text */}
                <div className="absolute bottom-0 text-sm text-center w-full">
                    Tilt angle: {tiltAngle.toFixed(1)}°
                </div>
            </div>
        </div>
    );
};

export default EnhancedEarthTiltView;