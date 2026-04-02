export interface Recommendation {
  course: string;
  university: string;
  why_eligible: string;
  cuet_subjects_to_take: string[];
  match_score: number; // 0-100
  career_prospects: string;
  official_link: string;
}

export interface PersonalizedEligibilityResult {
  summary: string;
  recommendations: Recommendation[];
  limitations: string[];
  expert_advice: string;
}
