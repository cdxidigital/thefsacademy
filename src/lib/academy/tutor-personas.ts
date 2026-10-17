/** Public descriptions only. Teaching instructions and answer banks stay on the server. */
export type TutorRole = 'foundations_tutor' | 'practice_coach' | 'assessment_tutor';
export type GuideMode = 'explain' | 'scenario' | 'recap';
export type TutorHistoryTurn = { role: 'user' | 'assistant'; content: string };
export type PracticeChoice = { scenarioId: string; choiceIndex: number };
export const DEFAULT_TUTOR_ROLE: TutorRole = 'foundations_tutor';

export const TUTOR_PERSONAS = [
  {
    id: 'foundations_tutor', title: 'Foundations Tutor', shortTitle: 'Foundations',
    character: 'Calm, clear and curious', symbol: 'book',
    description: 'Understand one idea at a time, with plain language and sources you can check.',
    scope: 'Concepts · lesson explanations · trusted sources',
    welcome: 'Let’s make one idea a little clearer.',
    introduction: 'Choose a lesson, ask a question, or begin with a short recap. You can keep every example fictional.',
    defaultMode: 'explain',
    prompts: [
      { text: 'Explain this lesson in plain language.', mode: 'explain' },
      { text: 'Summarise the ideas I should remember.', mode: 'recap' },
      { text: 'How is a bodily response different from consent?', mode: 'explain' },
      { text: 'Where can I find a trusted source for this topic?', mode: 'explain' },
    ],
  },
  {
    id: 'practice_coach', title: 'Practice Coach', shortTitle: 'Practice',
    character: 'Encouraging, practical and unhurried', symbol: 'conversation',
    description: 'Try a fictional two-choice situation, then explore the reasoning together.',
    scope: 'Fictional adults · communication · ungraded practice',
    welcome: 'A small situation. Room to try.',
    introduction: 'There is no performance to prove. Try either choice, see the course reasoning, and take your time.',
    defaultMode: 'scenario',
    prompts: [
      { text: 'Give me a fictional practice example.', mode: 'scenario' },
      { text: 'Can we use a nonsexual example instead?', mode: 'scenario' },
      { text: 'Help me practise accepting a boundary.', mode: 'scenario' },
      { text: 'Explain what this practice is helping me learn.', mode: 'explain' },
    ],
  },
  {
    id: 'assessment_tutor', title: 'Assessment Tutor', shortTitle: 'Assessment',
    character: 'Precise, patient and fair', symbol: 'checklist',
    description: 'Find your next step, understand assessment rules, and revisit released feedback.',
    scope: 'Your saved progress · assessment process · approved feedback',
    welcome: 'Know where you are. See what comes next.',
    introduction: 'I use the course rules and your own saved results. During a marked assessment, I can help with the process and access options.',
    defaultMode: 'explain',
    prompts: [
      { text: 'What do I still need to complete?', mode: 'explain' },
      { text: 'Explain my latest submitted assessment feedback.', mode: 'recap' },
      { text: 'What if I need more time or another attempt?', mode: 'explain' },
      { text: 'How can I raise a confusing marked question?', mode: 'explain' },
    ],
  },
] as const satisfies readonly {
  id: TutorRole; title: string; shortTitle: string; character: string; symbol: string;
  description: string; scope: string; welcome: string; introduction: string;
  defaultMode: GuideMode; prompts: readonly { text: string; mode: GuideMode }[];
}[];

export function isTutorRole(value: unknown): value is TutorRole {
  return TUTOR_PERSONAS.some((persona) => persona.id === value);
}
export function tutorPersona(role: TutorRole) {
  return TUTOR_PERSONAS.find((persona) => persona.id === role)!;
}
