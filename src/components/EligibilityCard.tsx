import React, { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Info, CheckCircle2, AlertCircle, BookOpen, GraduationCap, Zap, Copy, Check, Building2, MapPin, Globe } from "lucide-react";
import { CUETEligibilityData } from "../types";

interface EligibilityCardProps {
  data: CUETEligibilityData;
  fromCache?: boolean;
}

const EligibilityCard: React.FC<EligibilityCardProps> = ({ data, fromCache }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `
CUET Eligibility for ${data.course} at ${data.university} (${data.academic_year})

University Info:
- Type: ${data.university_metadata?.type || "N/A"}
- Location: ${data.university_metadata?.location || "N/A"}
- Website: ${data.university_metadata?.official_website || "N/A"}

CUET Requirements:
- Total Subjects: ${data.cuet_requirements.total_subjects_required}
- Language: ${data.cuet_requirements.language_requirement}
- GAT: ${data.cuet_requirements.general_aptitude_test}
- Combinations: ${data.cuet_requirements.combinations.map(c => `\n  ${c.label}: ${c.subjects.join(", ")}`).join("")}

Class 12 Eligibility:
- Min Marks: ${data.class_12_eligibility.minimum_percentage}
- Required Subjects: ${data.class_12_eligibility.required_subjects.join(", ")}

Source: ${data.source.document_name} (${data.source.url})
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data.found) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-red-100 rounded-2xl p-8 text-center shadow-sm"
      >
        <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="text-red-500 w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Course Not Found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Could not find official eligibility data for this combination. Try checking the university's official admission portal directly.
        </p>
      </motion.div>
    );
  }

  const confidenceColor = {
    high: "bg-green-100 text-green-700 border-green-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-red-100 text-red-700 border-red-200",
  }[data.source?.confidence?.toLowerCase() || "medium"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg"
    >
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{data.course}</h3>
          <p className="text-gray-600 font-medium">{data.university} — Academic Year {data.academic_year}</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleCopy}
            className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
            title="Copy to Clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${confidenceColor}`}>
            {data.source?.confidence} Confidence
          </span>
          {fromCache && (
            <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold">
              Cached Result
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* University Details */}
        {data.university_metadata && (
          <section className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-indigo-200" />
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-200">University Profile</span>
                </div>
                <p className="text-sm leading-relaxed mb-4 text-indigo-50">
                  {data.university_metadata.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5 text-indigo-300" />
                    {data.university_metadata.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Info className="w-3.5 h-3.5 text-indigo-300" />
                    {data.university_metadata.type} University
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a 
                  href={data.university_metadata.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/20 active:scale-95"
                >
                  <Globe className="w-4 h-4" />
                  Official Website
                </a>
                {data.university_metadata.admission_page && (
                  <a 
                    href={data.university_metadata.admission_page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-indigo-500 text-white px-6 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-900/20 active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Admission Page
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CUET Subjects */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-indigo-600 w-5 h-5" />
            <h4 className="text-lg font-bold text-gray-800">CUET Subject Requirements</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-1">Total Subjects</p>
              <p className="text-gray-900 font-medium">{data.cuet_requirements?.total_subjects_required}</p>
            </div>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-1">Language (List A)</p>
              <p className="text-gray-900 font-medium">{data.cuet_requirements?.language_requirement}</p>
            </div>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-1">General Test (GAT)</p>
              <p className="text-gray-900 font-medium">{data.cuet_requirements?.general_aptitude_test}</p>
            </div>
          </div>

          {data.cuet_requirements?.combinations?.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-700">Subject Combinations:</p>
              <div className="grid grid-cols-1 gap-3">
                {data.cuet_requirements.combinations.map((combo, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <span className="inline-block bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 uppercase tracking-widest">
                      {combo.label}
                    </span>
                    <ul className="space-y-2">
                      {combo.subjects.map((s, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.cuet_requirements?.domain_subject_rules && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Domain Rules:</span> {data.cuet_requirements.domain_subject_rules}
              </p>
            </div>
          )}
        </section>

        {/* Class 12 Eligibility */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="text-indigo-600 w-5 h-5" />
            <h4 className="text-lg font-bold text-gray-800">Class 12 Eligibility</h4>
          </div>
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
            <p className="text-sm text-gray-700 flex justify-between">
              <span className="font-medium">Minimum Marks:</span>
              <span className="font-bold text-gray-900">{data.class_12_eligibility?.minimum_percentage}</span>
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Required Subjects:</span>
              <span className="block mt-1 font-bold text-gray-900">
                {data.class_12_eligibility?.required_subjects?.join(", ") || "Not specified"}
              </span>
            </p>
            <p className="text-sm text-gray-700 flex justify-between">
              <span className="font-medium">Board:</span>
              <span className="font-bold text-gray-900">{data.class_12_eligibility?.board_requirement}</span>
            </p>
          </div>
        </section>

        {/* Special Conditions */}
        {data.special_conditions?.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-indigo-600 w-5 h-5" />
              <h4 className="text-lg font-bold text-gray-800">Special Conditions</h4>
            </div>
            <ul className="space-y-2">
              {data.special_conditions.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Important Note */}
        {data.important_note && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <Info className="text-amber-600 w-5 h-5 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <span className="font-bold">Note:</span> {data.important_note}
            </p>
          </div>
        )}

        {/* Source */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500">
            Source: <span className="font-medium">{data.source?.document_name}</span>
          </div>
          {data.source?.url && (
            <a 
              href={data.source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View Official Document <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EligibilityCard;
