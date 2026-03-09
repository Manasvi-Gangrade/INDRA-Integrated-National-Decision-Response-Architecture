import { motion } from 'framer-motion';

const TICKER_ITEMS = [
    "LIVE: PM-KISAN 1.2M Enrollments detected in last 24h [Confidence: 99%]",
    "ALERT: Heavy Rainfall predicted in Assam region — INDRA CORE simulating impact [Confidence: 94%]",
    "ECONOMY: Q3 GDP Growth recorded at 7.2% — RBI integration stable [Confidence: 98%]",
    "VOICE: Processed 45K citizen grievance calls today — Hindi & Marathi predominant [Confidence: 92%]",
    "PILOT: Drafting weekly briefs for 12 DM offices in UP [Status: Running]",
];

export default function LiveTicker() {
    return (
        <div className="w-full bg-red-600 border-y border-red-500 overflow-hidden py-2 backdrop-blur-md z-10 relative flex items-center shadow-[0_4px_20px_rgba(220,38,38,0.4)]">
            {/* Animated glowing top border */}
            <div className="absolute top-0 left-0 h-[1px] w-full overflow-hidden">
               <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent absolute top-0 -left-full animate-[slideRight_3s_linear_infinite]" />
            </div>

            <div className="px-5 py-1 bg-red-700 text-white text-xs font-extrabold tracking-widest font-heading shrink-0 mr-4 z-20 flex items-center gap-2 uppercase shadow-[0_0_20px_rgba(220,38,38,0.8)] border-r border-red-400/50 rounded-r-full">
                <div className="w-2 h-2 rounded-full bg-white animate-ping absolute opacity-75" />
                <div className="w-2 h-2 rounded-full bg-white relative z-10" />
                Live Alert Feed
            </div>
            <div className="flex-1 relative overflow-hidden h-5">
                <motion.div
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                    className="whitespace-nowrap flex gap-16 absolute top-0 text-sm font-medium tracking-wide"
                >
                    {/* Double the array for seamless looping */}
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-5">
                            <span className="text-white font-bold drop-shadow-md">{item}</span>
                            <span className="text-white/70 animate-pulse font-bold text-lg">•</span>
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
