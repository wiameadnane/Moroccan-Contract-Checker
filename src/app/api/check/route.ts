import { NextRequest, NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';
import { searchRelevantChunks } from '@/lib/knowledge-base';

export interface ContractAnalysisRequest {
  clause: string;
  outputLanguage: 'ar' | 'fr' | 'en' | 'darija';
}

export interface ContractAnalysisResponse {
  severity: 'low' | 'medium' | 'high';
  category: string;
  issues: string[];
  rewrite: string;
  notes: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContractAnalysisRequest = await request.json();
    const { clause, outputLanguage } = body;

    if (!clause || !clause.trim()) {
      return NextResponse.json(
        { error: 'Clause text is required' },
        { status: 400 }
      );
    }

    if (!['ar', 'fr', 'en', 'darija'].includes(outputLanguage)) {
      return NextResponse.json(
        { error: 'Invalid output language' },
        { status: 400 }
      );
    }


    // Retrieve relevant legal chunks using RAG
    const relevantChunks = searchRelevantChunks(clause, 3);

    // Prepare the prompt with retrieved chunks
    const retrievedContext = relevantChunks.map((chunk, index) => 
      `**Legal Reference ${index + 1}** (${chunk.category}):\n${chunk.text}\n*Note: ${chunk.notes}*`
    ).join('\n\n');

    const languageNames = {
      ar: 'Arabic',
      fr: 'French', 
      en: 'English',
      darija: 'Moroccan Darija'
    };

    const systemPrompt = `You are a Moroccan contract assistant specializing in analyzing contract clauses according to Moroccan law (Code des Obligations et des Contrats - DOC). 

Use the following relevant Moroccan legal references when analyzing clauses:

${retrievedContext}

Your task is to analyze contract clauses and provide guidance in ${languageNames[outputLanguage]}.

IMPORTANT GUIDELINES:
1. Base your analysis on Moroccan law and the provided legal references
2. Consider the severity of potential legal issues: low (minor concerns), medium (notable issues), high (serious legal risks)
3. Categorize the clause type: Payment, Termination, Liability, Confidentiality, Force Majeure, Formation, Penalties, Commercial, or Other
4. FIRST identify specific issues or problems with the clause - CHECK FOR:
   - Wage violations (minimum wage in Morocco is ~3,500 MAD/month)
   - Working hour violations (maximum 44 hours/week, 8 hours/day)
   - Missing mandatory breaks or rest periods
   - Unfair termination clauses (notice periods required)
   - Missing social security or benefits
   - Liability exclusions that violate public order
   - Payment terms that violate commercial law
   - Missing required formalities or documentation
5. THEN provide a rewritten version that better complies with Moroccan law
6. Give practical notes and recommendations
7. Respond ONLY in valid JSON format
8. Use ${languageNames[outputLanguage]} for the "issues", "rewrite" and "notes" fields

Response format:
{
  "severity": "low|medium|high",
  "category": "category name",
  "issues": ["list of specific problems or alarming aspects found in the clause"],
  "rewrite": "improved clause text in ${languageNames[outputLanguage]}",
  "notes": "legal guidance and recommendations in ${languageNames[outputLanguage]}"
}`;

    const userPrompt = `Analyze this contract clause according to Moroccan law:

"${clause}"

Required output language: ${languageNames[outputLanguage]}

Provide your analysis in JSON format.`;

    // Call Azure OpenAI API
    const openai = getOpenAI();

    if (!process.env.AZURE_DEPLOYMENT_NAME_GPT5) {
      throw new Error('AZURE_DEPLOYMENT_NAME_GPT5 is required');
    }

    const completion = await openai.chat.completions.create({
      model: process.env.AZURE_DEPLOYMENT_NAME_GPT5,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error('No response from Azure OpenAI');
    }

    // Parse the JSON response
    let analysis: ContractAnalysisResponse;
    try {
      // Extract JSON from markdown code blocks if present
      let jsonContent = responseContent;
      const jsonMatch = responseContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonContent = jsonMatch[1];
      }
      
      analysis = JSON.parse(jsonContent);
    } catch {
      console.error('Failed to parse Azure OpenAI response:', responseContent);
      throw new Error('Invalid response format from AI');
    }


    return NextResponse.json(analysis);

  } catch (error) {
    console.error('Contract analysis error:', error);
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Azure OpenAI API configuration error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to analyze contract clause' },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
