import { generateChatResponse } from './gemini';
import { getChatSystemInstruction } from './promptBuilder';
import { estimateBudgetWithAI } from './budgetEstimator';
import type { BudgetEstimateData } from './budgetEstimator';
import { queryKnowledgeBase } from '../aiKnowledgeBase';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isQuickAction?: boolean;
  estimate?: any;
}

export interface EstimationFlowState {
  isCollecting: boolean;
  currentStep?: number; // 1 to 10
  data: BudgetEstimateData;
}

export interface ChatAssistantState {
  messages: ChatMessage[];
  estimationState: EstimationFlowState;
}

const STEPS_QUESTIONS: Record<number, string> = {
  1: "First, what type of project are you planning? (e.g., Commercial Building, Renovation, Warehouse, Church, Office, Other)",
  2: "What is the location of the project? (e.g., City, State, Country)",
  3: "What is the Plot Area in square feet?",
  4: "What is the desired Built-up Area per floor in square feet?",
  5: "How many floors are we constructing?",
  6: "What Construction Quality tier do you prefer? (Standard, Premium, Luxury)",
  7: "What Interior Requirement grade do you prefer? (Basic, Premium, Luxury)",
  8: "Do you need a Basement? (Yes / No)",
  9: "Should the project include Parking? (Yes / No)",
  10: "Do you have any Special Requirements or additional notes? (If none, type 'None')",
};

/**
 * Handles the turn-based chat conversation.
 * Sends everything to Gemini.
 */
export async function getAssistantChatResponse(
  userText: string,
  state: ChatAssistantState
): Promise<{ reply: string; updatedState: ChatAssistantState; isAnalyzing?: boolean }> {
  const updatedState = { ...state };
  const query = userText.toLowerCase().trim();

  // Check if user wants to cancel the estimator
  if (state.estimationState.isCollecting && (query === 'cancel' || query === 'exit' || query === 'stop')) {
    updatedState.estimationState = { isCollecting: false, data: {} };
    return {
      reply: "Alright, I have cancelled the budget estimation. How else can I help you today?",
      updatedState,
    };
  }

  // Check if user wants to start the budget estimator
  if (!state.estimationState.isCollecting && (query.includes('estimate') || query.includes('budget') || query.includes('calculator') || query.includes('cost'))) {
    updatedState.estimationState = {
      isCollecting: true,
      currentStep: 1,
      data: {},
    };
    return {
      reply: "Great! Let's start the Budget Estimation Interview. I will ask you 10 quick questions to gather details.\n\n" + STEPS_QUESTIONS[1],
      updatedState,
    };
  }

  // ── 1. GUIDED BUDGET INTERVIEW STATE FLOW ──────────────────────────────────
  if (state.estimationState.isCollecting) {
    const estState = { ...state.estimationState };
    const step = estState.currentStep || 1;

    // Save current step data
    switch (step) {
      case 1:
        estState.data.projectType = userText;
        break;
      case 2:
        estState.data.location = userText;
        break;
      case 3:
        estState.data.plotArea = parseInt(userText.replace(/\D/g, '')) || 1200;
        break;
      case 4:
        estState.data.builtArea = parseInt(userText.replace(/\D/g, '')) || 1200;
        break;
      case 5:
        estState.data.floors = parseInt(userText.replace(/\D/g, '')) || 1;
        break;
      case 6:
        estState.data.quality = userText;
        break;
      case 7:
        estState.data.interior = userText;
        break;
      case 8:
        estState.data.basement = userText;
        break;
      case 9:
        estState.data.parking = userText;
        break;
      case 10:
        estState.data.specialRequirements = userText;
        break;
    }

    // Move to next step or compile
    if (step < 10) {
      const next = step + 1;
      estState.currentStep = next;
      updatedState.estimationState = estState;
      return {
        reply: STEPS_QUESTIONS[next],
        updatedState,
      };
    } else {
      // Completed Step 10: Call Gemini
      estState.isCollecting = false;
      updatedState.estimationState = estState;

      try {
        // Return a signal to indicate loading state "Analyzing" on the UI
        return {
          reply: "",
          updatedState,
          isAnalyzing: true,
        };
      } catch (error) {
        return {
          reply: "Unable to generate an estimate at the moment. Please try again.",
          updatedState,
        };
      }
    }
  }

  // ── 2. GENERAL CHAT MODE (ALL INTELLIGENCE TO GEMINI) ──────────────────────
  try {
    const system = getChatSystemInstruction();
    
    // Fetch matched details from the website knowledge base
    const matchedDetails = queryKnowledgeBase(userText);
    
    // Construct context-rich query
    let promptWithContext = userText;
    if (matchedDetails.length > 0) {
      promptWithContext = `Here is the relevant factual context fetched from our website for this query:
${matchedDetails.map((detail, idx) => `- ${detail}`).join('\n')}

Based on this website context, please answer the following user query:
"${userText}"`;
    }

    const reply = await generateChatResponse(promptWithContext, system);
    return { reply, updatedState };
  } catch (error) {
    console.error('Error generating chat response:', error);
    return {
      reply: "Unable to connect at the moment. Please try again.",
      updatedState,
    };
  }
}
