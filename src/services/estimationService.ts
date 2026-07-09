/**
 * estimationService.ts — Construction Budget Estimation Engine
 *
 * SERVICE LAYER: All UI code imports from this file.
 * To switch to a real AI model (Gemini / OpenAI), replace the body of
 * `generateEstimate` with an API call. The interface and return type stay identical.
 */

export type ProjectType = 'residential' | 'commercial' | 'church' | 'renovation';
export type QualityTier  = 'basic' | 'standard' | 'premium' | 'luxury';

export interface EstimatorInput {
  projectType:          ProjectType;
  location:             string;
  landArea:             number;   // sqft
  floors:               number;
  constructionQuality:  QualityTier;
  hasBasement:          boolean;
  hasParking:           boolean;
  interiorQuality:      QualityTier;
}

export interface CostBreakdown {
  material:    number;
  labour:      number;
  electrical:  number;
  plumbing:    number;
  interior:    number;
  contingency: number;
  total:       number;
}

export interface EstimationResult {
  breakdown:       CostBreakdown;
  totalArea:       number;
  ratePerSqft:     number;
  timeline:        { min: number; max: number }; // months
  confidence:      number;                       // 0-100
  recommendations: string[];
  disclaimer:      string;
  generatedAt:     string;
}

// ── Configurable Rate Tables ───────────────────────────────────────────────────
// Source: Tamil Nadu construction market averages (2024-25).
// Update these tables to adjust pricing without touching UI code.

const BASE_RATES_PER_SQFT: Record<QualityTier, number> = {
  basic:    1600,
  standard: 2200,
  premium:  3200,
  luxury:   4500,
};

const INTERIOR_RATES_PER_SQFT: Record<QualityTier, number> = {
  basic:    300,
  standard: 600,
  premium:  1200,
  luxury:   2000,
};

const LOCATION_ENTRIES: { keywords: string[]; factor: number }[] = [
  { keywords: ['thanjavur', 'tanjore', 'pasupathikovil'],  factor: 0.95 },
  { keywords: ['kumbakonam'],                              factor: 0.95 },
  { keywords: ['nagapattinam'],                            factor: 0.92 },
  { keywords: ['trichy', 'tiruchirappalli', 'tiruchy'],    factor: 1.00 },
  { keywords: ['erode'],                                   factor: 0.98 },
  { keywords: ['salem'],                                   factor: 1.00 },
  { keywords: ['tirunelveli', 'nellai'],                   factor: 1.00 },
  { keywords: ['madurai'],                                 factor: 1.05 },
  { keywords: ['vellore'],                                 factor: 1.05 },
  { keywords: ['coimbatore'],                              factor: 1.15 },
  { keywords: ['chennai'],                                 factor: 1.30 },
  { keywords: ['bengaluru', 'bangalore'],                  factor: 1.35 },
];

const PROJECT_MULTIPLIERS: Record<ProjectType, number> = {
  residential: 1.00,
  commercial:  1.20,
  church:      1.15,
  renovation:  0.60,
};

const TIME_PER_FLOOR_MONTHS: Record<QualityTier, number> = {
  basic:    3,
  standard: 4,
  premium:  5,
  luxury:   6,
};

const MINIMUM_MONTHS: Record<QualityTier, number> = {
  basic:    6,
  standard: 8,
  premium:  10,
  luxury:   14,
};

// ── Internal helpers ───────────────────────────────────────────────────────────
function getLocationFactor(location: string): number {
  const lower = location.toLowerCase().trim();
  for (const entry of LOCATION_ENTRIES) {
    if (entry.keywords.some(k => lower.includes(k))) return entry.factor;
  }
  return 1.0; // default — other Tamil Nadu cities
}

function buildRecommendations(input: EstimatorInput): string[] {
  const recs: string[] = [];

  if (input.floors > 2)
    recs.push('Multi-story structures require a structural engineer\'s approval and RCC framing plan. Budget extra for load-bearing columns and shear walls.');
  if (input.hasBasement)
    recs.push('Waterproofing is critical in Tamil Nadu\'s humid climate. Allocate 8–10% of basement cost for SBR/crystalline waterproofing systems.');
  if (input.projectType === 'commercial')
    recs.push('Commercial projects require TNPCB approvals and fire safety compliance certificates. Factor in 3–4 months for regulatory clearances.');
  if (input.projectType === 'church')
    recs.push('Religious structures benefit from acoustic treatment and specialty liturgical lighting. These additions typically increase interior costs by 15–20%.');
  if (input.projectType === 'renovation')
    recs.push('A structural assessment before renovation is essential. Hidden defects and repairs typically add 15–25% to initial estimates.');
  if (input.constructionQuality === 'luxury' || input.constructionQuality === 'premium')
    recs.push('Premium and luxury builds benefit from smart home pre-wiring during the structural phase. Plan conduit routing and server room allocation early.');
  if (input.landArea > 2000)
    recs.push('For large plots, phased construction planning optimises cash flow and enables better quality supervision at each milestone.');
  if (input.constructionQuality !== input.interiorQuality)
    recs.push('Aligning interior finish quality with the construction grade improves long-term resale value and structural coherence.');
  recs.push('Get a certified soil test report before foundation work — especially important in delta and coastal districts of Tamil Nadu.');
  recs.push('Visit Merina Builders for a free site assessment and a detailed, project-specific quotation.');

  return recs.slice(0, 5);
}

// ── Public API ─────────────────────────────────────────────────────────────────
/**
 * generateEstimate — main entry point for the estimation service.
 *
 * Currently uses rule-based calculations. Replace the body with an API call
 * to Gemini / OpenAI to enable AI-powered estimation with no frontend changes.
 *
 * @param input  Validated EstimatorInput from the UI form
 * @returns      Promise<EstimationResult> — same shape regardless of backend
 */
export async function generateEstimate(input: EstimatorInput): Promise<EstimationResult> {
  // Simulates async processing latency (replace with real API call)
  await new Promise(r => setTimeout(r, 1800));

  const locationFactor = getLocationFactor(input.location);
  const typeFactor     = PROJECT_MULTIPLIERS[input.projectType];
  const ratePerSqft    = Math.round(BASE_RATES_PER_SQFT[input.constructionQuality] * locationFactor * typeFactor);

  const mainArea      = input.landArea * input.floors;
  const basementArea  = input.hasBasement ? Math.round(input.landArea * 0.5) : 0;
  const totalArea     = mainArea + basementArea;
  const baseCost      = totalArea * ratePerSqft + (input.hasBasement ? basementArea * 450 : 0);

  const material    = Math.round(baseCost * 0.48);
  const labour      = Math.round(baseCost * 0.27);
  const electrical  = Math.round(baseCost * 0.08);
  const plumbing    = Math.round(baseCost * 0.07);
  const contingency = Math.round(baseCost * 0.10);
  const interior    = Math.round(mainArea * INTERIOR_RATES_PER_SQFT[input.interiorQuality]);
  const parkingCost = input.hasParking ? input.floors * 80_000 : 0;
  const total       = material + labour + electrical + plumbing + contingency + interior + parkingCost;

  const baseMonths = Math.max(
    input.floors * TIME_PER_FLOOR_MONTHS[input.constructionQuality],
    MINIMUM_MONTHS[input.constructionQuality]
  );
  const renovFactor = input.projectType === 'renovation' ? 0.7 : 1;
  const minMonths   = Math.round(baseMonths * renovFactor);
  const maxMonths   = Math.round(baseMonths * renovFactor * 1.35);

  let confidence = 75;
  if (input.location.trim().length > 3) confidence += 3;
  if (LOCATION_ENTRIES.some(e => e.keywords.some(k => input.location.toLowerCase().includes(k)))) confidence += 4;
  confidence -= Math.max(0, (input.floors - 2) * 2);
  confidence  = Math.min(82, Math.max(62, confidence));

  return {
    breakdown:       { material, labour, electrical, plumbing, interior, contingency, total },
    totalArea,
    ratePerSqft,
    timeline:        { min: minMonths, max: maxMonths },
    confidence,
    recommendations: buildRecommendations(input),
    disclaimer: 'This is an AI-generated approximate estimate based on current market rates in Tamil Nadu. Actual costs may vary based on site conditions, material price fluctuations, local regulations, and specific design requirements. This estimate is not a final quotation. Contact Merina Builders for a detailed, site-specific assessment.',
    generatedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };
}
