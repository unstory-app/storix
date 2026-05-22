import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-white/5 mt-20">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-black text-white tracking-tighter">Wify<span className="text-primary">.my</span> <span className="text-text-muted text-lg">/</span> unstory<span className="text-primary">.live</span></span>
          <p className="text-xs text-text-muted">Built for the love of reading.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <Link 
            href="https://github.com/unstory-app/storix/tree/main/pdfs" 
            target="_blank"
            className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-white transition-colors"
          >
            <ExternalLink size={16} />
            PDFs (Coming Soon)
          </Link>
          <Link 
            href="https://github.com/unstory-app/storix" 
            target="_blank"
            className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-white transition-colors"
          >
            <ExternalLink size={16} />
            Contribute Stories
          </Link>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-text-muted font-medium">
          <span>© 2026 Wify.my / unstory.live. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
