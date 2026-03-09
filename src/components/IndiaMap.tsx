import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { weatherAlerts } from "@/data/mockData";

// Accurate coordinates for mapped states
const stateCoordinates: Record<string, [number, number]> = {
  "Assam": [26.2006, 92.9376],
  "Maharashtra": [19.7515, 75.7139],
  "Kerala": [10.8505, 76.2711],
  "Delhi": [28.7041, 77.1025],
  "UP": [26.8467, 80.9462],
  "Odisha": [20.9517, 85.0985],
  "Rajasthan": [27.0238, 74.2179],
  "Uttarakhand": [30.0668, 79.0193],
  "Gujarat": [22.2587, 71.1924]
};

export default function IndiaMap() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-slate-50 rounded-xl relative overflow-hidden shadow-inner">
      <MapContainer 
        center={[22.5, 82.8]} 
        zoom={5} 
        scrollWheelZoom={false}
        className="w-full h-full absolute inset-0 rounded-xl z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {weatherAlerts.map((alert, idx) => {
          const coords = stateCoordinates[alert.state] || stateCoordinates["Delhi"];
          const color = alert.severity === 'critical' ? '#ef4444' : alert.severity === 'high' ? '#f59e0b' : '#3b82f6';
          
          return (
            <CircleMarker
              key={idx}
              center={coords}
              radius={alert.severity === 'critical' ? 12 : 8}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.6,
                weight: 2
              }}
            >
              <Popup className="font-sans">
                <div className="p-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                    <h3 className="font-bold text-sm text-slate-800 m-0">{alert.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{alert.description}</p>
                  <p className="text-xs font-semibold text-slate-700">Affected: {alert.affectedPopulation}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-slate-200">
        <h4 className="text-[10px] font-bold text-slate-500 mb-2 tracking-widest uppercase">Live Nodes</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"></span><span className="text-xs text-slate-700 font-semibold">Critical Emergency</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span><span className="text-xs text-slate-700 font-semibold">High Warning</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span><span className="text-xs text-slate-700 font-semibold">Active Monitoring</span></div>
        </div>
      </div>
    </div>
  );
}
