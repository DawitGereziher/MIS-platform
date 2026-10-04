import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { LessonLearned } from '../../../core/domain/entities/Learning';
import { Lightbulb, Tag, Plus, CheckCircle, BookOpen, X } from 'lucide-react';

export const LessonsLearnedView: React.FC = () => {
  const { lessons, addLesson } = useMeal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [thematicArea, setThematicArea] = useState<LessonLearned['thematicArea']>('Youth Mobilization');
  const [context, setContext] = useState('');
  const [challengeFaced, setChallengeFaced] = useState('');
  const [lessonExtracted, setLessonExtracted] = useState('');
  const [practicalRecommendation, setPracticalRecommendation] = useState('');
  const [region, setRegion] = useState('Oromia');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !lessonExtracted.trim()) return;

    await addLesson({
      code: `LL-2026-0${Math.floor(10 + Math.random() * 90)}`,
      title: title.trim(),
      thematicArea,
      context: context.trim(),
      challengeFaced: challengeFaced.trim(),
      lessonExtracted: lessonExtracted.trim(),
      practicalRecommendation: practicalRecommendation.trim(),
      submittedBy: 'MEAL Learning Coordinator',
      region,
      dateDocumented: new Date().toISOString().split('T')[0],
      validationStatus: 'Peer Reviewed',
      tags: [thematicArea, region],
    });

    setIsModalOpen(false);
    setTitle('');
    setLessonExtracted('');
    setPracticalRecommendation('');
  };

  return (
    <div className="space-y-5 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Lessons Learned & Adaptive Management
          </h1>
          <p className="text-xs text-slate-500">
            Validated operational takeaways, challenges overcome, and actionable recommendations for scaling
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Document Lesson</span>
        </button>
      </div>

      <div className="space-y-4">
        {lessons.map(lesson => (
          <div
            key={lesson.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-500"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500">{lesson.code}</span>
                  <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
                    {lesson.thematicArea}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    {lesson.validationStatus}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-2">{lesson.title}</h3>
              </div>
              <span className="text-xs text-slate-400">{lesson.dateDocumented}</span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <strong className="text-slate-700">Operational Context:</strong>
                <p className="mt-1 text-slate-600 leading-relaxed">{lesson.context}</p>
              </div>
              <div className="rounded-xl bg-rose-50/50 p-3 border border-rose-100">
                <strong className="text-rose-900">Challenge Encountered:</strong>
                <p className="mt-1 text-rose-800/90 leading-relaxed">{lesson.challengeFaced}</p>
              </div>
              <div className="rounded-xl bg-teal-50/50 p-3 border border-teal-100">
                <strong className="text-teal-950">Lesson & Recommendation:</strong>
                <p className="mt-1 text-teal-900 leading-relaxed">{lesson.lessonExtracted}</p>
                <div className="mt-2 text-[11px] font-medium text-brand-800 border-t border-teal-200/50 pt-1.5">
                  <strong>Action:</strong> {lesson.practicalRecommendation}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
              <span>Submitted by: <strong>{lesson.submittedBy}</strong> ({lesson.region})</span>
              <div className="flex gap-1">
                {lesson.tags.map((tag, i) => (
                  <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Document Programme Lesson Learned</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Lesson Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Concise takeaway statement..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Thematic Area</label>
                  <select
                    value={thematicArea}
                    onChange={e => setThematicArea(e.target.value as LessonLearned['thematicArea'])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Youth Mobilization">Youth Mobilization</option>
                    <option value="Private Sector Placement">Private Sector Placement</option>
                    <option value="Gender Inclusion">Gender Inclusion</option>
                    <option value="Digital Literacy">Digital Literacy</option>
                    <option value="MFI Linkage">MFI Linkage</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Region</label>
                  <select
                    value={region}
                    onChange={e => setRegion(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Oromia">Oromia</option>
                    <option value="Amhara">Amhara</option>
                    <option value="Sidama">Sidama</option>
                    <option value="Addis Ababa">Addis Ababa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Context & Background</label>
                <textarea
                  rows={2}
                  value={context}
                  onChange={e => setContext(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Core Challenge Faced</label>
                <textarea
                  rows={2}
                  value={challengeFaced}
                  onChange={e => setChallengeFaced(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Extracted Lesson & Principle *</label>
                <textarea
                  required
                  rows={2}
                  value={lessonExtracted}
                  onChange={e => setLessonExtracted(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Practical Recommendation for Team *</label>
                <input
                  type="text"
                  required
                  value={practicalRecommendation}
                  onChange={e => setPracticalRecommendation(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-brand-800"
                >
                  Save Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
