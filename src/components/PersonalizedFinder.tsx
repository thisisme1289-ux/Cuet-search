import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Search, 
  Loader2, 
  BookOpen, 
  MapPin, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Lightbulb,
  ArrowRight,
  GraduationCap,
  X
} from "lucide-react";
import { PersonalizedEligibilityResult } from "../recommendationTypes";

const LIST_A = [
  "English", "Hindi", "Sanskrit", "Punjabi", "Bengali", "Gujarati", 
  "Kannada", "Malayalam", "Marathi", "Odia", "Tamil", "Telugu", "Urdu",
  "Arabic", "French", "German", "Italian", "Japanese", "Russian", "Spanish"
];

const LIST_B1 = [
  "Accountancy", "Biology", "Business Studies", "Chemistry", "Computer Science", 
  "Economics", "Geography", "History", "Home Science", "Legal Studies", 
  "Mathematics", "Physics", "Political Science", "Psychology", "Sociology",
  "Anthropology", "Environmental Studies", "Sanskrit"
];

const LIST_B2 = [
  "Agriculture", "Engineering Graphics", "Entrepreneurship", "Fine Arts", 
  "Knowledge Tradition", "Mass Media", "Performing Arts", "Physical Education", 
  "Teaching Aptitude", "Yoga", "Tourism", "Fashion Studies"
];

const SECTION_III = [
  "General Test (GAT)"
];

const STATES = [
  "Delhi", "Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", 
  "West Bengal", "Rajasthan", "Gujarat", "Punjab", "Haryana", "Bihar", "Anywhere"
];

const CAREER_GOALS = [
  "Software & Tech", "Finance & Banking", "Civil Services (UPSC)", "Teaching", 
  "Law & Judiciary", "Management", "Design & Creative", "Research & Science", "Medicine"
];

export default function PersonalizedFinder() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [activeList, setActiveList] = useState<"A" | "B1" | "B2" | "III">("B1");
  const [statePref, setStatePref] = useState("Anywhere");
  const [careerGoal, setCareerGoal] = useState("Management");
  const [otherPref, setOtherPref] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedEligibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleSubject = (sub: string) => {
    setSubjects(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const clearSubjects = () => setSubjects([]);

  const currentList = {
    A: LIST_A,
    B1: LIST_B1,
    B2: LIST_B2,
    III: SECTION_III
  }[activeList];

  const handleFind = async () => {
    if (subjects.length === 0) {
      setError("Please select at least one subject you studied in Class 12.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const prompt = `
        You are a CUET UG Career & Eligibility Expert.
        
        USER PROFILE:
        Class 12 Subjects: ${subjects.join(", ")}
        Preferred State: ${statePref}
        Career Goal: ${careerGoal}
        Other Preferences: ${otherPref}

        TASK:
        1. Analyze which CUET UG courses and universities the user is eligible for based on their Class 12 subjects.
        2. Focus on universities in ${statePref} (if not 'Anywhere').
        3. Recommend top 3-5 courses/universities that align with their goal of "${careerGoal}".
        4. Explain WHY they are eligible (e.g., "DU requires Math for B.Com Hons, which you have").
        5. List any limitations (e.g., "You cannot do B.Sc Physics because you didn't study Physics in Class 12").
        6. CRITICAL: Prioritize official university domain URLs (.ac.in, .edu.in, .edu) for all links.

        RESPOND ONLY WITH THIS JSON — NO OTHER TEXT:
        {
          "summary": "A 2-sentence overview of the user's prospects.",
          "recommendations": [
            {
              "course": "Course Name",
              "university": "University Name",
              "why_eligible": "Explanation based on subjects.",
              "cuet_subjects_to_take": ["Subject 1", "Subject 2"],
              "match_score": 95,
              "career_prospects": "How this helps their goal.",
              "official_link": "URL to admission page"
            }
          ],
          "limitations": ["Limitation 1", "Limitation 2"],
          "expert_advice": "One key tip for their CUET preparation."
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        },
      });

      const rawText = response.text || "";
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      const parsed: PersonalizedEligibilityResult = JSON.parse(cleaned);
      setResult(parsed);

    } catch (err: any) {
      console.error("Finder error:", err);
      setError("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">Personalized Eligibility Finder</h2>
          </div>
          <p className="text-indigo-100 font-medium">
            Tell us what you studied and where you want to go. We'll find the perfect match for your CUET journey.
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Subjects Selection */}
          <section>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                <BookOpen className="w-4 h-4" />
                Class 12 Subjects (A, B1, B2)
              </label>
              
              <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                {(["A", "B1", "B2", "III"] as const).map(list => (
                  <button
                    key={list}
                    onClick={() => setActiveList(list)}
                    className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
                      activeList === list ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {list === "III" ? "General Test (GAT)" : `List ${list}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currentList.map(sub => {
                  const isSelected = subjects.includes(sub);
                  return (
                    <motion.button
                      key={sub}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleSubject(sub)}
                      className={`px-3 py-2.5 rounded-xl text-[11px] font-bold transition-all border text-left flex items-center justify-between group ${
                        isSelected 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 ring-2 ring-indigo-600 ring-offset-2' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30'
                      }`}
                    >
                      <span className="truncate">{sub}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 ml-1 text-white" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200 group-hover:border-indigo-200 flex-shrink-0 ml-1" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence>
              {subjects.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100"
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                      Selected Subjects ({subjects.length})
                    </p>
                    <button 
                      onClick={clearSubjects}
                      className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map(sub => (
                      <motion.span 
                        key={sub}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 shadow-sm"
                      >
                        {sub}
                        <button 
                          onClick={() => toggleSubject(sub)} 
                          className="p-0.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State Preference */}
            <section>
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                <MapPin className="w-4 h-4" />
                Preferred State
              </label>
              <select 
                value={statePref}
                onChange={(e) => setStatePref(e.target.value)}
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all text-gray-900 font-bold appearance-none"
              >
                {STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </section>

            {/* Career Goal */}
            <section>
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                <Target className="w-4 h-4" />
                Career Goal / Interest
              </label>
              <select 
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all text-gray-900 font-bold appearance-none"
              >
                {CAREER_GOALS.map(goal => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
            </section>
          </div>

          {/* Other Preferences */}
          <section>
            <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
              <Lightbulb className="w-4 h-4" />
              Other Preferences (Optional)
            </label>
            <textarea 
              placeholder="e.g. Prefer Central Universities, interested in research, low tuition fees..."
              value={otherPref}
              onChange={(e) => setOtherPref(e.target.value)}
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all text-gray-900 font-medium min-h-[100px]"
            />
          </section>

          <button
            onClick={handleFind}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing Your Profile...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Find My Best Options
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-bold">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-8"
          >
            {/* Summary Card */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8">
              <h3 className="text-xl font-black text-indigo-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                Your Eligibility Summary
              </h3>
              <p className="text-indigo-800 leading-relaxed font-medium">
                {result.summary}
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 gap-6">
              <h3 className="text-2xl font-black text-gray-900 px-2">Recommended Matches</h3>
              {result.recommendations.map((rec, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                          {rec.match_score}% Match
                        </span>
                        <span className="text-xs font-bold text-gray-400">• {rec.university}</span>
                      </div>
                      <h4 className="text-xl font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {rec.course}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {rec.why_eligible}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {rec.cuet_subjects_to_take.map((sub, j) => (
                          <span key={j} className="bg-gray-50 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-lg border border-gray-100">
                            {sub}
                          </span>
                        ))}
                      </div>
                      <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-50">
                        <p className="text-xs text-indigo-600 font-bold mb-1">Career Prospect:</p>
                        <p className="text-xs text-indigo-800 leading-relaxed">{rec.career_prospects}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <a 
                        href={rec.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95"
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Limitations & Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-8">
                <h4 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Key Limitations
                </h4>
                <ul className="space-y-3">
                  {result.limitations.map((lim, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      {lim}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-900 text-white rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-indigo-400" />
                  Expert Advice
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {result.expert_advice}
                </p>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Strategy
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
