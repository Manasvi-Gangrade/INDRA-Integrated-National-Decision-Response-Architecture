import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Fingerprint, Camera, User, Key, Building, ArrowRight, Briefcase } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { DigiLockerModal } from '@/components/DigiLockerModal';

export default function RegistrationPage() {
    const navigate = useNavigate();
    
    // Core Form State
    const [formData, setFormData] = useState({
        name: '',
        aadhaar: '',
        designation: 'District Magistrate',
        department: 'Home Affairs'
    });

    // Biometric & Scanner States
    const [scanningFace, setScanningFace] = useState(false);
    const [faceRegistered, setFaceRegistered] = useState(false);
    const [scanningFinger, setScanningFinger] = useState(false);
    const [fingerRegistered, setFingerRegistered] = useState(false);
    
    // Aadhaar & DigiLocker States
    const [isDigilockerOpen, setIsDigilockerOpen] = useState(false);
    const [scanningAadhaar, setScanningAadhaar] = useState(false);
    
    // DOM Refs
    const videoRef = useRef<HTMLVideoElement>(null);
    const aadhaarVideoRef = useRef<HTMLVideoElement>(null);

    // --- Aadhaar Physical Scanner ---
    const startAadhaarScan = async () => {
        setScanningAadhaar(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (aadhaarVideoRef.current) {
                aadhaarVideoRef.current.srcObject = stream;
            }
            setTimeout(() => {
                stream.getTracks().forEach(track => track.stop());
                setScanningAadhaar(false);
                setFormData(prev => ({...prev, aadhaar: "987654321098"}));
            }, 3000);
        } catch (err) {
            console.error("Camera access denied", err);
            setScanningAadhaar(false);
        }
    };
    // --- Face Scanner ---
    const startFaceScan = async () => {
        setScanningFace(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            // Simulate 3 seconds of scanning
            setTimeout(() => {
                stream.getTracks().forEach(track => track.stop());
                setScanningFace(false);
                setFaceRegistered(true);
            }, 3000);
        } catch (err) {
            console.error("Camera access denied", err);
            setScanningFace(false);
        }
    };

    // --- Finger Scanner ---
    const startFingerScan = () => {
        setScanningFinger(true);
        setTimeout(() => {
            setScanningFinger(false);
            setFingerRegistered(true);
        }, 3000);
    };

    // --- Submit Handler ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!faceRegistered || !fingerRegistered) {
            alert("Biometrics (Face & Fingerprint) are mandatory for High-Level Clearance.");
            return;
        }
        alert("Authority Registration Complete. Clearance granted.");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-6 overflow-x-hidden selection:bg-emerald-500/30">
            <DigiLockerModal isOpen={isDigilockerOpen} onClose={() => setIsDigilockerOpen(false)} />

            {/* High-tech Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(241,245,249,0.8)_100%)] z-10" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-100 blur-[120px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 z-10"
            >
                {/* Left Panel: Form */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 blur-3xl rounded-full" />
                    
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="font-heading text-3xl font-extrabold text-slate-900">Authority Onboarding</h1>
                            <p className="text-emerald-700 text-sm font-semibold tracking-wide uppercase mt-1">Level-4 Security Clearance</p>
                        </div>
                    </div>

                    <div className="mb-6 z-10 relative">
                        <button 
                            type="button"
                            onClick={() => setIsDigilockerOpen(true)}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold rounded-xl transition-all shadow-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="m6 12-4 3 4 3"/></svg>
                            Fetch auto-fill data from DigiLocker
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10 flex-1">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Legal Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">UIDAI / Aadhaar No.</label>
                                <div className="relative flex items-center">
                                    <Key className="absolute left-4 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="12-Digit Identity"
                                        value={formData.aadhaar}
                                        onChange={(e) => setFormData({...formData, aadhaar: e.target.value.replace(/[^0-9]/g, '')})}
                                        maxLength={12}
                                        className="w-full pl-12 pr-24 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                                    />
                                    <button 
                                        type="button"
                                        onClick={startAadhaarScan}
                                        className="absolute right-2 p-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                                        title="Scan Physical Card"
                                    >
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Designation</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <select
                                        value={formData.designation}
                                        onChange={(e) => setFormData({...formData, designation: e.target.value})}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Chief Minister">Chief Minister</option>
                                        <option value="Cabinet Minister">Cabinet Minister</option>
                                        <option value="District Magistrate">District Magistrate</option>
                                        <option value="Secretary">Secretary</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Department / Ministry</label>
                            <div className="relative">
                                <Building className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    value={formData.department}
                                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Panel: Biometrics & Submission */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl flex-1 flex flex-col justify-center gap-6 relative overflow-hidden">
                        
                        {scanningAadhaar && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                            >
                                <div className="relative w-64 h-40 mb-6 rounded-xl overflow-hidden border-4 border-slate-200 shadow-2xl bg-black">
                                    <motion.div 
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-20 pointer-events-none"
                                    />
                                    {/* Four corner scanning brackets */}
                                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-500 z-10" />
                                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-500 z-10" />
                                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-500 z-10" />
                                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-500 z-10" />
                                    <video ref={aadhaarVideoRef} autoPlay playsInline muted className="w-full h-full object-cover filter contrast-125" />
                                </div>
                                <h3 className="text-emerald-600 font-mono font-bold tracking-widest uppercase">Scanning Physical Card...</h3>
                                <p className="text-xs text-slate-500 mt-2">Please align Aadhaar inside the frame.</p>
                            </motion.div>
                        )}

                        {scanningFace && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                            >
                                <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-8 border-slate-100 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-slate-50">
                                    <motion.div 
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-20 pointer-events-none"
                                    />
                                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-[1.3] filter contrast-125 brightness-110" />
                                </div>
                                <h3 className="text-emerald-600 font-mono font-bold tracking-widest uppercase">Mapping Facial Topology...</h3>
                            </motion.div>
                        )}

                        {scanningFinger && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                            >
                                <Fingerprint className="w-32 h-32 text-emerald-500 animate-pulse mb-6 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
                                <h3 className="text-emerald-600 font-mono font-bold tracking-widest uppercase">Scanning Hardware Token...</h3>
                            </motion.div>
                        )}

                        <div className="text-center mb-4">
                            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Biometric Vault</h2>
                            <p className="text-slate-500 text-sm">Mandatory hardware enrollment for Level-4.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                type="button" 
                                onClick={startFaceScan}
                                disabled={faceRegistered}
                                className={`flex flex-col items-center justify-center gap-4 py-8 rounded-2xl border-2 transition-all ${faceRegistered ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/50'}`}
                            >
                                <Camera className={`w-8 h-8 ${faceRegistered ? 'text-emerald-600' : 'text-slate-400'}`} />
                                <span className={`text-sm font-bold uppercase tracking-widest ${faceRegistered ? 'text-emerald-700' : 'text-slate-500'}`}>
                                    {faceRegistered ? 'Face Enrolled' : 'Register Face'}
                                </span>
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={startFingerScan}
                                disabled={fingerRegistered}
                                className={`flex flex-col items-center justify-center gap-4 py-8 rounded-2xl border-2 transition-all ${fingerRegistered ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/50'}`}
                            >
                                <Fingerprint className={`w-8 h-8 ${fingerRegistered ? 'text-emerald-600' : 'text-slate-400'}`} />
                                <span className={`text-sm font-bold uppercase tracking-widest ${fingerRegistered ? 'text-emerald-700' : 'text-slate-500'}`}>
                                    {fingerRegistered ? 'Print Enrolled' : 'Add Fingerprint'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={`w-full py-5 rounded-3xl font-extrabold text-white text-lg flex items-center justify-center gap-3 transition-all shadow-xl ${
                            faceRegistered && fingerRegistered 
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:shadow-emerald-500/30 hover:scale-[1.02]' 
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                        }`}
                    >
                        {faceRegistered && fingerRegistered ? (
                            <>Initialize clearance <ArrowRight className="w-5 h-5" /></>
                        ) : (
                            <>Awaiting Biometrics</>
                        )}
                    </button>
                    
                    <div className="text-center">
                        <Link to="/login" className="text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors">
                            Already enrolled? Authenticate here.
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
