# 🚗 Vehicle Route Simulation (React + Leaflet)

A frontend-only web application that **simulates a moving vehicle on a live map** using dummy GPS data.  
Built with **React.js** and **Leaflet**, this project demonstrates real-time position updates, smooth animations, and route visualization.

---

## 🌐 Live Demo

👉 [View Deployed App](https://your-vercel-deployment-link.vercel.app)

---
## 🧩 Features

✅ **Interactive Map** using [Leaflet.js](https://leafletjs.com)  
✅ **Polyline Route Visualization** – displays the vehicle’s full route  
✅ **Smooth Real-Time Animation** between route points  
✅ **Play / Pause / Restart Controls**  
✅ **Dynamic Speed Control**  
✅ **Vehicle Info Panel** showing:
- Current latitude & longitude
- Elapsed simulation time
- Current speed  

✅ **Responsive UI** – works on desktop & mobile  
✅ **Uses Google’s Polyline Utility** for encoded route data  

---

## 🗺️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React.js, JavaScript (ES6+) |
| **Map Library** | Leaflet.js |
| **Styling** | CSS |
| **Data** | Local static JSON (`routeData.js` or `dummy-route.json`) |
| **Build Tool** | Create React App |

---

## 📂 Folder Structure

vehicle-movement-on-map/
│
├── src/
│ ├── components/
│ │ ├── MapView.js
│ │ ├── Controls.js
│ │ ├── InfoPanel.js
│ │ ├── GradientPolyline.js
│ │ └── MapController.js
│ ├── data/
│ │ └── routeData.js
│ ├── App.js
│ ├── index.js
│ └── styles.css
│
└── package.json
