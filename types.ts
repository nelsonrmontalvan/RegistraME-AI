export enum EducationLevel {
  PRIMARY = 'Primaria',
  SECONDARY = 'Secundaria',
  UNIVERSITY = 'Universitario',
  POSTGRADUATE = 'Posgrado'
}

export interface LessonRequest {
  subject: string;
  topic: string;
  level: EducationLevel;
  duration: string;
  context?: string;
  methodology: string;
}

export interface Methodology {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// New interface for the consolidated plan
export interface MasterPlan {
  duaContent: string | null;
  objectivesContent: string | null;
  sequenceContent: string | null;
  rubricContent: string | null;
}
