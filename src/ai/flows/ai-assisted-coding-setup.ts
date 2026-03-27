'use server';
/**
 * @fileOverview An AI tool to assist teachers in generating boilerplate code and initial input/output test case prompts for coding questions.
 *
 * - aiAssistedCodingSetup - A function that handles the generation process.
 * - AiAssistedCodingSetupInput - The input type for the aiAssistedCodingSetup function.
 * - AiAssistedCodingSetupOutput - The return type for the aiAssistedCodingSetup function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAssistedCodingSetupInputSchema = z.object({
  problemDescription: z
    .string()
    .describe('A detailed description of the coding problem.'),
  programmingLanguage: z
    .string()
    .describe('The programming language for the coding question (e.g., Python, Java, C++).'),
  difficultyLevel: z
    .enum(['Easy', 'Medium', 'Hard'])
    .optional()
    .describe('The difficulty level of the coding problem.'),
  exampleFunctionSignature: z
    .string()
    .optional()
    .describe('An optional example function signature if a specific one is desired.'),
});
export type AiAssistedCodingSetupInput = z.infer<
  typeof AiAssistedCodingSetupInputSchema
>;

const AiAssistedCodingSetupOutputSchema = z.object({
  boilerplateCode: z.string().describe('Suggested boilerplate code for the problem.'),
  testCases: z
    .array(
      z.object({
        input: z.string().describe('The input for a specific test case.'),
        expectedOutput: z.string().describe('The expected output for the given input.'),
      })
    )
    .describe('An array of input/output test case pairs.'),
  explanation: z
    .string()
    .optional()
    .describe('An explanation of the generated code and test cases.'),
});
export type AiAssistedCodingSetupOutput = z.infer<
  typeof AiAssistedCodingSetupOutputSchema
>;

export async function aiAssistedCodingSetup(
  input: AiAssistedCodingSetupInput
): Promise<AiAssistedCodingSetupOutput> {
  return aiAssistedCodingSetupFlow(input);
}

const aiAssistedCodingSetupPrompt = ai.definePrompt({
  name: 'aiAssistedCodingSetupPrompt',
  input: {schema: AiAssistedCodingSetupInputSchema},
  output: {schema: AiAssistedCodingSetupOutputSchema},
  prompt: `You are an expert coding assistant for teachers, specializing in generating coding problems, boilerplate code, and test cases.

Your task is to generate boilerplate code and a set of initial input/output test cases for a coding question based on the provided problem description and programming language.

Programming Language: {{{programmingLanguage}}}
Problem Description: {{{problemDescription}}}
{{#if difficultyLevel}}Difficulty Level: {{{difficultyLevel}}}{{/if}}
{{#if exampleFunctionSignature}}Desired Function Signature: {{{exampleFunctionSignature}}}{{/if}}

Provide the boilerplate code, at least 3 distinct test cases (input and expected output), and a brief explanation.

Ensure the test cases cover different scenarios, including edge cases if applicable.`,
});

const aiAssistedCodingSetupFlow = ai.defineFlow(
  {
    name: 'aiAssistedCodingSetupFlow',
    inputSchema: AiAssistedCodingSetupInputSchema,
    outputSchema: AiAssistedCodingSetupOutputSchema,
  },
  async input => {
    const {output} = await aiAssistedCodingSetupPrompt(input);
    return output!;
  }
);
