import React from 'react';
import Link from 'next/link';
import { BookOpen, FileText } from 'lucide-react';

// Revalidate this page every hour
export const revalidate = 3600;

interface GithubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export default async function PDFsPage() {
  let files: GithubFile[] = [];
  try {
    const res = await fetch('https://api.github.com/repos/unstory-app/storix/contents/pdfs?ref=main', {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Wify.my App'
      }
    });

    if (res.ok) {
      files = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch PDFs from GitHub', error);
  }

  // Filter out the README and get only actual files
  const pdfFiles = files.filter(f => f.type === 'file' && f.name !== 'README.md');

  return (
    <div className="flex flex-col px-6 md:px-12 py-10 pb-24">
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          PDFs & Books
        </h1>
        <p className="text-text-secondary text-sm md:text-base max-w-2xl">
          Dive into our exclusive collection of storybooks, romantic thrillers, and illustrated presentations. Always updated automatically from our GitHub repository.
        </p>
      </div>

      {pdfFiles.length === 0 ? (
        <div className="flex items-center justify-center p-12 glass-panel rounded-2xl">
          <p className="text-text-muted">No PDFs available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfFiles.map((file) => {
            const isPdf = file.name.toLowerCase().endsWith('.pdf');
            const cleanName = file.name.replace(/_/g, ' ').replace(/\.(pdf|pptx)$/i, '');

            return (
              <Link 
                key={file.sha} 
                href={`/pdfs/${encodeURIComponent(file.name)}`}
                className="group flex flex-col gap-4 p-6 glass-panel rounded-2xl hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-surface/50 border border-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {isPdf ? (
                    <FileText size={24} className="text-primary" />
                  ) : (
                    <BookOpen size={24} className="text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                    {cleanName}
                  </h3>
                  <p className="text-xs text-text-muted mt-2 font-mono">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
