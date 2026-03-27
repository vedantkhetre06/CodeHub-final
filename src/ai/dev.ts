import { config } from 'dotenv';
config();

import '@/ai/flows/provide-code-feedback.ts';
import '@/ai/flows/generate-mcq-questions.ts';
import '@/ai/flows/ai-assisted-coding-setup.ts';