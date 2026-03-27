'use server';
/**
 * @fileOverview A Genkit flow for generating multiple-choice questions (MCQs) based on subject, topic, and difficulty.
 *
 * - generateMCQQuestions - A function that handles the MCQ generation process.
 * - GenerateMCQQuestionsInput - The input type for the generateMCQQuestions function.
 * - GenerateMCQQuestionsOutput - The return type for the generateMCQQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMCQQuestionsInputSchema = z.object({
  subject: z
    .string()
    .describe(
      'The subject for which to generate questions (e.g., "Data Structures and Algorithms").'
    ),
  topic: z
    .string()
    .describe('The specific topic within the subject (e.g., "Linked Lists").'),
  difficulty:
    z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the questions.'),
  numQuestions:
    z.number().int().min(1).max(20)
      .describe('The number of multiple-choice questions to generate (between 1 and 20).'),
});
export type GenerateMCQQuestionsInput = z.infer<typeof GenerateMCQQuestionsInputSchema>;

const MCQQuestionSchema = z.object({
  question: z.string().describe('The multiple-choice question text.'),
  options:
    z.array(z.string()).min(4).max(4)
      .describe('An array of exactly four possible answers for the question.'),
  correctAnswer: z.string().describe('The correct answer from the provided options.'),
  explanation: z
    .string()
    .optional()
    .describe('An optional explanation for the correct answer.'),
});

const GenerateMCQQuestionsOutputSchema = z.object({
  questions: z.array(MCQQuestionSchema).describe('An array of generated multiple-choice questions.'),
});
export type GenerateMCQQuestionsOutput = z.infer<typeof GenerateMCQQuestionsOutputSchema>;

export async function generateMCQQuestions(
  input: GenerateMCQQuestionsInput
): Promise<GenerateMCQQuestionsOutput> {
  return generateMCQQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMCQQuestionsPrompt',
  input: { schema: GenerateMCQQuestionsInputSchema },
  output: { schema: GenerateMCQQuestionsOutputSchema },
  prompt: `You are an expert educator and question designer. Your task is to generate multiple-choice questions (MCQs) for a college-level academic platform.

Generate {{numQuestions}} multiple-choice questions on the subject "{{{subject}}}" covering the topic "{{{topic}}}" with a difficulty level of "{{{difficulty}}}".

Each question must have exactly four options. You must clearly indicate the correct answer. Provide an optional explanation for why that answer is correct.

The output must be a JSON object with a single key "questions", which is an array of question objects. Each question object must strictly adhere to the following JSON schema:

{{jsonSchema GenerateMCQQuestionsOutputSchema}}

Here's an example of the desired output structure:
json
{
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["Berlin", "Madrid", "Paris", "Rome"],
      "correctAnswer": "Paris",
      "explanation": "Paris is the capital and most populous city of France."
    },
    {
      "question": "Which data structure uses LIFO principle?",
      "options": ["Queue", "Stack", "Linked List", "Tree"],
      "correctAnswer": "Stack",
      "explanation": "Stack follows the Last-In, First-Out (LIFO) principle."
    }
  ]
}
`,
});

const generateMCQQuestionsFlow = ai.defineFlow(
  {
    name: 'generateMCQQuestionsFlow',
    inputSchema: GenerateMCQQuestionsInputSchema,
    outputSchema: GenerateMCQQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
