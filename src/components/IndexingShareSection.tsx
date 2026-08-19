import React, { useState } from 'react';
import { Share2, Copy, Check, Pin, MessageCircle } from 'lucide-react';

const SITE_URL = 'https://justdoors.co';
const SHARE_TEXT = 'Just Doors — commercial, high-rise & multi-family door systems for the Lower Mainland';

// Official Google deeplink format (developers.google.com/search/docs/appearance/preferred-sources)
const GOOGLE_PREFERRED_SOURCE_URL = 'https://google.com/preferences/source?q=justdoors.co';

export const IndexingShareSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Just Doors', text: SHARE_TEXT, url: SITE_URL });
      } catch {
        /* user cancelled */
      }
    } else {
      copyLink();
    }
  };

  const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(SITE_URL)}&description=${encodeURIComponent(SHARE_TEXT)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SITE_URL}`)}`;

  return (
    <section className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Share row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={share}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-mono text-sm uppercase tracking-wide transition-colors"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>Share</span>
          </button>
          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-mono text-sm uppercase tracking-wide transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
          <a
            href={pinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-mono text-sm uppercase tracking-wide transition-colors"
          >
            <Pin className="w-4 h-4 text-red-400" />
            <span>Pin It</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-mono text-sm uppercase tracking-wide transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Google preferred source button */}
        <a
          href={GOOGLE_PREFERRED_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-3 py-4 px-5 rounded-2xl border border-amber-500/50 bg-neutral-900/40 hover:bg-neutral-900 hover:border-amber-500 text-neutral-100 transition-colors group"
        >
          <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm font-black shrink-0">
            <span className="bg-gradient-to-r from-blue-500 via-red-500 to-amber-500 bg-clip-text text-transparent">G</span>
          </span>
          <span className="font-mono text-sm uppercase tracking-wide text-neutral-200 group-hover:text-amber-300">
            Add us as a Preferred Source on Google
          </span>
        </a>

        {/* Network footer line */}
        <div className="mt-8 text-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600">
            IAM AI Indexing Section · IAM Publication Network · Industry Army Marketing
          </span>
        </div>
      </div>
    </section>
  );
};
