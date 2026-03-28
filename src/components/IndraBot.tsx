import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    type: 'bot' | 'user';
    text: string;
}

const renderMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });
};

const MessageContent = ({ msg }: { msg: Message }) => {
    return (
        <p className="leading-relaxed">
            {renderMarkdown(msg.text)}
        </p>
    );
};

export default function IndraBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'bot', text: 'Namaste! I am your INDRA System Guide. How can I help you navigate the platform today?' }
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
            return "To login, use the 'Access Command Center' button. Public roles have limited data access, while Administrative roles see the full state.";
        }
        if (lowerInput.includes('core') || lowerInput.includes('ontology')) {
            return "INDRA CORE is our Global Ontology Engine. You can find it under the 'CORE' module in the Command Center to see real-time data fusion.";
        }
        if (lowerInput.includes('voice')) {
            return "INDRA VOICE handles AI citizen outreach. Go to the 'VOICE' module to see live grievance heatmaps and outbound call campaigns.";
        }
        if (lowerInput.includes('pilot')) {
            return "INDRA PILOT is the leader co-pilot. Use it to generate speeches or summarize complex policy documents instantly.";
        }
        if (lowerInput.includes('mode') || lowerInput.includes('graph') || lowerInput.includes('chart')) {
            return "The main INDRABOT in the center of the Landing Page supports advanced 'Intelligence Modes' like Graphs, Tables, and Search. This corner bot is for system help!";
        }
        return "I'm here to help with system navigation. Try asking about 'core', 'voice', 'pilot', or 'how to login'. For deep analysis, use the INDRABOT in the center of the page!";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: userMessage }]);
        setInput('');
        setIsTyping(true);

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
                        className="fixed bottom-6 right-6 w-14 h-14 rounded-full indra-gradient-hero shadow-lg flex items-center justify-center text-white z-50"
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
                        className="fixed bottom-6 right-6 w-[340px] h-[460px] bg-white border border-slate-200 shadow-2xl rounded-3xl flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="indra-gradient-hero p-4 flex items-center justify-between text-white border-b border-white/10 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <h3 className="font-heading font-black text-[11px] uppercase tracking-tighter">INDRA System Help</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                                >
                                    <div className={`p-3 rounded-2xl text-[13px] shadow-sm ${msg.type === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                        }`}>
                                        <MessageContent msg={msg} />
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="p-3 rounded-2xl bg-white border border-slate-100 flex items-center gap-1.5 h-10 w-16">
                                        <div className="w-1 h-1 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0s' }} />
                                        <div className="w-1 h-1 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-1 h-1 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask for system help..."
                                    className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="w-10 h-10 rounded-full indra-gradient-hero flex items-center justify-center text-white disabled:opacity-50"
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
