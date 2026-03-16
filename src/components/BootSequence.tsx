import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootMessages = [
  "INDRA KERNEL v9.4.2 LOADING...",
  "ESTABLISHING SECURE SATELLITE UPLINK... [OK]",
  "INITIALIZING GLOBAL ONTOLOGY ENGINE... [OK]",
  "SYNCING LIVE BHARAT MANDAPAM NODES... [OK]",
  "BYPASSING LEVEL-4 FIREWALLS... [AUTHORIZED]",
  "ACCESS GRANTED. WELCOME, COMMANDER."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, bootMessages[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, Math.random() * 400 + 200); // Random delay between 200ms and 600ms
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(exitTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col justify-end p-8 font-mono overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MiIgaGVpZ2h0PSI0MiI+CjxwYXRoIGQ9Ik0wIDBoNDJ2NDJIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-10" />
      
      <div className="relative z-10 max-w-3xl space-y-2 mb-12">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-cyan-400 text-lg md:text-xl md:leading-relaxed font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          >
            <span className="text-slate-500 mr-4">{`>`}</span>
            {msg}
          </motion.div>
        ))}
        {currentIndex < bootMessages.length && (
          <motion.div 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="w-4 h-6 bg-cyan-400 mt-2 ml-8 shadow-[0_0_10px_rgba(34,211,238,1)]"
          />
        )}
      </div>
    </motion.div>
  );
}
