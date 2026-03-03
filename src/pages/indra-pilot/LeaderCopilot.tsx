import { Users, FileText, Mic, BookOpen, Sparkles, UploadCloud, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const briefingExample = {
  title: "Daily Intelligence Briefing — March 9, 2026",
  sections: [
    { heading: "Weather & Climate", content: "Heavy rainfall warning issued for Assam and Meghalaya. IMD predicts 200mm rainfall in next 48 hours. Brahmaputra river levels rising — flood alert for 3 districts." },
    { heading: "Economy & Markets", content: "Rice prices up 3.2% in Maharashtra mandis. Onion supply chain disruption detected in Nashik. PM-KISAN disbursement cycle on track." },
    { heading: "Citizen Sentiment", content: "Water supply complaints up 18% in UP. Healthcare access issues trending in rural Bihar. Overall citizen satisfaction index at 68%." },
    { heading: "Recommended Actions", content: "1. Activate flood preparedness in Assam\n2. Monitor rice price trajectory\n3. Deploy additional water tankers in UP affected areas" },
  ],
};

const meetingNotes = [
  { time: "10:00 AM", title: "Inter-ministerial coordination meeting", actionItems: ["Review flood preparedness", "Approve emergency fund release", "Coordinate with NDRF"] },
  { time: "2:00 PM", title: "PM-KISAN review meeting", actionItems: ["Enrollment target review", "Beneficiary verification status", "Next disbursement timeline"] },
];

export default function LeaderCopilot() {
  const [activeTab, setActiveTab] = useState<"briefing" | "speech" | "document" | "meeting">("speech");

  // Speech Generator State
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("Press Conference");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSpeech, setGeneratedSpeech] = useState("");

  // Document Summarizer State
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "extracting" | "done">("idle");
  const [docSummary, setDocSummary] = useState<any>(null);

  // --- Speech Generation via Real AI ---
  const handleGenerateSpeech = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setGeneratedSpeech("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/pilot/generate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, audience }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate speech. Is the Python backend running?");
      }

      const data = await response.json();

      // Simulate streaming for the real AI response
      const fullSpeech = data.speech || "No speech generated.";
      let i = 0;
      const interval = setInterval(() => {
        setGeneratedSpeech(prev => prev + fullSpeech.charAt(i));
        i++;
        if (i === fullSpeech.length) {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 10); // 10ms per character for typewriting effect

    } catch (error) {
      console.error(error);
      setGeneratedSpeech("Connection error. Ensure the FastAPI backend is running on port 8000 and the GEMINI_API_KEY is set in backend/.env.");
      setIsGenerating(false);
    }
  };

  // --- Document Upload Simulation ---
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setUploadStatus("uploading");

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      setUploadStatus("extracting");
      const response = await fetch("http://127.0.0.1:8000/api/pilot/summarize-document", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to summarize document. Is the Python backend running?");
      }

      const data = await response.json();
      setDocSummary(data);
      setUploadStatus("done");

    } catch (error) {
      console.error(error);
      setUploadStatus("done");
      setDocSummary({
        title: uploadedFile.name,
        points: [
          "Connection error.",
          "Ensure the FastAPI backend is running on port 8000.",
          "Check that your GEMINI_API_KEY is properly set in backend/.env."
        ],
        action: "Start the backend server using 'uvicorn main:app --reload'."
      });
    }
  };

  return (
    <div className="space-y-6 animate-slide-up pb-20">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-indra-purple" /> INDRA PILOT
        </h1>
        <p className="text-sm text-muted-foreground">AI Co-Pilot for Public Administrators (Document Summarizer & Speech Drafter)</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1 bg-muted/50 rounded-xl overflow-x-auto">
        {[
          { id: "speech" as const, label: "Speech Generator", icon: Mic },
          { id: "document" as const, label: "Document Summarizer", icon: FileText },
          { id: "briefing" as const, label: "Daily Briefing", icon: BookOpen },
          { id: "meeting" as const, label: "Meeting Intel", icon: Sparkles },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab.id
              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indra-purple' : ''}`} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">

          {/* FUNCTIONAL SPEECH TAB */}
          {activeTab === "speech" && (
            <motion.div key="speech" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="indra-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indra-purple/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-indra-purple" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">AI Speech Drafter</h3>
                  <p className="text-xs text-muted-foreground">Drafts grounded speeches instantly using the Knowledge Graph.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold mb-1.5 block text-foreground">What is the topic?</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={e => setTopic(e.target.value)}
                      placeholder="e.g., Launching the new PM-KISAN outreach program in rural UP"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-indra-purple/20 focus:border-indra-purple transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold mb-1.5 block text-foreground">Target Audience</label>
                    <div className="relative">
                      <select
                        value={audience}
                        onChange={e => setAudience(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm appearance-none focus:ring-2 focus:ring-indra-purple/20 focus:border-indra-purple transition-all"
                      >
                        <option>Press Conference</option>
                        <option>Parliament Address</option>
                        <option>Public Rally</option>
                        <option>Internal Department Briefing</option>
                      </select>
                      <ArrowRight className="w-4 h-4 absolute right-4 top-3.5 text-muted-foreground rotate-90" />
                    </div>
                  </div>
                  <button
                    onClick={handleGenerateSpeech}
                    disabled={!topic || isGenerating}
                    className="w-full py-3.5 rounded-xl bg-indra-purple text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-indra-purple/90 transition-all disabled:opacity-50 shadow-md shadow-indra-purple/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {isGenerating ? 'Synthesizing with INDRA CORE...' : 'Generate Draft (8s)'}
                  </button>
                </div>

                <div className="relative">
                  <div className={`h-full min-h-[300px] rounded-xl border ${generatedSpeech ? 'border-indra-purple/30 bg-indra-purple/5' : 'border-dashed border-border bg-muted/30'} p-6 transition-colors`}>
                    {!generatedSpeech && !isGenerating ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                        <FileText className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm">Your drafted speech will appear here.</p>
                      </div>
                    ) : (
                      <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground font-medium">
                          {generatedSpeech}
                        </p>
                        {isGenerating && (
                          <span className="inline-block w-1.5 h-4 ml-1 bg-indra-purple animate-pulse align-middle" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* FUNCTIONAL DOCUMENT TAB */}
          {activeTab === "document" && (
            <motion.div key="doc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="indra-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indra-purple/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indra-purple" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Instant Document Summarizer</h3>
                  <p className="text-xs text-muted-foreground">Upload any 200-page gov PDF. Receive a 3-paragraph summary in 8 seconds.</p>
                </div>
              </div>

              {uploadStatus === "idle" && (
                <div
                  onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all ${dragActive ? 'border-indra-purple bg-indra-purple/5 scale-[1.02]' : 'border-border hover:border-muted-foreground/50'
                    }`}
                >
                  <UploadCloud className={`w-12 h-12 mx-auto mb-4 transition-colors ${dragActive ? 'text-indra-purple' : 'text-muted-foreground'}`} />
                  <p className="text-base font-bold text-foreground mb-1">Drag & drop your file here</p>
                  <p className="text-sm text-muted-foreground mb-6">Supports PDF, DOCX, TXT up to 50MB</p>

                  <label className="cursor-pointer px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors inline-block">
                    Browse Files
                    <input type="file" className="hidden" onChange={handleChange} accept=".pdf,.doc,.docx,.txt" />
                  </label>
                </div>
              )}

              {(uploadStatus === "uploading" || uploadStatus === "extracting") && (
                <div className="border border-border rounded-2xl p-12 text-center bg-muted/30">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-indra-purple border-t-transparent animate-spin"></div>
                    <FileText className="absolute inset-0 m-auto w-6 h-6 text-indra-purple" />
                  </div>
                  <h4 className="font-heading font-bold text-lg mb-2">
                    {uploadStatus === "uploading" ? "Uploading & Encrypting Document..." : "INDRA CORE Extracting Entities..."}
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    {uploadStatus === "uploading" ? "Securing file in the temporary GovCloud vault." : "Feeding unstructured text into the National Knowledge Graph for context alignment."}
                  </p>

                  <div className="max-w-md mx-auto mt-8 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-indra-purple rounded-full"
                      initial={{ width: uploadStatus === "uploading" ? "0%" : "40%" }}
                      animate={{ width: uploadStatus === "uploading" ? "40%" : "95%" }}
                      transition={{ duration: uploadStatus === "uploading" ? 1.5 : 3 }}
                    />
                  </div>
                </div>
              )}

              {uploadStatus === "done" && docSummary && (
                <div className="border border-indra-green/30 bg-indra-green/5 rounded-2xl p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6 pb-6 border-b border-border/50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-5 h-5 text-indra-green" />
                        <span className="text-xs font-bold text-indra-green uppercase tracking-wider">Processing Complete (4.2s)</span>
                      </div>
                      <h4 className="font-heading font-bold text-xl">{docSummary.title}</h4>
                    </div>
                    <button
                      onClick={() => { setUploadStatus("idle"); setFile(null); }}
                      className="text-xs font-semibold text-muted-foreground hover:text-foreground underline underline-offset-4"
                    >
                      Upload Another
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Key Extracted Points</h5>
                      <ul className="space-y-2">
                        {docSummary.points.map((pt: string, i: number) => (
                          <li key={i} className="flex font-medium text-sm leading-relaxed text-foreground bg-background border border-border/50 p-3 rounded-xl gap-3">
                            <span className="w-5 h-5 shrink-0 rounded bg-indra-purple/10 text-indra-purple flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-indra-purple/10 border border-indra-purple/20 p-4 rounded-xl">
                      <h5 className="text-xs font-bold text-indra-purple uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Sparkles className="w-3 h-3" /> Pilot Recommendation
                      </h5>
                      <p className="text-sm font-semibold text-foreground leading-relaxed">{docSummary.action}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STATIC BRIEFING TAB */}
          {activeTab === "briefing" && (
            <motion.div key="briefing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="indra-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading font-bold text-xl">{briefingExample.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Compiled from 500+ national sources</p>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-indra-purple/10 text-indra-purple border border-indra-purple/20 text-xs font-bold flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Auto-Generated
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {briefingExample.sections.map((s, i) => (
                  <div key={s.heading} className={`p-5 rounded-xl border ${i === 3 ? 'bg-primary/5 border-primary/20 md:col-span-2' : 'bg-background border-border shadow-sm'}`}>
                    <h4 className="font-heading font-bold text-sm mb-2 text-foreground">{s.heading}</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{s.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STATIC MEETING TAB */}
          {activeTab === "meeting" && (
            <motion.div key="meeting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              {meetingNotes.map(m => (
                <div key={m.time} className="indra-card p-6 transition-all hover:shadow-md">
                  <div className="flex items-center gap-3 mb-4 border-b border-border/50 pb-4">
                    <span className="px-2.5 py-1 rounded bg-muted text-xs font-bold text-foreground">{m.time}</span>
                    <h4 className="font-heading font-bold text-base">{m.title}</h4>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Extracted Action Items</p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {m.actionItems.map(ai => (
                        <div key={ai} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background">
                          <div className="w-4 h-4 mt-0.5 rounded border border-muted-foreground/30 flex-shrink-0" />
                          <span className="text-sm font-medium text-foreground">{ai}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
