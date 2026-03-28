import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Brain, AlertCircle, Plus, BarChart3, Image as ImageIcon, Table, Globe, MessageSquare, Sparkles, X, Grid, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Message {
    id: string;
    type: 'bot' | 'user' | 'error';
    text: string;
    mode?: 'text' | 'graph' | 'table' | 'search' | 'image';
}

const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#6366f1', '#06b6d4', '#ec4899'];

const renderMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });
};

const MessageContent = ({ msg }: { msg: Message }) => {
    if (msg.type === 'error') {
        return <div className="text-red-600 font-medium italic">{msg.text}</div>;
    }

    if (msg.mode === 'graph' && msg.type === 'bot') {
        try {
            const jsonMatch = msg.text.match(/\[.*\]/s);
            if (jsonMatch) {
                const data = JSON.parse(jsonMatch[0]);
                const textBefore = msg.text.split(jsonMatch[0])[0];
                return (
                    <div className="space-y-6 w-full min-w-[320px]">
                        {textBefore && <p className="text-slate-700 leading-relaxed text-lg">{renderMarkdown(textBefore)}</p>}
                        <div className="h-64 w-full bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-inner">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="name" fontSize={12} fontWeight="bold" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <YAxis fontSize={12} fontWeight="bold" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '12px' }}
                                        labelStyle={{ fontWeight: '900', color: '#1e293b', marginBottom: '4px' }}
                                    />
                                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                                        {data.map((_entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            }
        } catch (e) {
            console.error("Graph parsing error", e);
        }
    }

    if (msg.mode === 'table' && msg.type === 'bot') {
        if (msg.text.includes('|') && msg.text.includes('--')) {
             const parts = msg.text.split('|');
             const textBefore = parts[0];
             return (
                <div className="space-y-4">
                    {textBefore && <p className="text-slate-700 leading-relaxed text-lg">{renderMarkdown(textBefore)}</p>}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 overflow-x-auto">
                        <pre className="text-sm font-mono text-slate-800 whitespace-pre">
                            {'|' + msg.text.substring(msg.text.indexOf('|'))}
                        </pre>
                    </div>
                </div>
            );
        }
    }

    if (msg.mode === 'search' && msg.type === 'bot') {
        return (
            <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed text-lg">{renderMarkdown(msg.text)}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['National Intelligence Hub', 'Ontology Graph Insight', 'Crisis Response Archive'].map((source) => (
                        <div key={source} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3 hover:border-blue-300 hover:shadow-md transition-all group pointer-events-none">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Globe className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{source}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return <p className="leading-relaxed text-lg whitespace-pre-wrap">{renderMarkdown(msg.text)}</p>;
};

export default function MainChatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'bot', text: 'Namaste! I am INDRA, the Global Ontology Engine AI. Select an Intelligence Mode (+) next to the input to generate charts, tables, or search the deep web for insights.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showModes, setShowModes] = useState(false);
    const [currentMode, setCurrentMode] = useState<'text' | 'graph' | 'table' | 'search' | 'image'>('text');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        const activeMode = currentMode;
        
        // Prepare history for backend
        const history = messages.map(m => ({
            role: m.type === 'user' ? 'user' : 'model',
            content: m.text
        }));

        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: userMessage, mode: activeMode }]);
        setInput('');
        setIsTyping(true);
        setShowModes(false);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: userMessage,
                    mode: activeMode,
                    history: history
                })
            });
            const data = await res.json();
            
            if (res.ok) {
                setMessages(prev => [...prev, { 
                    id: (Date.now() + 1).toString(), 
                    type: 'bot', 
                    text: data.response,
                    mode: activeMode
                }]);
            } else {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'error', text: "Error: " + data.detail }]);
            }
        } catch (error) {
            console.error("Chat API Error:", error);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'error', text: "System Offline: Failed to connect to INDRA Core. Please ensure the backend is running and the GEMINI_API_KEY is configured." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <section id="indra-ai-query" className="relative z-10 bg-slate-50 border-t border-slate-200 py-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-6 relative">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700 tracking-tight drop-shadow-sm uppercase">INDRABOT</h2>
                    <p className="text-slate-600 font-semibold text-base sm:text-lg md:text-xl max-w-2xl mx-auto italic">"The Infinite Mind of India's Governance"</p>
                </div>

                <div className="w-full h-[700px] bg-white border border-slate-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-[3rem] flex flex-col overflow-hidden relative z-20 mx-auto max-w-5xl">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-between text-white shrink-0 border-b border-white/5">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
                                <Brain className="w-7 h-7 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="font-heading font-black text-2xl tracking-tight uppercase">INDRABOT</h3>
                                <div className="flex items-center gap-2.5 mt-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.6)]" />
                                    <p className="text-[11px] text-slate-300 font-black tracking-[0.2em] uppercase">Ontology Intelligence Core v4.0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 bg-slate-50/30 relative">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-6 max-w-[90%] ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                            >
                                <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center mt-1 shadow-sm border ${
                                    msg.type === 'user' 
                                        ? 'bg-blue-600 text-white border-blue-500' 
                                        : msg.type === 'error'
                                            ? 'bg-red-100 text-red-600 border-red-200'
                                            : 'bg-slate-800 text-cyan-400 border-slate-700'
                                    }`}>
                                    {msg.type === 'user' ? <User className="w-6 h-6" /> : msg.type === 'error' ? <AlertCircle className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                                </div>
                                <div className={`p-6 rounded-3xl shadow-xl w-full ${msg.type === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : msg.type === 'error'
                                            ? 'bg-red-50 text-red-700 rounded-tl-none border border-red-200'
                                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                                    }`}>
                                    <MessageContent msg={msg} />
                                    {msg.mode && msg.mode !== 'text' && msg.type === 'bot' && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                                            <Sparkles className="w-4 h-4 text-blue-500" />
                                            Active {msg.mode} Synthesis
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-6 max-w-[85%]">
                                <div className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center mt-1 shadow-sm border bg-slate-800 text-cyan-400 border-slate-700">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div className="p-6 rounded-2xl bg-white rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2 h-16 w-24">
                                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-8 bg-white border-t border-slate-200 relative">
                        <AnimatePresence>
                            {showModes && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: -90, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute left-8 right-8 bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-[2rem] p-4 flex justify-around items-center z-30 backdrop-blur-md bg-white/95"
                                >
                                    {[
                                        { id: 'text', icon: MessageSquare, label: 'Text', color: 'text-blue-600', bg: 'bg-blue-50' },
                                        { id: 'graph', icon: BarChart3, label: 'Graph', color: 'text-purple-600', bg: 'bg-purple-50' },
                                        { id: 'table', icon: Table, label: 'Table', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                        { id: 'search', icon: Globe, label: 'Search', color: 'text-cyan-600', bg: 'bg-cyan-50' },
                                        { id: 'image', icon: ImageIcon, label: 'Image', color: 'text-pink-600', bg: 'bg-pink-50' },
                                    ].map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => { setCurrentMode(m.id as any); setShowModes(false); }}
                                            className={`flex flex-col items-center gap-3 p-4 px-8 rounded-2xl transition-all ${currentMode === m.id ? m.bg : 'hover:bg-slate-50'}`}
                                        >
                                            <m.icon className={`w-8 h-8 ${m.color}`} />
                                            <span className="text-[12px] font-black text-slate-500 uppercase tracking-tighter">{m.label}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative flex items-center gap-4"
                        >
                            <button
                                type="button"
                                onClick={() => setShowModes(!showModes)}
                                className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-all shadow-sm ${showModes ? 'bg-slate-100 rotate-45' : 'bg-slate-50 border-2 border-slate-200 hover:bg-slate-100'}`}
                            >
                                <Plus className={`w-8 h-8 ${currentMode !== 'text' ? 'text-blue-600 font-black' : 'text-slate-400'}`} />
                            </button>

                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={currentMode === 'text' ? "Message INDRA Core..." : `Initiate ${currentMode} analysis...`}
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-[1.5rem] pl-8 pr-32 py-5 text-[17px] font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 transition-all placeholder:text-slate-400 shadow-inner"
                                />
                                {currentMode !== 'text' && (
                                    <div className="absolute right-16 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-100 text-blue-600 text-[11px] font-black rounded-xl uppercase tracking-widest border border-blue-200 animate-pulse">
                                        {currentMode}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/30"
                                >
                                    <Send className="w-6 h-6 ml-0.5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
