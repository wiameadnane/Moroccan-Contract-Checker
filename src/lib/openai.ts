import { AzureOpenAI } from 'openai';

let openaiInstance: AzureOpenAI | null = null;

export function getOpenAI(): AzureOpenAI {
  if (!openaiInstance) {
    if (!process.env.AZURE_OPENAI_API_KEY) {
      throw new Error('AZURE_OPENAI_API_KEY is required');
    }

    if (!process.env.AZURE_OPENAI_ENDPOINT) {
      throw new Error('AZURE_OPENAI_ENDPOINT is required');
    }

    openaiInstance = new AzureOpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      apiVersion: "2024-02-01",
    });
  }

  return openaiInstance;
}

export const openai = getOpenAI;
export default getOpenAI;
