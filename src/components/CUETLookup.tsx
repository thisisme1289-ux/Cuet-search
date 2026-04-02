import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Search, Loader2, Info, GraduationCap, History, Sparkles, Filter, Calendar, Building2, LayoutGrid, BookOpenCheck } from "lucide-react";
import EligibilityCard from "./EligibilityCard";
import SubjectGuide from "./SubjectGuide";
import PersonalizedFinder from "./PersonalizedFinder";
import { CUETEligibilityData } from "../types";

const POPULAR_SEARCHES = [
  { course: "B.Com (Hons.)", university: "University of Delhi" },
  { course: "B.A. (Hons.) Economics", university: "University of Delhi" },
  { course: "B.Sc (Hons.) Mathematics", university: "University of Delhi" },
  { course: "B.Tech CSE", university: "BHU" },
  { course: "B.A. Political Science", university: "JNU" },
];

const ACADEMIC_YEARS = ["2026-27", "2025-26"];
const UNIVERSITY_TYPES = ["All", "Central", "State", "Private", "Deemed"];
const PROGRAM_CATEGORIES = ["All", "Engineering", "Arts", "Science", "Commerce", "Law", "Management", "Vocational"];

const COMMON_UNIVERSITIES = [
  "University of Delhi (DU)",
  "Banaras Hindu University (BHU)",
  "Jawaharlal Nehru University (JNU)",
  "Jamia Millia Islamia (JMI)",
  "Aligarh Muslim University (AMU)",
  "University of Hyderabad",
  "Visva-Bharati University",
  "Pondicherry University",
  "Central University of Rajasthan",
  "Central University of Haryana",
  "Central University of Punjab",
  "Central University of South Bihar",
  "Central University of Karnataka",
  "Central University of Tamil Nadu",
  "Central University of Kerala",
  "Central University of Gujarat",
  "Central University of Jharkhand",
  "Central University of Odisha",
  "Central University of Himachal Pradesh",
  "Central University of Jammu",
  "Central University of Kashmir",
  "Tezpur University",
  "Mizoram University",
  "Nagaland University",
  "North-Eastern Hill University (NEHU)",
  "Babasaheb Bhimrao Ambedkar University (BBAU)",
  "Indira Gandhi National Tribal University",
  "Dr. B.R. Ambedkar University Delhi",
  "Guru Ghasidas Vishwavidyalaya",
  "Hemvati Nandan Bahuguna Garhwal University",
  "Manipur University",
  "Sikkim University",
  "Tripura University",
  "Rajiv Gandhi University",
  "Assam University",
  "English and Foreign Languages University (EFLU)",
  "Maulana Azad National Urdu University (MANUU)",
  "National Sanskrit University",
  "Shri Lal Bahadur Shastri National Sanskrit University",
  "Central Sanskrit University",
  "Barkatullah University",
  "Devi Ahilya Vishwavidyalaya",
  "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
  "Madan Mohan Malaviya University of Technology (MMMUT)",
  "University of Allahabad",
  "IIM Rohtak (Five Year Integrated Programme in Management)",
  "Tata Institute of Social Sciences (TISS)",
  "Galgotias University",
  "Amity University",
  "Bennett University",
  "BML Munjal University",
  "GD Goenka University",
  "IILM University",
  "Jagannath University",
  "K.R. Mangalam University",
  "LPU (Lovely Professional University)",
  "NIIT University",
  "Presidency University",
  "Shiv Nadar University",
  "SRM University",
  "Teerthanker Mahaveer University",
];

const COMMON_COURSES = [
  "B.A. (Hons.) Political Science",
  "B.A. (Hons.) Economics",
  "B.A. (Hons.) History",
  "B.A. (Hons.) English",
  "B.A. (Hons.) Psychology",
  "B.A. (Hons.) Sociology",
  "B.A. (Hons.) Geography",
  "B.A. (Hons.) Philosophy",
  "B.A. (Hons.) Sanskrit",
  "B.A. (Hons.) Hindi",
  "B.A. (Hons.) Journalism",
  "B.A. (Hons.) Multimedia and Mass Communication",
  "B.A. (Hons.) Social Work",
  "B.A. (Hons.) Music",
  "B.A. (Hons.) French",
  "B.A. (Hons.) German",
  "B.A. (Hons.) Spanish",
  "B.A. (Hons.) Italian",
  "B.A. (Hons.) Japanese",
  "B.A. (Hons.) Korean",
  "B.A. (Hons.) Chinese",
  "B.Com. (Hons.)",
  "B.Com. (Pass)",
  "B.Sc. (Hons.) Physics",
  "B.Sc. (Hons.) Chemistry",
  "B.Sc. (Hons.) Mathematics",
  "B.Sc. (Hons.) Biology",
  "B.Sc. (Hons.) Computer Science",
  "B.Sc. (Hons.) Statistics",
  "B.Sc. (Hons.) Anthropology",
  "B.Sc. (Hons.) Botany",
  "B.Sc. (Hons.) Zoology",
  "B.Sc. (Hons.) Geology",
  "B.Sc. (Hons.) Home Science",
  "B.Sc. (Hons.) Instrumentation",
  "B.Sc. (Hons.) Polymer Science",
  "B.Sc. (Hons.) Electronics",
  "B.Tech. Computer Science & Engineering",
  "B.Tech. Electronics & Communication",
  "B.Tech. Mechanical Engineering",
  "B.Tech. Civil Engineering",
  "B.Tech. Information Technology",
  "B.Tech. Biotechnology",
  "B.Tech. Food Technology",
  "B.A. LL.B. (Hons.)",
  "B.B.A. LL.B. (Hons.)",
  "B.B.A. (Bachelor of Business Administration)",
  "B.M.S. (Bachelor of Management Studies)",
  "B.B.E. (Bachelor of Business Economics)",
  "B.Voc. (Software Development)",
  "B.Voc. (Retail Management)",
  "B.Voc. (Web Designing)",
  "B.Voc. (Banking & Finance)",
  "B.Voc. (Health Care Management)",
  "B.Voc. (Printing & Publishing)",
  "B.P.Ed. (Bachelor of Physical Education)",
  "B.El.Ed. (Bachelor of Elementary Education)",
  "B.F.A. (Bachelor of Fine Arts)",
  "B.Des. (Bachelor of Design)",
  "Integrated M.Sc. Physics",
  "Integrated M.Sc. Chemistry",
  "Integrated M.Sc. Mathematics",
  "Integrated B.A. B.Ed.",
  "Integrated B.Sc. B.Ed.",
];

export default function CUETLookup() {
  const [courseName, setCourseName] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [universityType, setUniversityType] = useState("All");
  const [programCategory, setProgramCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"direct" | "personalized">("direct");
  const [showFilters, setShowFilters] = useState(false);
  const [showSubjectGuide, setShowSubjectGuide] = useState(false);
  const [courseSuggestions, setCourseSuggestions] = useState<string[]>([]);
  const [uniSuggestions, setUniSuggestions] = useState<string[]>([]);
  const [showCourseSuggestions, setShowCourseSuggestions] = useState(false);
  const [showUniSuggestions, setShowUniSuggestions] = useState(false);
  const [result, setResult] = useState<CUETEligibilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<Record<string, { data: CUETEligibilityData; timestamp: number }>>({});

  // Load cache from localStorage on mount
  useEffect(() => {
    const savedCache = localStorage.getItem("cuet_lookup_cache");
    if (savedCache) {
      try {
        setCache(JSON.parse(savedCache));
      } catch (e) {
        console.error("Failed to parse cache", e);
      }
    }
  }, []);

  // Save cache to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cuet_lookup_cache", JSON.stringify(cache));
  }, [cache]);

  // Handle course suggestions
  useEffect(() => {
    if (courseName.trim().length > 1) {
      const filtered = COMMON_COURSES.filter(c => 
        c.toLowerCase().includes(courseName.toLowerCase())
      ).slice(0, 5);
      setCourseSuggestions(filtered);
      setShowCourseSuggestions(filtered.length > 0);
    } else {
      setShowCourseSuggestions(false);
    }
  }, [courseName]);

  // Handle university suggestions
  useEffect(() => {
    if (universityName.trim().length > 1) {
      const filtered = COMMON_UNIVERSITIES.filter(u => 
        u.toLowerCase().includes(universityName.toLowerCase())
      ).slice(0, 5);
      setUniSuggestions(filtered);
      setShowUniSuggestions(filtered.length > 0);
    } else {
      setShowUniSuggestions(false);
    }
  }, [universityName]);

  const handleSearch = async () => {
    if (!courseName.trim() || !universityName.trim()) {
      setError("Please enter both course name and university name.");
      return;
    }

    const cacheKey = `${courseName.trim()}__${universityName.trim()}__${academicYear}__${universityType}__${programCategory}`.toLowerCase();
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
      setResult(cache[cacheKey].data);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const prompt = `
        You are a CUET UG Eligibility Data Extraction Engine.
        Your ONLY job is to find and return exact, verified CUET eligibility data.

        TASK:
        Extract CUET subject requirements and eligibility for:
        Course: ${courseName}
        University: ${universityName}
        Academic Year: ${academicYear}
        University Type: ${universityType === "All" ? "Any" : universityType}
        Program Category: ${programCategory === "All" ? "Any" : programCategory}

        SEARCH INSTRUCTIONS:
        1. Search for the official ${academicYear} Bulletin of Information (BOI) or prospectus PDF for this university.
        2. Search specifically for programme-specific eligibility of this exact course.
        3. CRITICAL: Prioritize official university domain URLs (.ac.in, .edu.in, .edu) over general educational portals (like Shiksha, Collegedunia, etc.).
        4. Look for the EXACT subject combination rules as written in official documents.
        5. Categorize subjects into List A (Languages), List B1 (Academic Subjects), and List B2 (Vocational Subjects) if the university (like DU) uses this terminology.
        6. Verify that the university is a ${universityType === "All" ? "recognized" : universityType} university.
        7. Ensure the course falls under the ${programCategory === "All" ? "specified" : programCategory} category if applicable.

        YOU MUST FIND:
        - Exact CUET subject combinations allowed (Combination I, II, etc.)
        - Which subjects are compulsory vs optional
        - Language requirement (List A subjects)
        - Domain subject requirement (List B subjects)
        - Whether General Aptitude Test (GAT) is required
        - Total number of CUET subjects required
        - Class 12 minimum percentage (if mentioned)
        - Any special conditions or restrictions
        - University Metadata: Type (Central, State, Private, Deemed), a 2-sentence description, official website URL, official admission page URL, and its main campus location.

        RULES:
        - NEVER guess or infer — only use what official sources say
        - If data is missing, set that field to "Not clearly specified in official source"
        - Preserve exact wording of combination rules — do not paraphrase
        - Always include the source URL

        RESPOND ONLY WITH THIS JSON — NO OTHER TEXT, NO MARKDOWN FENCES:
        {
          "university": "${universityName}",
          "university_metadata": {
            "type": "",
            "description": "",
            "official_website": "",
            "admission_page": "",
            "location": ""
          },
          "course": "${courseName}",
          "academic_year": "${academicYear}",
          "found": true,
          "cuet_requirements": {
            "total_subjects_required": "",
            "language_requirement": "",
            "domain_subject_rules": "",
            "combinations": [
              { "label": "Combination I", "subjects": [] }
            ],
            "general_aptitude_test": "",
            "compulsory_subjects": [],
            "optional_subjects": []
          },
          "class_12_eligibility": {
            "minimum_percentage": "",
            "required_subjects": [],
            "board_requirement": ""
          },
          "special_conditions": [],
          "source": {
            "url": "",
            "document_name": "",
            "confidence": ""
          },
          "important_note": ""
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
      let parsed: CUETEligibilityData;
      
      try {
        const cleaned = rawText.replace(/```json|```/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch (e) {
        console.error("JSON parse failed. Raw response:", rawText);
        throw new Error("Could not parse eligibility data. Please try a different search.");
      }

      setResult(parsed);
      setCache(prev => ({
        ...prev,
        [cacheKey]: { data: parsed, timestamp: Date.now() }
      }));

    } catch (err: any) {
      console.error("Search error:", err);
      setError(err.message || "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSearch = (item: { course: string; university: string }) => {
    setCourseName(item.course);
    setUniversityName(item.university);
    setAcademicYear("2026-27");
    setUniversityType("All");
    setProgramCategory("All");
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" />
          Powered by Gemini 2.0 Flash
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          CUET Eligibility <span className="text-indigo-600">Lookup</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find exact CUET subjects and eligibility requirements for any course at any central university instantly.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-12 p-1 bg-gray-100 rounded-2xl max-w-md mx-auto">
        <button 
          onClick={() => setActiveTab("direct")}
          className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${activeTab === "direct" ? 'bg-white text-indigo-600 shadow-lg shadow-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Direct Search
        </button>
        <button 
          onClick={() => setActiveTab("personalized")}
          className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${activeTab === "personalized" ? 'bg-white text-indigo-600 shadow-lg shadow-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Eligibility Finder
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "direct" ? (
          <motion.div 
            key="direct"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Search Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 mb-8"
            >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest">
            <Search className="w-4 h-4" />
            Search Parameters
            <button 
              onClick={() => setShowSubjectGuide(true)}
              className="ml-1 p-1 text-gray-300 hover:text-indigo-400 transition-colors"
              title="Subject Guide"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <button 
            onClick={() => setShowSubjectGuide(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
          >
            <BookOpenCheck className="w-4 h-4" />
            Subject Guide (List A, B1, B2)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Course name (e.g. B.Com Hons)"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all text-gray-900 font-medium"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              onBlur={() => setTimeout(() => setShowCourseSuggestions(false), 200)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <AnimatePresence>
              {showCourseSuggestions && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
                >
                  {courseSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCourseName(s);
                        setShowCourseSuggestions(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all border-b border-gray-50 last:border-0"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="University (e.g. University of Delhi)"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all text-gray-900 font-medium"
              value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
              onBlur={() => setTimeout(() => setShowUniSuggestions(false), 200)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <AnimatePresence>
              {showUniSuggestions && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
                >
                  {uniSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setUniversityName(s);
                        setShowUniSuggestions(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all border-b border-gray-50 last:border-0"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${showFilters ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Advanced Filters'}
          </button>
          
          {showFilters && (
            <button 
              onClick={() => {
                setAcademicYear("2026-27");
                setUniversityType("All");
                setProgramCategory("All");
              }}
              className="text-xs font-bold text-gray-400 hover:text-indigo-600 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    Academic Year
                  </label>
                  <select 
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 transition-all appearance-none"
                  >
                    {ACADEMIC_YEARS.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <Building2 className="w-3 h-3" />
                    University Type
                  </label>
                  <select 
                    value={universityType}
                    onChange={(e) => setUniversityType(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 transition-all appearance-none"
                  >
                    {UNIVERSITY_TYPES.map(type => (
                      <option key={type} value={type}>{type} University</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <LayoutGrid className="w-3 h-3" />
                    Program Category
                  </label>
                  <select 
                    value={programCategory}
                    onChange={(e) => setProgramCategory(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 transition-all appearance-none"
                  >
                    {PROGRAM_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Searching Official Sources...
            </>
          ) : (
            <>
              <Search className="w-6 h-6" />
              Check Eligibility
            </>
          )}
        </button>

        {/* Popular Searches */}
        <div className="mt-8">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
            <History className="w-4 h-4" />
            Popular Searches
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((item, i) => (
              <button
                key={i}
                onClick={() => handleQuickSearch(item)}
                className="px-4 py-2 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 rounded-full text-sm font-medium transition-all"
              >
                {item.course} — {item.university.replace("University of Delhi", "DU")}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-8 flex items-center gap-3"
          >
            <Info className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State Info */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Official Documents</h3>
          <p className="text-gray-500 max-w-xs mx-auto">
            We're searching through the 2026-27 Bulletin of Information to find exact requirements.
          </p>
        </motion.div>
      )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && (
            <EligibilityCard 
              key={`${result.course}-${result.university}`}
              data={result} 
              fromCache={!!cache[`${result.course.trim()}__${result.university.trim()}__${academicYear}__${universityType}__${programCategory}`.toLowerCase()]}
            />
          )}
        </AnimatePresence>
      </motion.div>
    ) : (
      <motion.div 
        key="personalized"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <PersonalizedFinder />
      </motion.div>
    )}
  </AnimatePresence>

      {/* Subject Guide Modal */}
      <AnimatePresence>
        {showSubjectGuide && (
          <SubjectGuide onClose={() => setShowSubjectGuide(false)} />
        )}
      </AnimatePresence>

      {/* Footer Disclaimer */}
      <div className="mt-12 text-center">
        <p className="text-xs text-gray-400 font-medium leading-relaxed">
          ⚠️ Data is sourced from official university BOIs and CUET portal via real-time search. <br />
          Always verify from your university's official website before applying.
        </p>
      </div>
    </div>
  );
}
