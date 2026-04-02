import React from "react";
import { motion } from "motion/react";
import { Book, Languages, GraduationCap, Info, X, Sparkles, CheckCircle2 } from "lucide-react";

interface SubjectGuideProps {
  onClose: () => void;
}

const SubjectGuide: React.FC<SubjectGuideProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">CUET Subject Guide</h2>
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Understanding List A, B1 & B2</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* List A */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-indigo-600">
              <Languages className="w-5 h-5" />
              <h3 className="font-black text-sm uppercase tracking-widest">List A: Languages</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Contains all languages offered in CUET. Most universities (like DU) require you to choose at least one language that you studied in Class 12.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-tighter">Common Languages (List A)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "English", "Hindi", "Sanskrit", "Punjabi", "Bengali", "Gujarati", 
                  "Kannada", "Malayalam", "Marathi", "Odia", "Tamil", "Telugu", "Urdu",
                  "Arabic", "French", "German", "Italian", "Japanese", "Russian", "Spanish"
                ].map(lang => (
                  <div key={lang} className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700">
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* List B1 */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-indigo-600">
              <GraduationCap className="w-5 h-5" />
              <h3 className="font-black text-sm uppercase tracking-widest">List B1: Main Academic Subjects</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              These are core academic subjects. Most degree programs require at least 2 or 3 subjects from this list.
            </p>
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-tighter">Core Subjects (B1)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "Accountancy", "Biology", "Business Studies", "Chemistry", "Computer Science", 
                  "Economics", "Geography", "History", "Home Science", "Legal Studies", 
                  "Mathematics", "Physics", "Political Science", "Psychology", "Sociology",
                  "Anthropology", "Environmental Studies", "Sanskrit"
                ].map(sub => (
                  <div key={sub} className="flex items-center gap-2 px-2 py-1 bg-white border border-indigo-100 rounded-lg text-[10px] font-medium text-indigo-700">
                    <div className="w-1 h-1 rounded-full bg-indigo-400" />
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* List B2 */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-indigo-600">
              <Info className="w-5 h-5" />
              <h3 className="font-black text-sm uppercase tracking-widest">List B2: Vocational/Elective Subjects</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              These are elective or vocational subjects. Usually, only one subject from this list can be counted towards your total score.
            </p>
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-amber-500 mb-2 uppercase tracking-tighter">Elective Subjects (B2)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "Agriculture", "Engineering Graphics", "Entrepreneurship", "Fine Arts", 
                  "Knowledge Tradition", "Mass Media", "Performing Arts", "Physical Education", 
                  "Teaching Aptitude", "Yoga", "Tourism", "Fashion Studies"
                ].map(sub => (
                  <div key={sub} className="flex items-center gap-2 px-2 py-1 bg-white border border-amber-100 rounded-lg text-[10px] font-medium text-amber-700">
                    <div className="w-1 h-1 rounded-full bg-amber-400" />
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section III */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-indigo-600">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-black text-sm uppercase tracking-widest">Section III: General Test (GAT)</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              The General Test (GAT) covers General Knowledge, Current Affairs, General Mental Ability, Numerical Ability, and Quantitative Reasoning. Many vocational and interdisciplinary courses require this.
            </p>
            <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-green-600 mb-2 uppercase tracking-tighter">General Test (GAT)</p>
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-green-100 rounded-xl text-xs font-bold text-green-700">
                <CheckCircle2 className="w-4 h-4" />
                General Test (GAT)
              </div>
            </div>
          </section>

          {/* Important Rule */}
          <div className="bg-gray-900 text-white p-5 rounded-2xl flex gap-4">
            <div className="bg-white/10 p-2 h-fit rounded-lg">
              <Info className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">The "Class 12" Rule</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Crucial: You must appear in CUET only in those subjects in which you have passed Class 12. Appearing in subjects not studied in school may lead to rejection.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all"
          >
            Got it, thanks!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SubjectGuide;
