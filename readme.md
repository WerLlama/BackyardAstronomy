# Backyard Astronomy

A React-based visualization of the solar system with accurate planetary motions and constellation mapping.

## Project Structure
```bash
BackyardAstronomy/
├── public/
├── src/
│   ├── components/
│   │   ├── ConstellationRing.jsx   # Displays zodiacal constellations
│   │   ├── Controls.jsx            # User interface controls
│   │   ├── EarthTiltView.jsx       # Earth's axial tilt visualization
│   │   └── SolarSystem.jsx         # Main solar system visualization
│   ├── utils/
│   │   ├── config.js               # Configuration constants
│   │   ├── messierData.js          # Deep sky object data
│   │   └── planetData.js           # Planetary data
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
└── .gitignore