import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Lock, User, Key, ArrowRight } from "lucide-react";
import { useRole, Role } from "@/contexts/RoleContext";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [role, setRole] = useState<Role>("National Admin");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useRole();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate authentication delay
        setTimeout(() => {
            login(role);
            navigate("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden selection:bg-primary/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[0%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 bg-card/50 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl indra-gradient-hero flex items-center justify-center shadow-lg shadow-primary/20 mb-6">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-heading text-3xl font-extrabold tracking-tight mb-2">INDRA Portal</h1>
                    <p className="text-sm text-muted-foreground font-medium">Secure Access Authentication</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Access Tier</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value as Role)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background/50 text-sm font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                            >
                                <option value="National Admin">National Administrator</option>
                                <option value="State CM (UP)">Chief Minister (UP)</option>
                                <option value="District Admin (Lucknow)">District Magistrate</option>
                                <option value="Citizen">Public / Citizen Access</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">GovID / Aadhaar</label>
                        <div className="relative">
                            <Shield className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Enter 12-digit ID"
                                required
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background/50 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mb-8">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Security Pin</label>
                            <Link to="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <Key className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                            <input
                                type="password"
                                placeholder="••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background/50 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl indra-gradient-hero text-white text-sm font-extrabold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Lock className="w-4 h-4 animate-pulse" /> Establishing Secure Connection...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                Authenticate <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-border/50 pt-6">
                    <p className="text-xs text-muted-foreground font-medium flex items-center justify-center gap-1.5">
                        <Lock className="w-3 h-3" /> End-to-end encrypted under NIC Guidelines
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
