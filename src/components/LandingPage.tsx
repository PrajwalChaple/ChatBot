import { useState } from 'react';
import { BookOpen, Shield, Terminal, Rocket, Cpu, ArrowRight, Zap, Users, Code2, Brain } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const features = [
  {
    icon: BookOpen,
    title: 'Departmental Navigator',
    desc: 'Instant answers on IT syllabus, faculty contacts, lab schedules, academic deadlines, and departmental policies.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Shield,
    title: 'Code Security Audit',
    desc: 'Paste your code and get a white-hat security analysis — SQL injection, XSS, memory leaks, buffer overflows flagged with patches.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Terminal,
    title: 'Debug Assistant',
    desc: 'Struggling with C, Java, JavaScript, or SQL? Nexus identifies syntax errors, logic faults, and provides corrected code instantly.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Rocket,
    title: 'ChatGPT Mode',
    desc: 'Type ChatGPT and any concept to get a cosmic, zero-gravity explanation — a unique easter egg baked into the core.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
];

const stats = [
  { value: '4', label: 'Modes', icon: Brain },
  { value: 'C / Java / JS / SQL', label: 'Languages supported', icon: Code2 },
  { value: 'IT Dept', label: 'Built for', icon: Users },
  { value: 'Fast', label: 'Powered by Gemini', icon: Zap },
];

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E8E8EA] overflow-x-hidden">
      {/* Radial hero glow */}
      <div className="hero-gradient absolute inset-0 pointer-events-none" />

      {/* ── Navbar ── */}
      <nav className="relative z-10 border-b border-white/[0.06] sticky top-0 bg-[#0E0E10]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">Nexus</span>
            <span className="text-[#4a4a55] text-sm">/</span>
            <span className="text-[#6b6b78] text-xs">IT Dept AI</span>
          </div>
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all duration-200"
          >
            Open Chat
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="badge mb-6 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
            IT Department — Information Technology
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 animate-fade-in-up">
            Your AI Assistant
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300">
              for the IT Department
            </span>
          </h1>

          <p className="text-[#8888a0] text-lg leading-relaxed mb-10 max-w-xl mx-auto animate-fade-in-up animate-delay-100">
            Nexus is an intelligent assistant built for IT students and faculty. Ask about your syllabus, audit your code for vulnerabilities, or debug in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up animate-delay-200">
            <button
              onClick={onStart}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30"
            >
              Start Chatting
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] text-[#c0c0d0] text-sm font-medium transition-all duration-200"
            >
              See Features
            </button>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-fade-in-up animate-delay-300">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#141418] border border-white/[0.06] rounded-2xl p-5 text-center">
              <s.icon className="w-4 h-4 text-indigo-400 mx-auto mb-2 opacity-70" />
              <div className="text-lg font-semibold text-white">{s.value}</div>
              <div className="text-xs text-[#6b6b78] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <div id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Everything you need</h2>
          <p className="text-[#6b6b78] text-sm max-w-md mx-auto">
            Four powerful modes, all accessible from a single conversation interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="feature-card group animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[#6b6b78] leading-6">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ── How to use ── */}
        <div className="mt-16 bg-[#111115] border border-white/[0.07] rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-2">How to use Nexus</h2>
          <p className="text-[#6b6b78] text-sm mb-8">Three ways to get help instantly.</p>

          <div className="space-y-5">
            {[
              { step: '01', title: 'Ask anything about IT', example: '"What is the syllabus for Semester 4?"', color: 'text-blue-400' },
              { step: '02', title: 'Paste code for security audit', example: '"Audit this: SELECT * FROM users WHERE name=\'" + input + "\'"', color: 'text-violet-400' },
              { step: '03', title: 'Use ChatGPT for fun explanations', example: '"ChatGPT explain what is a pointer"', color: 'text-cyan-400' },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 items-start">
                <div className={`text-xs font-mono font-bold ${item.color} opacity-60 mt-1 w-6 shrink-0`}>{item.step}</div>
                <div>
                  <div className="text-sm font-medium text-white mb-1">{item.title}</div>
                  <code className="text-xs text-[#6b6b78] font-mono">{item.example}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mt-12 text-center">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/30 text-sm"
          >
            Launch Nexus
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[#4a4a55] text-[10px] mt-4 font-mono uppercase tracking-widest mb-6">IT DEPT INTELLIGENCE CORE · AUTHORIZED PERSONNEL ONLY</p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#6b6b78]">
            <span>Designed</span>
            <span className="select-none">&amp;</span>
            <span>Developed by</span>
            <span className="text-indigo-400 font-medium">Prajwal Chaple</span>
          </div>
        </div>
      </div>
    </div>
  );
}
