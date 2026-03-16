import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, Globe } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  published: string;
  summary: string;
  intel?: {
    location: string;
    type: string;
  };
}

const NewsScrollingPanel: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback data for demo stability
  const fallbackNews: NewsItem[] = [
    { title: "National High-Alert: Security Protocols Updated at All Hubs", link: "#", published: new Date().toISOString(), summary: "", intel: { type: "CRISIS", location: "NEW DELHI" } },
    { title: "Economic Resilience: India's Digital Trade Surplus Reaches Record High", link: "#", published: new Date().toISOString(), summary: "", intel: { type: "ECONOMY", location: "MUMBAI" } },
    { title: "Global Tech Sync: INDRA Core Finalizes Ontology Integration", link: "#", published: new Date().toISOString(), summary: "", intel: { type: "TECH", location: "GLOBAL" } },
    { title: "Sovereign Cloud: New Data Centers Live in Southern Region", link: "#", published: new Date().toISOString(), summary: "", intel: { type: "GOVERNANCE", location: "CHENNAI" } }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/core/real-time-news');
        if (response.ok) {
            const data = await response.json();
            // Shuffle data to ensure variety
            const shuffled = [...data].sort(() => Math.random() - 0.5);
            setNews(data.length > 0 ? shuffled : fallbackNews);
        } else {
            setNews(fallbackNews);
        }
        setLoading(false);
      } catch (error) {
        setNews(fallbackNews);
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  const displayNews = news.length > 0 ? news : fallbackNews;
  const scrollingNews = [...displayNews, ...displayNews, ...displayNews, ...displayNews];

  return (
    <div className="relative z-[50] w-full bg-white/40 backdrop-blur-3xl border-y border-slate-100 py-3 overflow-hidden group">
      <div className="flex w-full overflow-hidden items-center group-hover:pause">
        <motion.div 
          className="flex gap-4 px-4"
          animate={{
            x: [0, -4000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 100, // Slower but still readable
              ease: "linear",
            },
          }}
          style={{ width: 'max-content' }}
        >
          {scrollingNews.map((item, idx) => {
            const getColorConfig = (type?: string, index: number = 0) => {
                const t = type?.toLowerCase() || "";
                
                // Map of vibrant high-contrast backgrounds
                const palettes = [
                    "bg-red-600 shadow-red-500/20",
                    "bg-emerald-600 shadow-emerald-500/20",
                    "bg-cyan-600 shadow-cyan-500/20",
                    "bg-amber-600 shadow-amber-500/20",
                    "bg-indigo-600 shadow-indigo-500/20",
                    "bg-purple-600 shadow-purple-500/20",
                    "bg-pink-600 shadow-pink-500/20",
                    "bg-lime-600 shadow-lime-500/20",
                    "bg-orange-600 shadow-orange-500/20",
                    "bg-fuchsia-600 shadow-fuchsia-500/20"
                ];

                // Use index-based rotation for maximum variety as requested
                return palettes[index % palettes.length];
            };

            const colorClass = getColorConfig(item.intel?.type, idx);

            return (
              <motion.a
                  key={`${item.link}-${idx}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`w-[360px] h-[70px] ${colorClass.split(' ')[0]} text-white ${colorClass.split(' ')[1]} rounded-2xl px-6 flex items-center hover:shadow-2xl transition-all duration-300 group/card relative overflow-hidden shadow-xl border border-white/20`}
              >
                  <h3 className="font-black text-[14px] leading-tight line-clamp-2 drop-shadow-md z-10">
                    {item.title}
                  </h3>
                  
                  {/* Subtle glass overlay & micro-glow */}
                  <div className="absolute inset-0 bg-white/5 pointer-events-none group-hover:bg-white/10 transition-colors" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-12 -translate-y-12 pointer-events-none" />
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-black/10 blur-2xl rounded-full pointer-events-none" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsScrollingPanel;
