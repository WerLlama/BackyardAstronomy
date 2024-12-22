import React, { useState, useEffect, useRef } from 'react';
import { SCALE_FACTOR, SUN_SIZE, START_DATE, TIME_STEPS, MIN_ZOOM, MAX_ZOOM } from '../utils/config';
import { planetData } from '../utils/planetData';
import Controls from './Controls';
import EarthTiltView from './EarthTiltView';
import ConstellationRing from './ConstellationRing';

const SolarSystem = () => {
    const [currentDate, setCurrentDate] = useState(new Date(START_DATE));
    const [isAnimating, setIsAnimating] = useState(true);
    const [speedMultiplier, setSpeedMultiplier] = useState(TIME_STEPS[0]);
    const [zoomLevel, setZoomLevel] = useState(1.0);
    const [isPanning, setIsPanning] = useState(false);
    const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 });
    const lastMousePosition = useRef({ x: 0, y: 0 });

    const animationFrameRef = useRef();
    const lastUpdateTimeRef = useRef(Date.now());

    const isInnerPlanet = (name) => ['Mercury', 'Venus', 'Earth', 'Mars'].includes(name);

    // Handle mouse wheel zoom
    const handleWheel = (event) => {
        event.preventDefault();
        const zoomSpeed = 0.1;
        const delta = -Math.sign(event.deltaY) * zoomSpeed;
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomLevel + delta));
        setZoomLevel(newZoom);
    };

    // Handle mouse down for panning
    const handleMouseDown = (event) => {
        if (event.button === 0) { // Left mouse button
            setIsPanning(true);
            lastMousePosition.current = {
                x: event.clientX,
                y: event.clientY
            };
        }
    };

    // Handle mouse move for panning
    const handleMouseMove = (event) => {
        if (isPanning) {
            const deltaX = event.clientX - lastMousePosition.current.x;
            const deltaY = event.clientY - lastMousePosition.current.y;

            setViewPosition(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));

            lastMousePosition.current = {
                x: event.clientX,
                y: event.clientY
            };
        }
    };

    // Handle mouse up to stop panning
    const handleMouseUp = () => {
        setIsPanning(false);
    };

    useEffect(() => {
        const animate = () => {
            if (isAnimating) {
                const now = Date.now();
                const deltaSeconds = (now - lastUpdateTimeRef.current) / 1000;
                const daysElapsed = speedMultiplier * deltaSeconds;
                const timeStep = daysElapsed * 24 * 60 * 60 * 1000;

                setCurrentDate(prevDate => new Date(prevDate.getTime() + timeStep));
                lastUpdateTimeRef.current = now;
            }
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        lastUpdateTimeRef.current = Date.now();
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isAnimating, speedMultiplier]);

    const getPlanetPosition = (name) => {
        const data = planetData[name];
        const daysSinceStart = (currentDate.getTime() - new Date(START_DATE).getTime()) / (1000 * 60 * 60 * 24);
        const orbitProgress = (daysSinceStart / data.periodDays) * 360;
        const currentAngle = (data.horizonsData.longitude + orbitProgress) % 360;
        const angleRad = (currentAngle * Math.PI) / 180;

        const scaleFactor = isInnerPlanet(name) ? SCALE_FACTOR.INNER : SCALE_FACTOR.OUTER;
        const distance = data.horizonsData.distance * scaleFactor;

        return {
            x: Math.cos(angleRad) * distance,
            y: -Math.sin(angleRad) * distance
        };
    };

    const containerSize = 2000;
    const centerOffset = containerSize / 2;

    return (
        <div className="w-full h-screen bg-black overflow-hidden relative">
            <Controls
                isAnimating={isAnimating}
                setIsAnimating={setIsAnimating}
                speedMultiplier={speedMultiplier}
                setSpeedMultiplier={setSpeedMultiplier}
                zoomLevel={zoomLevel}
                setZoomLevel={setZoomLevel}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
            />

            <div
                className="w-full h-full"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
            >
                <div
                    className="absolute w-[2000px] h-[2000px]"
                    style={{
                        left: `calc(50% + ${viewPosition.x}px)`,
                        top: `calc(50% + ${viewPosition.y}px)`,
                        transform: `translate(-50%, -50%) scale(${zoomLevel})`,
                        transformOrigin: 'center',
                        position: 'relative'
                    }}
                >
                    <ConstellationRing />

                    {/* Sun */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: `${SUN_SIZE}px`,
                            height: `${SUN_SIZE}px`,
                            backgroundColor: '#FFD700',
                            left: `${centerOffset}px`,
                            top: `${centerOffset}px`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div className="planet-label">Sun</div>
                    </div>

                    {/* Planets */}
                    {Object.entries(planetData).map(([name, data]) => {
                        const pos = getPlanetPosition(name);
                        const scaleFactor = isInnerPlanet(name) ? SCALE_FACTOR.INNER : SCALE_FACTOR.OUTER;
                        const orbitSize = data.horizonsData.distance * scaleFactor * 2;

                        return (
                            <React.Fragment key={name}>
                                {/* Orbit */}
                                <div
                                    className="absolute rounded-full border border-white border-opacity-20"
                                    style={{
                                        width: `${orbitSize}px`,
                                        height: `${orbitSize}px`,
                                        left: `${centerOffset}px`,
                                        top: `${centerOffset}px`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />

                                {/* Planet */}
                                <div
                                    className="absolute rounded-full"
                                    style={{
                                        width: `${data.size}px`,
                                        height: `${data.size}px`,
                                        backgroundColor: data.color,
                                        left: `${centerOffset + pos.x}px`,
                                        top: `${centerOffset + pos.y}px`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <div className="planet-label">{name}</div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <EarthTiltView currentDate={currentDate} />
        </div>
    );
};

export default SolarSystem;