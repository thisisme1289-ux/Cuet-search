export interface CUETRequirement {
  total_subjects_required: string;
  language_requirement: string;
  domain_subject_rules: string;
  combinations: {
    label: string;
    subjects: string[];
  }[];
  general_aptitude_test: string;
  compulsory_subjects: string[];
  optional_subjects: string[];
}

export interface Class12Eligibility {
  minimum_percentage: string;
  required_subjects: string[];
  board_requirement: string;
}

export interface SourceInfo {
  url: string;
  document_name: string;
  confidence: string;
}

export interface UniversityMetadata {
  type: string;
  description: string;
  official_website: string;
  location: string;
}

export interface CUETEligibilityData {
  university: string;
  university_metadata?: UniversityMetadata;
  course: string;
  academic_year: string;
  found: boolean;
  cuet_requirements: CUETRequirement;
  class_12_eligibility: Class12Eligibility;
  special_conditions: string[];
  source: SourceInfo;
  important_note: string;
}
