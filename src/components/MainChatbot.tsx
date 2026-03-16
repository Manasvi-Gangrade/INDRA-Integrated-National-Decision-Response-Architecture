import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Brain, AlertCircle } from 'lucide-react';

interface Message {
    id: string;
    type: 'bot' | 'user' | 'error';
    text: string;
}

export default function MainChatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'bot', text: 'Namaste! I am INDRA, the Global Ontology Engine AI. Ask me anything about real-time cross-domain intelligence (Climate, Defense, Geopolitics, Economy) or how to use the platform.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
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
        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: userMessage }]);
        setInput('');
        setIsTyping(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await res.json();
            
            if (res.ok) {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: data.response }]);
            } else {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'error', text: "Error: " + data.detail }]);
            }
        } catch (error) {
            console.error("Chat API Error:", error);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'error', text: "System Outline: Failed to connect to INDRA Core. Please ensure the backend is running and the GEMINI_API_KEY is configured in backend/.env." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <section id="indra-ai-query" className="relative z-10 bg-slate-50 border-t border-slate-200 py-24 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-6 relative">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700 tracking-tight drop-shadow-sm">INDRABOT</h2>
                    <p className="text-slate-600 font-semibold text-base sm:text-lg md:text-xl max-w-2xl mx-auto italic">"The Infinite Mind of India's Governance"</p>
                    <p className="text-slate-500 mt-4 text-sm sm:text-base">Query the Global Ontology Engine directly. Ask about live scenarios, data correlations, or the system architecture.</p>
                </div>

                <div className="w-full h-[650px] bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] flex flex-col overflow-hidden relative z-20 mx-auto max-w-4xl">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
                                <Brain className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="font-heading font-extrabold text-xl tracking-wide">INDRABOT</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                                    <p className="text-[10px] text-slate-300 font-bold tracking-widest uppercase">Ontology Core Active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-50/50 relative">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-4 max-w-[85%] ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                            >
                                <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center mt-1 shadow-sm border ${
                                    msg.type === 'user' 
                                        ? 'bg-blue-100 text-blue-600 border-blue-200' 
                                        : msg.type === 'error'
                                            ? 'bg-red-100 text-red-600 border-red-200'
                                            : 'bg-slate-800 text-cyan-400 border-slate-700'
                                    }`}>
                                    {msg.type === 'user' ? <User className="w-5 h-5" /> : msg.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={`p-5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.type === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : msg.type === 'error'
                                            ? 'bg-red-50 text-red-700 rounded-tl-none border border-red-200'
                                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                                    }`}
                                    style={{ whiteSpace: "pre-wrap" }}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-4 max-w-[85%]">
                                <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center mt-1 shadow-sm border bg-slate-800 text-cyan-400 border-slate-700">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div className="p-5 rounded-2xl bg-white rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-1.5 h-12 w-20">
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 rounded-full bg-slate-300" />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-slate-300" />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-slate-300" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 md:p-6 bg-white border-t border-slate-200">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative flex items-center"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message INDRA Core..."
                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-6 pr-16 py-4 text-[15px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="absolute right-3 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-sm"
                            >
                                <Send className="w-5 h-5 ml-0.5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
