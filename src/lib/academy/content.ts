import catalogJson from "@/data/catalog.json";
import assessmentJson from "@/data/assessments.json";

export type LessonRecord = {
  id: string;
  title: string;
  moduleId: string;
  durationMinutes: number;
  objectives: string[];
  content: string;
  sourceIds: string[];
  sections: { id: string; type?: string; text: string; sourceIds?: string[] }[];
  order?: number;
  topicNote?: string;
  scenarioId?: string;
  assessmentId?: string;
  moduleAssessmentId?: string;
  reflection?: { prompt: string };
  formatStatus?: string;
  knowledgeCheckCount?: number;
  contentType?: string;
  contentVersion?: string;
};

export type ModuleRecord = {
  id: string;
  title: string;
  kind: "core" | "elective";
  summary: string;
  durationMinutes: number;
  lessons: LessonRecord[];
  assessmentId: string;
  lessonCount: number;
  questionCount?: number;
  passingScore?: number;
  prerequisites?: string[];
  order?: number;
  sourceIds?: string[];
  releaseStatus?: string;
};

export type SourceRecord = { id: string; title: string; url: string; publisher?: string; verificationStatus?: string };
export type QuestionRecord = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  feedback: string;
  sourceIds?: string[];
  critical?: boolean;
};
export type AssessmentRecord = {
  id: string;
  kind: string;
  title: string;
  moduleId?: string | null;
  lessonId?: string | null;
  questionIds: string[];
  passingScore: number;
  criticalQuestionIds: string[];
  countsForCertificate: boolean;
  instructions?: string | null;
  case?: string | null;
  task?: string | null;
};
export type ScenarioRecord = {
  id: string;
  lessonId: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  feedback: string;
  sourceIds: string[];
};

type CatalogFile = {
  course: { title: string; version: string; shortTitle: string; accreditation: string; credential: { statement: string }; [key: string]: unknown };
  modules: ModuleRecord[];
  orientation: Record<string, unknown>;
  glossary: { id: string; term: string; definition: string }[];
  sources: SourceRecord[];
  worksheets: { id: string; title: string; instructions: string; prompts: string[]; locked?: boolean }[];
};

type AssessmentFile = {
  rules: {
    coreLessonIds: string[];
    coreAssessmentIds: string[];
    capstoneAssessmentId: string;
    planningAssessmentId: string;
  };
  assessments: AssessmentRecord[];
  questions: QuestionRecord[];
  scenarios: ScenarioRecord[];
};

export const catalog = catalogJson as unknown as CatalogFile;
export const assessmentBank = assessmentJson as unknown as AssessmentFile;
export const modules = catalog.modules;
export const lessons = modules.flatMap((module) => module.lessons);
export const assessments = assessmentBank.assessments;
export const questions = assessmentBank.questions;
export const rules = assessmentBank.rules;

export class ContentError extends Error {
  constructor(public status: number, message: string, public code = "not_found") {
    super(message);
  }
}

export function getLesson(id: string) {
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) throw new ContentError(404, "This lesson could not be found.");
  return lesson;
}
export function getModule(id: string) {
  const module = modules.find((item) => item.id === id);
  if (!module) throw new ContentError(404, "This module could not be found.");
  return module;
}
export function getAssessment(id: string) {
  const assessment = assessments.find((item) => item.id === id);
  if (!assessment) throw new ContentError(404, "This assessment could not be found.");
  return assessment;
}
export function sourcesFor(ids: string[]) {
  return catalog.sources.filter((source) => ids.includes(source.id));
}

export function publicCatalog() {
  return {
    course: catalog.course,
    modules: modules.map(({ lessons: moduleLessons, ...module }) => ({
      ...module,
      lessons: moduleLessons.map(({ id, title, moduleId, durationMinutes, objectives, order, topicNote, assessmentId, moduleAssessmentId, sourceIds, formatStatus }) => ({
        id, title, moduleId, durationMinutes, objectives, order, topicNote, assessmentId, moduleAssessmentId, sourceIds, formatStatus,
      })),
    })),
    assessments: assessments
      .filter((item) => item.kind !== "lesson_practice")
      .map(({ id, title, kind, moduleId, questionIds, passingScore, criticalQuestionIds, countsForCertificate }) => ({
        id, title, kind, moduleId, questionCount: questionIds.length, passingScore, criticalCount: criticalQuestionIds.length, countsForCertificate,
      })),
    orientation: { id: catalog.orientation.id, title: catalog.orientation.title, durationMinutes: catalog.orientation.durationMinutes },
    glossary: catalog.glossary,
    sources: catalog.sources,
    worksheets: catalog.worksheets.map((worksheet) => ({ id: worksheet.id, title: worksheet.title })),
    mode: "pilot" as const,
  };
}
