import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, WMSTileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { weatherAlerts } from "@/data/mockData";
import { Mic, MicOff, Activity } from "lucide-react";

// Accurate coordinates for mapped states
const stateCoordinates: Record<string, [number, number]> = {
  "Assam": [26.2006, 92.9376],
  "Maharashtra": [19.7515, 75.7139],
  "Kerala": [10.8505, 76.2711],
  "Delhi": [28.7041, 77.1025],
  "UP": [26.8467, 80.9462],
  "Uttar Pradesh": [26.8467, 80.9462],
  "Odisha": [20.9517, 85.0985],
  "Rajasthan": [27.0238, 74.2179],
  "Uttarakhand": [30.0668, 79.0193],
  "Gujarat": [22.2587, 71.1924],
  "India": [22.5, 82.8] // Default center
};

interface NewsPin {
  location: string;
  type: string;
  title: string;
}

// Helper component to control map from external state
function MapController({ targetCenter, targetZoom }: { targetCenter: [number, number], targetZoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(targetCenter, targetZoom, { duration: 1.5 });
  }, [targetCenter, targetZoom, map]);
  return null;
}

export default function IndiaMap({ newsPins = [], onLocationSelect }: { newsPins?: NewsPin[], onLocationSelect?: (location: string | null) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.5, 82.8]);
  const [mapZoom, setMapZoom] = useState(5);
  const [showAQI, setShowAQI] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const resultText = event.results[current][0].transcript.toLowerCase();
        setTranscript(resultText);
        
        // Command Parsing
        let foundState = false;
        for (const [state, coords] of Object.entries(stateCoordinates)) {
          if (resultText.includes(state.toLowerCase())) {
            setMapCenter(coords);
            setMapZoom(state === "India" ? 5 : 7);
            onLocationSelect?.(state === "India" ? null : state);
            foundState = true;
            break;
          }
        }
        
        if (resultText.includes("reset") || resultText.includes("national")) {
           setMapCenter(stateCoordinates["India"]);
           setMapZoom(5);
           onLocationSelect?.(null);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceMode = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript("Listening...");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-slate-50 rounded-xl relative overflow-hidden shadow-inner border border-slate-200">
      <MapContainer 
        center={[22.5, 82.8]} 
        zoom={5} 
        scrollWheelZoom={false}
        className="w-full h-full absolute inset-0 rounded-xl z-0"
      >
        <MapController targetCenter={mapCenter} targetZoom={mapZoom} />
        <WMSTileLayer
          url="https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms"
          layers="india3"
          format="image/jpeg"
          transparent={true}
          version="1.1.1"
          attribution="Map data © ISRO Bhuvan / NRSC"
        />

        {/* Fallback Premium Satellite View in case Bhuvan is slow during demo */}
        <TileLayer
          attribution='&copy; ISRO Bhuvan / NRSC / Esri World Imagery'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          opacity={0.85}
        />

        {/* Live Air Quality (AQI) Heatmap Overlay */}
        {showAQI && (
          <>
            <CircleMarker center={[28.7041, 77.1025]} radius={40} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3, weight: 0 }} />
            <CircleMarker center={[28.7041, 77.1025]} radius={20} pathOptions={{ color: '#991b1b', fillColor: '#991b1b', fillOpacity: 0.5, weight: 0 }}>
              <Popup>Delhi NCR: AQI 482 (Severe+)</Popup>
            </CircleMarker>
            
            <CircleMarker center={[26.8467, 80.9462]} radius={35} pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.3, weight: 0 }} />
            <CircleMarker center={[26.8467, 80.9462]} radius={15} pathOptions={{ color: '#c2410c', fillColor: '#c2410c', fillOpacity: 0.5, weight: 0 }}>
              <Popup>Lucknow: AQI 310 (Very Poor)</Popup>
            </CircleMarker>

            <CircleMarker center={[26.4499, 80.3319]} radius={25} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3, weight: 0 }} />
            <CircleMarker center={[26.4499, 80.3319]} radius={10} pathOptions={{ color: '#991b1b', fillColor: '#991b1b', fillOpacity: 0.5, weight: 0 }}>
               <Popup>Kanpur: AQI 415 (Severe)</Popup>
            </CircleMarker>
          </>
        )}

        {/* Existing Weather Alerts */}
        {weatherAlerts.map((alert, idx) => {
          const coords = stateCoordinates[alert.state] || stateCoordinates["Delhi"];
          const color = alert.severity === 'critical' ? '#ef4444' : alert.severity === 'high' ? '#f59e0b' : '#3b82f6';
          
          return (
            <CircleMarker
              key={`alert-${idx}`}
              center={coords}
              radius={alert.severity === 'critical' ? 14 : 10}
              eventHandlers={{ click: () => onLocationSelect?.(alert.state) }}
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
                  <p className="text-xs text-slate-600 mb-1">{alert.description}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Dynamic News Pins */}
        {newsPins.map((pin, idx) => {
          const coords = stateCoordinates[pin.location] || [22.5 + (Math.random() * 4 - 2), 82.8 + (Math.random() * 4 - 2)];
          return (
            <CircleMarker
              key={`news-${idx}`}
              center={coords as [number, number]}
              radius={8}
              eventHandlers={{ click: () => onLocationSelect?.(pin.location) }}
              pathOptions={{
                color: '#8b5cf6',
                fillColor: '#8b5cf6',
                fillOpacity: 0.8,
                weight: 1
              }}
            >
              <Popup>
                <div className="p-1">
                  <span className="text-[9px] font-bold text-indigo-500 uppercase block mb-1">LIVE NEWS: {pin.type}</span>
                  <h3 className="font-bold text-xs text-slate-800 m-0">{pin.title}</h3>
                  <p className="text-[10px] text-slate-500 mt-1">Location: {pin.location}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      {/* Voice & Map Controls Overlay */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
        <button 
          onClick={toggleVoiceMode}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg border transition-all ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
              : 'bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 border-slate-200'
          }`}
        >
          {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
          <span className="font-bold text-sm">Voice C2</span>
        </button>

        <button 
          onClick={() => setShowAQI(!showAQI)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg border transition-all ${
            showAQI 
              ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]' 
              : 'bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 border-slate-200'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="font-bold text-sm">Live AQI Radar</span>
        </button>

        {transcript && (
          <div className="bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-2 rounded-xl border border-slate-700 font-mono shadow-xl max-w-[200px]">
            <p className="opacity-50 text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> Audio Parsed</p>
            "{transcript}"
          </div>
        )}
      </div>

      {/* Legend overlay */}
      <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-md px-4 py-4 rounded-xl shadow-2xl border border-slate-200">
        <h4 className="text-[10px] font-bold text-slate-500 mb-3 tracking-widest uppercase border-b pb-1 flex justify-between">
          <span>Intelligence Nodes</span>
          <span className="text-emerald-600">ISRO UPLINK ACTIVE</span>
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"></span>
            <span className="text-[11px] text-slate-700 font-extrabold uppercase tracking-wide">Critical Alert</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]"></span>
            <span className="text-[11px] text-slate-700 font-extrabold uppercase tracking-wide">News Intelligence</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-blue-500"></span>
            <span className="text-[11px] text-slate-700 font-extrabold uppercase tracking-wide">Active monitoring</span>
          </div>
          {showAQI && (
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
              <span className="w-3.5 h-3.5 rounded-full bg-orange-500 opacity-80"></span>
              <span className="text-[11px] text-slate-700 font-extrabold uppercase tracking-wide">Poor Air Quality</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
