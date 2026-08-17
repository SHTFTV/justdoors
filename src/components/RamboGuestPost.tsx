import React from 'react';
import {
  Quote,
  Phone,
  Mail,
  ArrowRight,
  ArrowUpRight,
  DoorOpen,
  Flame,
  Ruler,
  ShieldCheck,
  MapPin,
  PenLine,
  CheckCircle2,
} from 'lucide-react';

interface RamboGuestPostProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenMarketing?: () => void;
}

const SERVICE_CITIES = [
  'Vancouver', 'Burnaby', 'Surrey', 'Richmond', 'New Westminster', 'Coquitlam',
  'Port Coquitlam', 'Port Moody', 'Maple Ridge', 'Langley', 'White Rock', 'Delta',
  'West Vancouver', 'North Vancouver', 'Abbotsford', 'Chilliwack', 'Mission',
];

const INSTALL_PILLARS = [
  {
    icon: Flame,
    title: 'Fire-Rated Hanging',
    body: 'Field-labelled 20-minute to 3-hour assemblies hung to NFPA 80 clearances — undercut, gap, and positive-latch verified for AHJ inspection.',
  },
  {
    icon: Ruler,
    title: 'Frame & Opening Prep',
    body: 'Hollow-metal and kerfed wood frames set plumb and square, anchored to steel-stud rough openings with the correct backing before board.',
  },
  {
    icon: ShieldCheck,
    title: 'Hardware & Closer Set',
    body: 'Grade 1 mortise, panic devices, closers, and drop seals installed to template — reveal, swing, and ADA opening force dialed in on site.',
  },
];

export const RamboGuestPost: React.FC<RamboGuestPostProps> = ({
  onOpenQuoteModal,
  onOpenMarketing,
}) => {
  return (
    <section
      id="rambo-guest-post"
      className="py-20 sm:py-24 bg-gradient-to-b from-neutral-950 via-neutral-900/40 to-neutral-950 border-b border-neutral-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Guest Post label */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wide">
              <PenLine className="w-3.5 h-3.5" />
              <span>Guest Post — Lower Mainland Install Partner</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.05]">
              Door installation is its own trade.
              <span className="block text-amber-400">Meet Rambo Wall &amp; Ceiling.</span>
            </h2>
          </div>

          {/* Byline card */}
          <div className="shrink-0 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-3 min-w-[240px]">
            <div className="w-11 h-11 rounded-xl bg-amber-500 flex items-center justify-center text-neutral-950 font-black text-lg shrink-0">
              R
            </div>
            <div className="text-xs leading-tight">
              <div className="text-neutral-400 font-mono uppercase text-[10px]">Written by</div>
              <div className="text-white font-bold">Mason McKenzie</div>
              <a
                href="https://rambowalls.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-semibold"
              >
                Rambo Wall &amp; Ceiling Ltd <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Editorial body */}
          <article className="lg:col-span-7 space-y-5 text-[15px] leading-relaxed text-neutral-300">
            <div className="relative pl-5 border-l-2 border-amber-500/60">
              <Quote className="w-5 h-5 text-amber-400 mb-2" />
              <p className="text-lg text-white font-medium italic">
                "A door is only as good as the day it gets hung. The best fire-rated leaf in the
                building fails inspection if the gap, the undercut, or the latch throw is wrong."
              </p>
            </div>

            <p>
              We're <strong className="text-white">Rambo Wall &amp; Ceiling</strong>, a Lower Mainland
              interior trade crew — steel-stud framing, drywall, and ceilings. Over hundreds of
              multi-family and commercial jobs from <strong className="text-white">West Vancouver to
              Abbotsford</strong>, we kept running into the same gap: the doors show up, and nobody on
              site is set up to hang them <em>to code</em>. So we made it our niche.
            </p>

            <p>
              Hanging a labelled door is not the same as screwing on a slab. Frames have to be set
              plumb and square against the steel-stud rough opening, with the right backing behind
              every hinge and strike. Fire assemblies have to hit NFPA 80 clearances — the
              perimeter gap, the bottom undercut, and a latch that positively throws under pressure.
              Get one of those wrong and the AHJ red-tags the opening.
            </p>

            <p>
              That's why <strong className="text-white">Just Doors supplies, and we install.</strong> The
              door package, hardware schedule, and fire ratings come from Just Doors' estimating
              desk; our crews set the frames, hang the leaves, and template the hardware so the
              opening passes the first time. One accountable partner for the trade that ties the
              wall together.
            </p>

            {/* Install pillars */}
            <div className="grid sm:grid-cols-3 gap-3 pt-3">
              {INSTALL_PILLARS.map((p) => (
                <div key={p.title} className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                    <p.icon className="w-4 h-4" />
                    <span>{p.title}</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>

            {/* Cities served */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 uppercase">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Door installs across the Lower Mainland</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SERVICE_CITIES.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar: contact Rambo + network link */}
          <aside className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-amber-500/40 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold uppercase">
                <DoorOpen className="w-4 h-4" />
                <span>Book the Install Crew</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Got a door package landing on a Lower Mainland site? Mason schedules the hang, sets
                the frames, and hits your inspection window.
              </p>

              <div className="space-y-2.5">
                <a
                  href="tel:7787732790"
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Mason — 778-773-2790</span>
                </a>
                <a
                  href="mailto:rambowallceiling@gmail.com"
                  className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>rambowallceiling@gmail.com</span>
                </a>
                <button
                  onClick={() => onOpenQuoteModal('commercial')}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-amber-300 border border-amber-500/40 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Get a Door + Install Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://rambowalls.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Visit rambowalls.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>

              <ul className="pt-1 space-y-1.5 text-xs text-neutral-400">
                {['GST-registered, insured & code-accountable', 'One partner for supply + install', 'First-time inspection pass focus'].map((li) => (
                  <li key={li} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Network / marketing back-link (B2B) */}
            <button
              onClick={onOpenMarketing}
              className="w-full text-left p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/50 transition-colors group"
            >
              <div className="text-[10px] font-mono uppercase text-neutral-500 mb-1">Trade &amp; Marketing Network</div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  Want a guest post &amp; niche site like this?
                </span>
                <ArrowUpRight className="w-4 h-4 text-amber-400 shrink-0" />
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                See how Builderhaus builds and markets trade brands →
              </p>
            </button>
          </aside>

        </div>
      </div>
    </section>
  );
};
