import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface Props {
  params: Promise<{
    filename: string;
  }>;
}

export default async function PDFViewerPage({ params }: Props) {
  // Await the params completely
  const { filename } = await params;
  
  // URL to the raw file on GitHub
  const rawUrl = `https://raw.githubusercontent.com/unstory-app/storix/main/pdfs/${encodeURIComponent(filename)}`;
  
  // Use jsdelivr to ensure correct content-type header for some embeds or use Google Docs Viewer
  const jsdelivrUrl = `https://cdn.jsdelivr.net/gh/unstory-app/storix@main/pdfs/${encodeURIComponent(filename)}`;
  
  // Using Google Docs Viewer for robust embedding across devices
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(jsdelivrUrl)}&embedded=true`;

  const cleanName = filename.replace(/_/g, ' ').replace(/\.(pdf|pptx)$/i, '');

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-72px)]">
      <div className="flex items-center justify-between p-4 glass-panel border-b border-border-subtle shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/pdfs" className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-text-secondary hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold text-white truncate max-w-[200px] md:max-w-md">
            {cleanName}
          </h1>
        </div>
        
        <a 
          href={rawUrl}
          target="_blank"
          rel="noopener noreferrer" 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface hover:bg-surface-hover text-sm font-medium text-white transition-colors"
        >
          <span className="hidden md:inline">Download</span>
          <ExternalLink size={16} />
        </a>
      </div>
      
      <div className="flex-1 w-full bg-black/50 relative">
        <iframe
          src={viewerUrl}
          className="absolute inset-0 w-full h-full border-none"
          title={cleanName}
          allowFullScreen
        />
      </div>
    </div>
  );
}
