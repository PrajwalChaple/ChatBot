import { useState, useEffect, useRef } from 'react';
import { Hexagon, ArrowRight, Zap, Shield, Code2, Terminal, Search, GraduationCap, MessageSquare, ChevronRight, Globe, Sparkles, Lock, BarChart3 } from 'lucide-react';

interface Props {
  onStart: () => void;
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            setCount(current);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

export default function LandingPage({ onStart }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#020617]/90 backdrop-blur-2xl border-b border-white/[0.04] py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Hexagon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Aura</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[13px] text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#how" className="text-[13px] text-slate-400 hover:text-white transition-colors">How it works</a>
            <a href="#stats" className="text-[13px] text-slate-400 hover:text-white transition-colors">Why Aura</a>
          </div>

          <button onClick={onStart} className="group px-5 py-2 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center gap-1.5">
            Get Started <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/images/hero-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/70 to-[#020617]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in-up">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 text-xs font-medium">Powered by Gemini AI · Live Web Search</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 animate-fade-in-up animate-delay-100">
            The AI that finds your<br />
            <span className="hero-gradient-text">college resources</span><br />
            in seconds.
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Tell Aura your college name. Ask for syllabus PDFs, faculty info, placement stats — it searches the internet and brings you real, verified answers with direct links.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up animate-delay-300">
            <button onClick={onStart} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-[0_0_60px_rgba(255,255,255,0.15)]">
              Start a conversation <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#how" className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-white/80 font-medium transition-all flex items-center justify-center">
              See how it works
            </a>
          </div>

          {/* Browser mockup showing a REAL chat */}
          <div className="mt-16 sm:mt-20 relative mx-auto max-w-3xl animate-fade-in-up animate-delay-400">
            <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-2xl" />
            <div className="relative rounded-2xl bg-[#0a0f1e] border border-white/[0.06] shadow-2xl overflow-hidden">
              {/* Browser bar */}
              <div className="h-10 border-b border-white/[0.04] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
              </div>
              {/* Chat content */}
              <div className="p-5 sm:p-6 space-y-4 text-left">
                <div className="flex gap-3 justify-end">
                  <div className="bg-indigo-600 px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm text-white max-w-xs">
                    My college is GHRCE Nagpur. Give me IT branch 3rd semester syllabus PDF.
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-md bg-indigo-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Hexagon className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="bg-[#111827] border border-white/[0.04] px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm text-slate-300 max-w-sm space-y-2">
                    <p>Here's the IT 3rd semester syllabus for GHRCE Nagpur:</p>
                    <p className="text-indigo-400 underline text-xs break-all">📄 ghrce.raisoni.net/syllabus/IT-Sem3.pdf</p>
                    <p className="text-xs text-slate-500">Source: Official GHRCE website via Google Search</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section id="stats" className="py-16 border-y border-white/[0.04] bg-[#030817]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 10000, suffix: '+', label: 'Queries answered' },
            { value: 50, suffix: '+', label: 'Colleges supported' },
            { value: 99, suffix: '%', label: 'Search accuracy' },
            { value: 2, suffix: 's', label: 'Avg response time' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Three steps. Real answers.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {[
              { num: '01', icon: GraduationCap, title: 'Set your college', desc: 'Just type your college name naturally. Aura remembers it for the whole conversation.' },
              { num: '02', icon: Search, title: 'Ask your question', desc: 'Syllabus PDFs, faculty contacts, placement stats, exam schedules — ask anything.' },
              { num: '03', icon: Globe, title: 'Get verified answers', desc: 'Aura searches Google, finds official links, and delivers answers with direct sources.' },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-[80px] font-extrabold text-white/[0.03] absolute -top-6 -left-2 select-none">{item.num}</div>
                <div className="relative z-10 pt-8">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center mb-5 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/20 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 md:py-32 relative">
        <div className="absolute inset-0">
          <img src="/images/features-bg.png" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-[#020617]/80" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">More than a chatbot.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Aura combines Gemini AI with live Google Search to deliver capabilities no ordinary chatbot can match.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Search, title: "Live Web Search", desc: "Searches Google in real-time to find official PDFs, documents, and institutional data." },
              { icon: GraduationCap, title: "College Assistant", desc: "Remember your college across the conversation and answer all institutional queries." },
              { icon: Shield, title: "Code Security Audit", desc: "Detects SQL injection, XSS, buffer overflows, and memory leaks. Returns patched code." },
              { icon: Terminal, title: "Multi-Language Debugger", desc: "Fixes bugs in C, Java, JavaScript, Python, and SQL with detailed explanations." },
              { icon: Sparkles, title: "ChatGPT Zero-G Mode", desc: "Explains complex topics using fun space-themed analogies. Triggers a special visual mode." },
              { icon: Lock, title: "Privacy First", desc: "Your conversations are not stored. No tracking, no analytics. Just you and Aura." },
              { icon: Zap, title: "Sub-Second Responses", desc: "Built on Gemini 2.5 Flash — the fastest AI model available. Near-instant answers." },
              { icon: Code2, title: "Markdown Rich Output", desc: "Tables, code blocks, links, bold text — responses are beautifully formatted." },
              { icon: BarChart3, title: "Smart Context Memory", desc: "Aura remembers your entire conversation. No need to repeat yourself." },
            ].map((f, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.04] hover:border-indigo-500/15 rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.04] group">
                <f.icon className="w-5 h-5 text-indigo-400 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial / Use case ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-indigo-950/40 to-[#020617] border border-indigo-500/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-6">Real use case</p>
              <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-6">
                "I told Aura my college name, asked for the Data Structures syllabus, and it pulled the exact PDF from the official university website in 2 seconds. This is insane."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold text-sm">S</div>
                <div>
                  <div className="text-sm font-medium text-white">Student</div>
                  <div className="text-xs text-slate-500">IT Department, 3rd Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ready to try Aura?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">No sign up. No credit card. Just tell it your college name and start asking.</p>
          <button onClick={onStart} className="group px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all inline-flex items-center gap-2 shadow-[0_0_80px_rgba(99,102,241,0.25)] hover:shadow-[0_0_100px_rgba(99,102,241,0.35)]">
            Launch Aura <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
              <Hexagon className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-slate-300">Aura AI</span>
            <span className="text-slate-600">·</span>
            <span>© 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Designed & Developed by</span>
            <span className="text-indigo-400 font-semibold">Prajwal Chaple</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
