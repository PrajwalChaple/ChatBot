import { useState, useEffect } from 'react';
import { Hexagon, ArrowRight, Zap, Shield, Cpu, Code2, Sparkles, Terminal, Layers, Activity } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* ── Fixed Navbar ── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl group-hover:bg-indigo-400/40 transition-colors duration-500 rounded-full" />
              <Hexagon className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 relative z-10 transition-transform duration-500 group-hover:rotate-90" />
            </div>
            <span className="font-bold text-xl tracking-widest text-white uppercase flex items-center gap-2">
              AURA <span className="text-slate-500 font-light">AI</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8 bg-white/5 px-6 py-2.5 rounded-full border border-white/5 backdrop-blur-md">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#capabilities" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Capabilities</a>
            <a href="#security" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Security</a>
            <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">Log In</button>
            <button onClick={onStart} className="group relative px-6 py-2.5 rounded-full overflow-hidden flex items-center gap-2">
              <div className="absolute inset-0 bg-indigo-600 group-hover:bg-indigo-500 transition-colors" />
              <span className="relative z-10 text-sm font-semibold text-white">Get Started</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-10 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#020617] to-[#020617]" />
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-300 text-xs font-semibold tracking-wider uppercase">Introducing Aura Engine Core</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[84px] font-extrabold tracking-tight text-white leading-[1.1] mb-8 animate-fade-in-up animate-delay-100">
            Unleash the Power of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300">
              Cognitive Automation
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in-up animate-delay-200">
            Aura AI seamlessly integrates with your existing workflows to provide instant auditing, intelligent debugging, and limitless conversational insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            <button onClick={onStart} className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Launch Aura Console <ArrowRight className="w-5 h-5" />
            </button>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors flex items-center justify-center backdrop-blur-md">
              Explore Capabilities
            </a>
          </div>

          {/* Mockup / Dashboard Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl animate-fade-in-up animate-delay-400">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur-xl opacity-20" />
            <div className="relative rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
              <div className="h-12 border-b border-white/5 flex items-center px-4 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="mx-auto px-4 py-1 rounded bg-black/30 text-xs font-mono text-slate-500 border border-white/5">aura-engine.localhost:3000</div>
              </div>
              <div className="p-8 text-left font-mono text-sm">
                <div className="text-slate-500 mb-2">{'// Initializing Aura Core...'}</div>
                <div className="text-indigo-400 mb-2">{'[SYSTEM] Loading contextual models: OK'}</div>
                <div className="text-indigo-400 mb-2">{'[SYSTEM] Verifying security protocols: SECURE'}</div>
                <div className="text-green-400 mb-4">{'[SYSTEM] Connection Established. Ready for input.'}</div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-violet-400 cursor-blink">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logos ── */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Trusted by Innovative Teams</p>
          <div className="flex flex-wrap justify-center gap-10 opacity-50 grayscale">
            {['Acme Corp', 'GlobalNet', 'Nexus Tech', 'Starlight', 'Vortex AI'].map((name, i) => (
              <div key={i} className="text-xl font-bold font-sans tracking-tight text-white">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for Uncompromising <span className="text-indigo-400">Performance</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Aura is designed from the ground up to provide instantaneous responses, deep codebase integration, and rock-solid security.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Lightning Fast Inference", desc: "Our models are optimized for sub-second response times, ensuring your workflow never stalls." },
              { icon: Shield, title: "Enterprise-grade Security", desc: "Your code and queries never leave our secure enclave. End-to-end encryption by default." },
              { icon: Cpu, title: "Context-Aware Architecture", desc: "Aura remembers your project structure, making debugging multi-file architectures profoundly simple." },
              { icon: Code2, title: "Polyglot Proficiency", desc: "Fluent in C, Java, Python, SQL, JS, and more. A versatile partner for any stack." },
              { icon: Terminal, title: "Instant Refactoring", desc: "Highlight bad code and get optimized, secure, and clean rewrites instantly." },
              { icon: Activity, title: "Real-time Metrics", desc: "Monitor the health and efficiency of your codebase with AI-driven analytics." }
            ].map((f, i) => (
              <div key={i} className="bg-[#0f172a]/50 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <f.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deeper Dive Section ── */}
      <section id="capabilities" className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Analyze. Optimize. Deploy.</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Drop your convoluted SQL queries, memory-leaking C code, or confusing Java stack traces into Aura. Our specialized models parse, understand, and return optimized production-ready code with detailed explanations.
            </p>
            <ul className="space-y-4 mb-8">
              {['Vulnerability detection and patching', 'Automated architectural suggestions', 'Zero-shot explanation generation'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-3 h-3 text-indigo-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={onStart} className="text-indigo-400 font-semibold flex items-center gap-2 hover:text-indigo-300 transition-colors group">
              Try it yourself <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-violet-500/30 blur-2xl rounded-full" />
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 font-bold text-sm text-slate-300">U</div>
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-sm text-sm text-slate-300 w-full">
                  Can you optimize this nested loop?
                  <div className="mt-2 p-2 bg-black/50 rounded text-xs font-mono text-slate-400 border border-white/5">
                    for(int i=0; i&lt;n; i++) {'{\n  '}for(int j=0; j&lt;m; j++) {'{\n    ...'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <Hexagon className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="bg-indigo-950/30 p-4 rounded-2xl rounded-tl-sm text-sm text-slate-200 w-full border border-indigo-500/20">
                  I've analyzed your loop. We can reduce the time complexity from <strong className="text-white">O(n*m)</strong> to <strong className="text-white">O(n+m)</strong> by utilizing a Hash Map approach. Here is the optimized code:
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#020617] pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <Hexagon className="w-8 h-8 text-indigo-500" />
            <span className="font-bold text-2xl tracking-widest text-white uppercase">AURA</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Documentation</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact Support</a>
          </div>

          <div className="w-full h-px bg-white/5 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between w-full text-xs text-slate-500">
            <p>&copy; 2026 Aura AI Inc. All rights reserved.</p>
            <div className="flex items-center gap-1.5 mt-4 md:mt-0">
              <span>Designed &amp; Developed by</span>
              <span className="text-indigo-400 font-semibold">Prajwal Chaple</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
