import React from 'react';
import { useMeal } from '../../context/MealContext';
import { BookOpen, FileText, Download, Calendar, User, FileSpreadsheet } from 'lucide-react';

export const KnowledgeLibraryView: React.FC = () => {
  const { docs } = useMeal();

  const handleDownload = (docTitle: string) => {
    alert(`Downloading ${docTitle} from MEAL Digital Document Repository...`);
  };

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Knowledge Library & Document Center
        </h1>
        <p className="text-xs text-slate-500">
          Central repository for PIRS indicator sheets, safeguarding SOPs, policy guidelines, and evaluation studies
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {docs.map(doc => (
          <div
            key={doc.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
                  {doc.category}
                </span>
                <span className="font-mono text-[10px] font-bold text-slate-400">{doc.fileFormat}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-2">{doc.title}</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{doc.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div>
                <span>{doc.fileSizeMb} MB</span> • <span>{doc.downloadCount} downloads</span>
              </div>
              <button
                onClick={() => handleDownload(doc.title)}
                className="flex items-center space-x-1.5 rounded-lg bg-slate-100 px-3 py-1.5 font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
