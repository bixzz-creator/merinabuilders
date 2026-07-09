import { generateChatResponse } from './gemini';
import { getBudgetEstimationPrompt } from './promptBuilder';

export interface BudgetEstimateData {
  projectType?: string;
  location?: string;
  plotArea?: number;
  builtArea?: number;
  floors?: number;
  quality?: string;
  interior?: string;
  basement?: string;
  parking?: string;
  specialRequirements?: string;
}

export interface BudgetEstimateResponse {
  estimatedBudget: string;
  materialCost: string;
  labourCost: string;
  electricalCost: string;
  plumbingCost: string;
  interiorCost: string;
  contingencyCost: string;
  estimatedTimeline: string;
  recommendedConstructionType: string;
  confidence: number;
  recommendations: string[];
  assumptions: string[];
  importantNotes: string;
}

/**
 * Sends a structured prompt to Gemini asking for budget estimation calculations.
 * Expects a structured JSON output.
 */
export async function estimateBudgetWithAI(
  data: BudgetEstimateData
): Promise<BudgetEstimateResponse> {
  const prompt = getBudgetEstimationPrompt({
    projectType: data.projectType || 'Residential',
    location: data.location || 'Tamil Nadu',
    plotArea: data.plotArea || 1200,
    builtArea: data.builtArea || 1200,
    floors: data.floors || 1,
    quality: data.quality || 'Standard',
    interior: data.interior || 'Standard',
    basement: data.basement || 'No',
    parking: data.parking || 'Yes',
    specialRequirements: data.specialRequirements || 'None',
  });

  try {
    const jsonString = await generateChatResponse(prompt, undefined, 'application/json');
    const parsed = JSON.parse(jsonString) as BudgetEstimateResponse;
    return parsed;
  } catch (error) {
    console.error('Error in estimateBudgetWithAI:', error);
    throw new Error('Unable to generate an estimate at the moment. Please try again.');
  }
}
