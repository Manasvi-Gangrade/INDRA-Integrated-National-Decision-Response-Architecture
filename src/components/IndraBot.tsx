import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    type: 'bot' | 'user';
    text: string;
}

const INDRA_KNOWLEDGE = [
    { keywords: ['indra core', 'core', 'ontology'], response: "INDRA CORE is our Global Ontology Engine. It connects all government data sources into a living, unified knowledge graph to detect risks and cross-domain correlations." },
    { keywords: ['indra voice', 'voice', 'call'], response: "INDRA VOICE is our multilingual AI calling system. It can simultaneously process millions of citizen calls in 22+ local languages, classifying grievances and analyzing sentiment in real-time." },
    { keywords: ['indra pilot', 'pilot', 'assistant', 'admin'], response: "INDRA PILOT is the Leader's Co-Pilot. It provides public administrators with instant briefings, speeches, constituency insights, and decision support powered by the National Knowledge Graph." },
    { keywords: ['hi', 'hello', 'hey'], response: "Hello! I am the INDRA Assistant. I can tell you about our systems like INDRA CORE, VOICE, or PILOT. How can I help you today?" },
    { keywords: ['what is indra', 'indra'], response: "INDRA (Integrated National Decision & Response Architecture) is a comprehensive AI platform designed to transform India's massive governance data into actionable intelligence." },
];

export default function IndraBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'bot', text: 'Namaste! I am the INDRA AI Assistant. Ask me anything about our architecture (CORE, VOICE, PILOT).' }
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

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: userMessage }]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let botResponse = "I'm still learning! You can ask me about INDRA CORE, INDRA VOICE, or INDRA PILOT.";

            const lowerInput = userMessage.toLowerCase();
            for (const knowledge of INDRA_KNOWLEDGE) {
                if (knowledge.keywords.some(kw => lowerInput.includes(kw))) {
                    botResponse = knowledge.response;
                    break;
                }
            }

            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1500);
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
                        className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="indra-gradient-hero p-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold text-sm">INDRA AI Assistant</h3>
                                    <p className="text-[10px] text-white/80">Online & Ready</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center mt-1 ${msg.type === 'user' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
                                        }`}>
                                        {msg.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm ${msg.type === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-muted text-foreground rounded-tl-none border border-border/50'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center mt-1 bg-secondary/20 text-secondary">
                                        <Bot className="w-3 h-3" />
                                    </div>
                                    <div className="p-3 rounded-2xl bg-muted rounded-tl-none border border-border/50 flex items-center gap-1.5 h-10 w-16">
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <div className="p-3 border-t border-border shrink-0 bg-background/50">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about INDRA..."
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
