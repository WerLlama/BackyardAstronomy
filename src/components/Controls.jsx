import React from 'react';
import { TIME_STEPS, SPEED_LABELS, START_DATE } from '../utils/config';

const Controls = ({
    isAnimating,
    setIsAnimating,
    speedMultiplier,
    setSpeedMultiplier,
    zoomLevel,
    setZoomLevel,
    currentDate,
    setCurrentDate
}) => {
    const handleSpeedChange = (e) => {
        const index = parseInt(e.target.value);
        setSpeedMultiplier(TIME_STEPS[index]);
    };

    const handleZoomChange = (e) => {
        setZoomLevel(parseFloat(e.target.value) / 100);
    };

    const handleDateChange = (e) => {
        setCurrentDate(new Date(e.target.value));
    };

    return (
        <div className="fixed top-5 left-5 bg-black bg-opacity-70 p-4 rounded-lg text-white z-10 min-w-[300px]">
            <h3 className="text-lg font-bold mb-4">Solar System Controls</h3>

            <div className="space-y-4">
                <div className="space-x-2">
                    <button
                        onClick={() => setIsAnimating(!isAnimating)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                    >
                        {isAnimating ? 'Pause' : 'Resume'}
                    </button>

                    <button
                        onClick={() => setCurrentDate(new Date(START_DATE))}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                    >
                        Reset
                    </button>
                </div>

                <div>
                    <label className="block mb-2">
                        Speed: {SPEED_LABELS[TIME_STEPS.indexOf(speedMultiplier)]}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max={TIME_STEPS.length - 1}
                        value={TIME_STEPS.indexOf(speedMultiplier)}
                        onChange={handleSpeedChange}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block mb-2">
                        Zoom: {zoomLevel.toFixed(1)}x
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="800"
                        value={zoomLevel * 100}
                        onChange={handleZoomChange}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block mb-2">Set Date:</label>
                    <input
                        type="datetime-local"
                        value={currentDate.toISOString().slice(0, 16)}
                        onChange={handleDateChange}
                        className="w-full bg-gray-800 p-2 rounded text-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default Controls;