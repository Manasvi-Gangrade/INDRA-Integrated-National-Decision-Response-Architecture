import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, FileText, CheckCircle2, X, Lock, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import StatusBadge from '@/components/StatusBadge';

interface DigiLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DigiLockerModal({ isOpen, onClose }: DigiLockerModalProps) {
  const [step, setStep] = useState(1);
  const [idNumber, setIdNumber] = useState("9876-5432-1098");

  const handleRequest = async () => {
    setStep(2);
    // Simulate SMS Sending
    await new Promise(r => setTimeout(r, 1500));
    setStep(3); // Awaiting Consent
    
    // Simulate Citizen granting consent from their phone
    await new Promise(r => setTimeout(r, 3000));
    setStep(4); // Decrypting
    
    await new Promise(r => setTimeout(r, 1500));
    setStep(5); // Show Document
    toast.success("DigiLocker Vault Decrypted Successfully");
  };

  const resetFlow = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center bg-background/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground font-heading font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              National KYC Vault (DigiLocker)
            </div>
            <button onClick={resetFlow} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <p className="text-sm text-muted-foreground">Request verifiable digital documents directly from the citizen's government-linked vault via SMS consent.</p>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Citizen Aadhaar / Virtual ID</label>
                  <input 
                    type="text" 
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={handleRequest}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg text-sm font-bold shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all mt-4"
                >
                  <Smartphone className="w-4 h-4" /> Initiate SMS Consent Request
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="relative">
                  <Smartphone className="w-12 h-12 text-primary" />
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full"
                  />
                </div>
                <h3 className="font-bold text-lg">Dispatching Secure SMS...</h3>
                <p className="text-xs text-muted-foreground">Routing request through NIC SMS Gateway</p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                <Loader2 className="w-12 h-12 text-indra-amber animate-spin" />
                <h3 className="font-bold text-lg">Awaiting Citizen Approval</h3>
                <p className="text-xs text-muted-foreground">An OTP link has been sent to the citizen's registered mobile device. Awaiting biometric confirmation.</p>
                <div className="text-[10px] font-mono text-muted-foreground mt-4 animate-pulse">Session expires in 04:59</div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-emerald-500 absolute" />
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: "100%" }} 
                    transition={{ duration: 1.5 }}
                    className="absolute bottom-0 w-full bg-emerald-500 overflow-hidden flex items-center justify-center"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                  >
                     <Check className="w-8 h-8 text-white min-w-8 min-h-8" />
                  </motion.div>
                </div>
                <h3 className="font-bold text-lg text-emerald-500">Consent Granted!</h3>
                <p className="text-xs text-muted-foreground">Decrypting AES-256 vault payload from MeitY servers...</p>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                       <FileText className="w-5 h-5 text-primary" /> Verified Beneficiary Record
                    </h3>
                    <p className="text-xs text-muted-foreground">Hash: 0x8F92...4A1B • Immutable</p>
                  </div>
                  <StatusBadge status="stable" />
                </div>
                
                <div className="bg-muted/30 border border-emerald-500/30 rounded-xl p-4 space-y-3 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-5">
                    <CheckCircle2 className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-4 border-b border-border/50 pb-3">
                    <div className="w-16 h-16 bg-slate-200 rounded-md overflow-hidden flex-shrink-0">
                       <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop" alt="Citizen" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Ramesh Kumar</h4>
                      <p className="text-xs font-mono text-muted-foreground">VID: 9876-5432-1098</p>
                      <p className="text-xs text-muted-foreground">DOB: 12-05-1984</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">PM-KISAN Status</span>
                      <p className="font-medium text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Eligible (Active)</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Income Certificate</span>
                      <p className="font-medium">₹1,20,000 / annum</p>
                    </div>
                  </div>
                </div>

                <button onClick={resetFlow} className="w-full border border-border hover:bg-muted py-2.5 rounded-lg text-sm font-semibold transition-all">
                  Close Record
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
