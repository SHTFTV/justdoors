import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Building2, 
  Flame, 
  Volume2, 
  FileSpreadsheet, 
  Bot, 
  User, 
  RefreshCw, 
  Check, 
  HelpCircle,
  Wrench,
  BookOpen
} from 'lucide-react';

interface AIDoorAssistantProps {
  onOpenScheduleModal?: () => void;
  onOpenQuoteModal?: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
}

export const AIDoorAssistant: React.FC<AIDoorAssistantProps> = ({
  onOpenScheduleModal,
  onOpenQuoteModal,
}) => {
  const [prompt, setPrompt] = useState('');
  const [sector, setSector] = useState<'high-rise' | 'commercial' | 'residential'>('high-rise');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `Hello! I am your **Just Doors Architectural Specification & Code Consultant**. \n\nAsk me any question regarding **UL 10C fire ratings, STC acoustic thresholds, high-rise suite entry hardware schedules, or hollow metal vs wood core assemblies**. \n\n*What project requirements are you specifying today?*`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'What door fire rating is required for a 35-storey condo unit entry under NFPA 80 / IBC?',
    'Recommend an acoustic STC 38+ door specification with automatic drop seals.',
    'Compare 16-gauge hollow metal vs wood mineral core for high-rise fire stairwells.',
    'What hardware schedule is required for commercial panic exit egress corridors?',
  ];

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = { role: 'user' as const, content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/door-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          sector,
          context: { brand: 'Just Doors', website: 'justdoors.co', focus: '100% doors only' },
        }),
      });

      const data = await response.json();
      const assistantMsg = {
        role: 'assistant' as const,
        content: data.text || 'Unable to generate specification recommendation.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Our architectural spec consultant is momentarily offline. You can email your door schedule directly to build@buildershaus.com or click "Send Us Your Door Schedule" above for a rapid manual takeoff!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      id="ai-door-assistant"
      className="py-20 bg-neutral-950 border-b border-neutral-800"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Code & Specification Assistant</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Ask Our Architectural Door Consultant
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Need clarity on fire ratings (20/45/90-min), acoustic STC drop sweeps, panic egress compliance, or high-rise door schedules? Get instant code-backed answers.
          </p>
        </div>

        {/* Chat Container */}
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col h-[560px]">
          
          {/* Top Bar */}
          <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Just Doors Spec Engine</span>
                  <span className="text-[9px] bg-emerald-950 border border-emerald-800 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                    ONLINE
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  NFPA 80 • UL 10C • IBC 2024 • ADA Standard
                </div>
              </div>
            </div>

            {/* Sector Selector */}
            <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs">
              <button
                onClick={() => setSector('high-rise')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  sector === 'high-rise'
                    ? 'bg-amber-500 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                High-Rise
              </button>
              <button
                onClick={() => setSector('commercial')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  sector === 'commercial'
                    ? 'bg-amber-500 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Commercial
              </button>
              <button
                onClick={() => setSector('residential')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  sector === 'residential'
                    ? 'bg-amber-500 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Residential
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-neutral-900/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-amber-500 text-neutral-950 font-medium'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-200 shadow-sm'
                  }`}
                >
                  {m.content}
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-center text-neutral-400 text-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center animate-spin">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span>Consulting architectural door codes & hardware guidelines...</span>
              </div>
            )}
          </div>

          {/* Suggested Quick Prompts */}
          <div className="px-6 py-2 bg-neutral-950/80 border-t border-neutral-800 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
            <span className="text-neutral-500 font-mono shrink-0">Try:</span>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-neutral-950 border-t border-neutral-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about door specifications, fire ratings, STC acoustics, or hardware sets..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
              />

              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
