import { useState, useEffect } from 'react';
import { Hexagon, ArrowRight, Zap, Shield, Code2, Terminal, Search, GraduationCap, MessageSquare } from 'lucide-react';

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
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Hexagon className="w-7 h-7 text-indigo-400" />
            <span className="font-bold text-lg text-white">Aura</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#how" className="text-sm text-slate-400 hover:text-white transition-colors">How it works</a>
          </div>

          <button onClick={onStart} className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors flex items-center gap-2">
            Open Chat <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 text-xs font-medium">Powered by Gemini AI with Live Search</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Your AI assistant that<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              actually searches the web
            </span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Tell Aura your college name, and it will find your syllabus PDFs, faculty info, and more from the internet. It also helps with code debugging, security audits, and general questions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={onStart} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors flex items-center justify-center gap-2">
              Start Chatting <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#features" className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-white font-medium transition-colors flex items-center justify-center">
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="py-20 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">How it works</h2>
          <p className="text-slate-400 text-center mb-12 max-w-lg mx-auto">Three simple steps to get college-specific answers from the web.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Set your college', desc: 'Tell Aura your college name. Example: "My college is GHRCE Nagpur"', icon: GraduationCap },
              { step: '02', title: 'Ask anything', desc: 'Ask about syllabus, faculty, placements, events — anything about your college.', icon: Search },
              { step: '03', title: 'Get real answers', desc: 'Aura searches the internet and gives you direct links to PDFs, websites, and resources.', icon: MessageSquare },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="text-xs font-mono text-indigo-400 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-4">What Aura can do</h2>
          <p className="text-slate-400 text-center mb-14 max-w-lg mx-auto">More than just a chatbot — it's a real assistant backed by live web search.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Search, title: "Live Web Search", desc: "Searches Google in real-time to find syllabus PDFs, official links, and college resources." },
              { icon: GraduationCap, title: "College Assistant", desc: "Set your college once, then ask anything — syllabus, faculty, placements, events, results." },
              { icon: Shield, title: "Code Security Audit", desc: "Paste your code and get a white-hat security analysis — SQL injection, XSS, memory leaks flagged." },
              { icon: Terminal, title: "Debug Assistant", desc: "Struggling with C, Java, JS, Python, or SQL? Get instant fixes with clear explanations." },
              { icon: Code2, title: "Multi-Language Support", desc: "Works with C, Java, JavaScript, Python, SQL, and more. Polyglot by design." },
              { icon: Zap, title: "Instant Responses", desc: "Powered by Gemini 2.5 Flash for lightning-fast, accurate answers every time." },
            ].map((f, i) => (
              <div key={i} className="bg-[#0f172a]/40 border border-white/5 hover:border-indigo-500/20 rounded-2xl p-6 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <f.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Ready to try it?</h2>
          <p className="text-slate-400 mb-8">Just tell Aura your college name and start asking questions. It's that simple.</p>
          <button onClick={onStart} className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors inline-flex items-center gap-2">
            Launch Aura <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Hexagon className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold text-slate-300">Aura AI</span>
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
