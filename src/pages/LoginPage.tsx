import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, User, Key, ArrowRight, Loader2 } from "lucide-react";
import { useRole, Role } from "@/contexts/RoleContext";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [role, setRole] = useState<Role>("National Admin");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [scanning, setScanning] = useState(false);
    const { login } = useRole();
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;
        if (scanning) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((s) => {
                    stream = s;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch(err => console.error("Webcam access denied:", err));
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [scanning]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Phase 1: Basic validation pause
            await new Promise(resolve => setTimeout(resolve, 800));
            setLoading(false);
            setScanning(true);
            
            // Phase 2: Hardware Biometric Auth (WebAuthn)
            if (window.PublicKeyCredential) {
                const challenge = new Uint8Array(32);
                window.crypto.getRandomValues(challenge);
                
                const userId = new Uint8Array(16);
                window.crypto.getRandomValues(userId);

                const cred = await navigator.credentials.create({
                    publicKey: {
                        challenge: challenge,
                        rp: {
                            name: "INDRA Governance OS",
                            id: window.location.hostname
                        },
                        user: {
                            id: userId,
                            name: id || "gov_admin",
                            displayName: role
                        },
                        pubKeyCredParams: [
                            { type: "public-key", alg: -7 },
                            { type: "public-key", alg: -257 }
                        ],
                        authenticatorSelection: {
                            authenticatorAttachment: "platform", // Forces built-in biometrics (Windows Hello)
                            userVerification: "required"
                        },
                        timeout: 60000,
                        attestation: "none"
                    }
                });

                if (cred) {
                    setScanning(false);
                    login(role);
                    navigate("/dashboard");
                } else {
                    throw new Error("Biometrics returned null");
                }
            } else {
                // Fallback if browser doesn't support WebAuthn
                await new Promise(resolve => setTimeout(resolve, 2500));
                setScanning(false);
                login(role);
                navigate("/dashboard");
            }

        } catch (error) {
            console.error("Biometric Authentication Failed:", error);
            alert(`Biometric Verification Failed or Cancelled.\n\nINDRA Security Protocol: Access Denied.`);
            setScanning(false);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative flex items-center justify-center overflow-x-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-screen flex flex-col lg:flex-row relative z-10"
            >
                {/* Left Side: Cinematic Branding (Hidden on mobile) */}
                <div className="hidden lg:flex w-[55%] flex-col justify-center p-20 relative overflow-hidden bg-blue-900">
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-blue-950">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute min-w-full min-h-full object-cover opacity-20 mix-blend-screen scale-105"
                            src="https://assets.mixkit.co/videos/preview/mixkit-globe-of-earth-with-points-of-light-and-lines-of-4148-large.mp4"
                        />
                        <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/90 to-blue-800/40" />
                    </div>
                
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="z-10 relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)] mb-8 border border-white/10 ring-4 ring-blue-50">
                            <Lock className="w-10 h-10 text-white drop-shadow-md" />
                        </div>
                        <h1 className="text-6xl font-heading font-extrabold tracking-tighter text-white mb-4 leading-tight">
                            INDRA <br/>
                            <span className="text-blue-200">Command System</span>
                        </h1>
                        <p className="text-blue-100 text-xl font-body max-w-lg leading-relaxed mb-12">
                            Secure unified authentication gateway for the Integrated National Decision & Response Architecture.
                        </p>
                        
                        <div className="flex gap-6 text-sm font-bold text-blue-200 font-mono">
                            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-400" /> End-to-End Encrypted</span>
                            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-blue-300" /> Level-4 Clearance Req.</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Auth Panel */}
                <div className="w-full lg:w-[45%] h-full flex items-center justify-center p-6 sm:p-12 relative bg-white border-l border-slate-200 shadow-2xl">
                    <div className="w-full max-w-md space-y-8 relative">
                    
                        <div className="text-center lg:text-left mb-10">
                            <h2 className="text-3xl font-heading font-extrabold text-slate-900 mb-2 tracking-tight">Access Terminal</h2>
                            <p className="text-slate-600 font-medium">Verify credentials to establish uplink.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Access Tier</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value as Role)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer hover:bg-slate-100"
                                    >
                                        <option value="National Admin">National Administrator</option>
                                        <option value="State CM (UP)">Chief Minister (UP)</option>
                                        <option value="District Admin (Lucknow)">District Magistrate</option>
                                        <option value="Citizen">Public / Citizen Access</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">GovID / Aadhaar</label>
                                <div className="relative">
                                    <Key className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter 12-digit ID"
                                        required
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400 hover:bg-slate-100"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-10">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Security Pin</label>
                                </div>
                                <div className="relative">
                                    <Key className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="password"
                                        placeholder="••••••"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400 hover:bg-slate-100"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || scanning}
                                className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] hover:shadow-blue-500/30 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Lock className="w-5 h-5 animate-pulse" /> Uplink Connecting...
                                    </span>
                                ) : scanning ? (
                                    <span className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin" /> Verifying Biometrics...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 text-base">
                                        Establish Connection <ArrowRight className="w-5 h-5 ml-1" />
                                    </span>
                                )}
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center">
                            <p className="text-slate-600 text-sm font-medium">
                                Don't have clearance? <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-bold ml-1 transition-colors">Request Authority Access</Link>
                            </p>
                        </div>
                    </div>

                    {scanning && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-50 bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center"
                        >
                            <div className="relative w-64 h-64 mb-8 rounded-full overflow-hidden border-8 border-slate-100 shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-slate-50">
                                <motion.div 
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] z-20 pointer-events-none"
                                />
                                <video 
                                    ref={videoRef}
                                    autoPlay 
                                    playsInline 
                                    muted 
                                    className="w-full h-full object-cover scale-[1.3] filter contrast-125 brightness-110 saturate-100"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-blue-600 font-heading tracking-widest uppercase">Facial Pattern Match</h3>
                            <p className="text-sm text-slate-500 font-mono flex items-center gap-2">
                                <Lock className="w-4 h-4 text-blue-500 animate-pulse" /> Cross-referencing GovID: {id}
                            </p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
