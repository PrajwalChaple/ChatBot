import { useState } from 'react';
import { Cpu, ArrowRight, Zap, Users, Code2, Brain } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const stats = [
  { value: '4 Modes', label: 'Adaptive Intelligence', icon: Brain },
  { value: 'Multi-Lang', label: 'C / Java / JS / SQL', icon: Code2 },
  { value: 'IT Dept', label: 'Exclusive Architecture', icon: Users },
  { value: 'Lightning', label: 'Powered by Gemini AI', icon: Zap },
];

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen premium-bg text-[#E8E8EA] overflow-x-hidden font-sans selection:bg-sky-500/30">
      {/* ── Navbar ── */}
      <nav className="relative z-50 border-b border-white/5 bg-[#030712]/30 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300">
              <Cpu className="w-6 h-6 text-[#030712] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-bold text-xl tracking-widest text-white uppercase flex items-center gap-2">
              Nexus <span className="text-sky-400 font-light">AI</span>
            </span>
          </div>

          <div className="hidden lg:flex flex-row items-center justify-center space-x-12 absolute left-1/2 -translate-x-1/2">
            <a className="nav-link hover:text-sky-400">Process</a>
            <a className="nav-link hover:text-sky-400">Services</a>
            <a className="nav-link hover:text-sky-400">Benefits</a>
            <a className="nav-link hover:text-sky-400">Plans</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">Sign In</button>
            <button onClick={onStart} className="btn-primary-outline hidden md:block">
              Try It Out
            </button>
            <button onClick={onStart} className="md:hidden btn-primary-outline px-5">
              Try
            </button>
          </div>
          
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative z-10 min-h-[calc(100vh-96px)] flex flex-col justify-center items-center py-20 lg:py-0 overflow-hidden">
        
        {/* Spotlights and Rays */}
        <div className="light-rays" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-20">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/20 bg-sky-400/5 backdrop-blur-md mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
            <span className="text-sky-300 text-xs font-semibold tracking-wider uppercase">IT Department Core Online</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[84px] font-extrabold tracking-tight text-white leading-[1.05] mb-8 animate-fade-in-up animate-delay-100 uppercase">
            Transform Your<br />
            Workflows With <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
              AI Automation
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-2xl leading-relaxed mb-16 max-w-3xl mx-auto animate-fade-in-up animate-delay-200 font-light">
            We've successfully synchronized our operations with the<br className="hidden md:block"/>
            Department Protocol using our predeclared AI models.
          </p>

          <div className="relative animate-fade-in-up animate-delay-300 mt-12 mb-32 h-[320px] flex items-center justify-center">
            <div className="glowing-ring-container absolute inset-0 m-auto">
              <div className="glowing-ring-1" />
              <div className="glowing-ring-2" />
              <div className="glowing-ring-core" />
              
              <div className="relative z-30 flex flex-col items-center justify-center">
                <button
                  onClick={onStart}
                  className="group px-8 py-3.5 rounded-full border border-sky-400/40 hover:border-sky-300 bg-sky-500/10 hover:bg-sky-400/20 text-sky-100 text-sm font-semibold tracking-wide uppercase transition-all duration-300 backdrop-blur-xl shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.6)] flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Enter Nexus <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-sky-400/10 to-sky-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                </button>
                <div className="mt-4 text-xs font-mono text-sky-400/60 uppercase tracking-widest text-center">
                  Secure Access<br/>Whitepaper
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent pt-32 pb-8 z-30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up animate-delay-400">
            {stats.map((s, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-lg border border-white/5 hover:border-sky-500/30 rounded-2xl p-6 text-center transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto rounded-xl bg-sky-950/50 border border-sky-800/50 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-300">
                  <s.icon className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">{s.value}</div>
                <div className="text-xs lg:text-sm text-slate-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest mb-4">IT DEPT INTELLIGENCE CORE · AUTHORIZED PERSONNEL ONLY</p>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>Designed</span>
              <span className="select-none">&amp;</span>
              <span>Developed by</span>
              <span className="text-sky-400 font-semibold tracking-wider">Prajwal Chaple</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
