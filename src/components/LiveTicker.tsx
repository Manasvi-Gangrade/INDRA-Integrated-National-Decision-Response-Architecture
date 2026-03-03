import { motion } from 'framer-motion';

const TICKER_ITEMS = [
    "LIVE: PM-KISAN 1.2M Enrollments detected in last 24h",
    "ALERT: Heavy Rainfall predicted in Assam region — INDRA CORE simulating impact",
    "ECONOMY: Q3 GDP Growth recorded at 7.2% — RBI integration stable",
    "VOICE: Processed 45K citizen grievance calls today — Hindi & Marathi predominant",
    "PILOT: Drafting weekly briefs for 12 DM offices in UP",
];

export default function LiveTicker() {
    return (
        <div className="w-full bg-primary/5 border-y border-primary/10 overflow-hidden py-2 backdrop-blur-sm z-10 relative flex items-center">
            <div className="px-4 py-1 bg-primary text-primary-foreground text-xs font-bold font-heading shrink-0 mr-4 z-20 flex items-center gap-2 uppercase">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                Live Feed
            </div>
            <div className="flex-1 relative overflow-hidden h-5">
                <motion.div
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                    className="whitespace-nowrap flex gap-16 absolute top-0 text-sm font-medium text-foreground/80 tracking-wide"
                >
                    {/* Double the array for seamless looping */}
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-4">
                            <span>{item}</span>
                            <span className="text-primary/30 •">•</span>
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
