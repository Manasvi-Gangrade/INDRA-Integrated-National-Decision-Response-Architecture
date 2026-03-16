import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    type: 'bot' | 'user';
    text: string;
}

export default function IndraBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'bot', text: 'Namaste! I am the INDRA Intelligence Assistant. How can I assist you with using the platform today?' }
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

    const generateHelpResponse = (input: string) => {
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('login') || lowerInput.includes('password')) {
            return `To login to the system, navigate to the Command Center and enter your respective role credentials. As an admin, you can view all data; citizens have limited views.`;
        }
        if (lowerInput.includes('core') || lowerInput.includes('ontology')) {
            return `The INDRA CORE is the Global Ontology Engine. It fuses structured and unstructured data from IMD, USGS, and News. You can view it by clicking on "Access Command Center" and then navigating to the Ontology Graph.`;
        }
        if (lowerInput.includes('voice') || lowerInput.includes('calls')) {
            return `INDRA VOICE handles AI Citizen calls. Go to the "INDRA VOICE" module to see real-time grievance processing, sentiment analysis, and multilingual outbound campaigns.`;
        }
        if (lowerInput.includes('pilot') || lowerInput.includes('speech')) {
            return `INDRA PILOT is the Leader Co-Pilot. It can auto-generate speeches and summarize PDF documents for you. Launch the "INDRA PILOT" module from the main page to use it.`;
        }
        if (lowerInput.includes('simulation') || lowerInput.includes('flood')) {
            return `To see the system in action during a crisis, click "Run Simulation" on the main page. It will walk you through a simulated 4-step Assam Flood scenario.`;
        }
        if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
            return `Namaste! How can I assist you with using the INDRA platform today?`;
        }

        return `I'm a static help assistant focused on system navigation. Try asking me about 'core', 'voice', 'pilot', 'simulation', or 'login'.`;
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: userMessage }]);
        setInput('');
        setIsTyping(true);

        // Simulate network delay for realism
        setTimeout(() => {
            const response = generateHelpResponse(userMessage);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: response }]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 w-14 h-14 rounded-full indra-gradient-hero shadow-lg flex items-center justify-center text-white z-50 hover-glow"
                    >
                        <Sparkles className="w-6 h-6 absolute animate-pulse opacity-50" />
                        <MessageSquare className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 w-[360px] h-[480px] bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-3xl flex flex-col z-50 overflow-hidden ring-1 ring-white/20"
                    >
                        {/* Simple Header */}
                        <div className="indra-gradient-hero shrink-0">
                            <div className="p-4 py-3 flex items-center justify-between text-white border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/30">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-heading font-black text-[12px] uppercase tracking-tighter">INDRA Intelligence</h3>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center mt-1 ${msg.type === 'user' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                                        }`}>
                                        {msg.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.type === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center mt-1 bg-secondary/10 text-secondary">
                                        <Bot className="w-3 h-3" />
                                    </div>
                                    <div className="p-3 rounded-2xl bg-white rounded-tl-none border border-slate-100 flex items-center gap-1.5 h-10 w-16">
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1 h-1 rounded-full bg-slate-300" />
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 h-1 rounded-full bg-slate-300" />
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1 h-1 rounded-full bg-slate-300" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-border bg-background">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Message INDRA Core..."
                                    className="flex-1 bg-muted border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="w-10 h-10 shrink-0 rounded-full indra-gradient-hero flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                                >
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
