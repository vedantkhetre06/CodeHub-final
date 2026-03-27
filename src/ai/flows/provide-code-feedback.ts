'use server';
/**
 * @fileOverview A Genkit flow for providing AI-generated qualitative feedback on student code.
 *
 * - provideCodeFeedback - A function that handles the code feedback generation process.
 * - ProvideCodeFeedbackInput - The input type for the provideCodeFeedback function.
 * - ProvideCodeFeedbackOutput - The return type for the provideCodeFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideCodeFeedbackInputSchema = z.object({
  code: z.string().describe('The student\'s submitted code.'),
  problemStatement: z
    .string()
    .describe('The original problem statement for the coding assignment/test.'),
  language: z
    .string()
    .describe(
      'The programming language used (e.g., Python, Java, JavaScript, C++).'
    ),
});
export type ProvideCodeFeedbackInput = z.infer<
  typeof ProvideCodeFeedbackInputSchema
>;

const ProvideCodeFeedbackOutputSchema = z.object({
  overallFeedback: z
    .string()
    .describe('General qualitative feedback on the code, summarizing strengths and weaknesses.'),
  readability: z
    .string()
    .describe('Feedback on code structure, naming conventions, comments, and clarity.'),
  efficiency: z
    .string()
    .describe(
      'Analysis of the algorithm\'s performance (time/space complexity) and potential optimizations.'
    ),
  correctness: z
    .string()
    .describe('Feedback on logical flaws or edge cases not handled correctly.'),
  suggestions: z
    .array(z.string())
    .describe('A list of specific, actionable improvements the student can make.'),
  exampleRefactoring: z
    .string()
    .optional()
    .describe(
      'An optional example of how to refactor a part of the code to demonstrate a best practice, if applicable.'
    ),
});
export type ProvideCodeFeedbackOutput = z.infer<
  typeof ProvideCodeFeedbackOutputSchema
>;

export async function provideCodeFeedback(
  input: ProvideCodeFeedbackInput
): Promise<ProvideCodeFeedbackOutput> {
  return provideCodeFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeFeedbackPrompt',
  input: {schema: ProvideCodeFeedbackInputSchema},
  output: {schema: ProvideCodeFeedbackOutputSchema},
  prompt: `Act as a seasoned software engineer and code reviewer. Your task is to provide comprehensive qualitative feedback on a student's submitted code for a given problem statement.
Focus on aspects like overall correctness, readability, efficiency, and adherence to best practices. Do not simply state pass/fail, but explain *why* and *how*.

Problem Statement:
"""
{{{problemStatement}}}
"""

Submitted Code (Language: {{{language}}}):
"""
```{{{language}}}
{{{code}}}
```
"""

Provide your feedback in a structured JSON format, covering the following aspects:
1.  **overallFeedback**: A general summary of the code's strengths and weaknesses.
2.  **readability**: Comments on code structure, naming conventions, comments, and clarity.
3.  **efficiency**: Analysis of the algorithm's performance (time/space complexity) and potential optimizations.
4.  **correctness**: Any logical flaws or edge cases not handled correctly that might not be caught by basic test cases. Be specific.
5.  **suggestions**: A list of specific, actionable improvements the student can make to their code or coding style.
6.  **exampleRefactoring**: (Optional) If there's a clear opportunity for refactoring a small part of the code to demonstrate a best practice or a more efficient solution, provide a refactored snippet. Otherwise, omit this field.`,
});

const provideCodeFeedbackFlow = ai.defineFlow(
  {
    name: 'provideCodeFeedbackFlow',
    inputSchema: ProvideCodeFeedbackInputSchema,
    outputSchema: ProvideCodeFeedbackOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate code feedback.');
    }
    return output;
  }
);
