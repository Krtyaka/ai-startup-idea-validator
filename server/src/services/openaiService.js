import OpenAI from "openai";

export const generateIdeaAnalysis = async (title, description) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are an expert startup consultant.

Analyze the following startup idea and return a structured JSON object with these fields:
problem, customer, market, competitor, tech_stack, risk_level, profitability_score, justification.

Scoring guidelines for profitability_score:
- 80–90: Clear problem, large market, strong differentiation
- 60–75: Reasonable idea, competitive or execution risk
- 40–55: Vague idea, crowded market, or unclear monetization
- Below 40: Very unclear value or weak business case

Tech Stack Guidelines:
- Web SaaS → React + Node.js is acceptable
- Mobile-first products → React Native or Flutter
- AI-heavy products → Python, ML frameworks
- Enterprise/internal tools → focus on scalability and search
- Choose technologies based on the idea, not defaults

Risk Level Guidelines:
- If the idea is vague, crowded, or lacks clear monetization, risk_level should be High.
- If the idea depends on a two-sided marketplace or hardware, risk_level should be High.
- If the idea has a clear paying customer and strong ROI, risk_level can be Low or Medium.
- Market should be Growing only if there is clear demand; otherwise use Competitive or Saturated.

Rules:
- Keep responses concise and realistic
- competitor must include exactly 3 competitors with one-line differentiation
- tech_stack must include 4–6 practical MVP technologies
- profitability_score must be an integer between 0 and 100
- Do NOT overhype
- Do NOT reuse the same tech stack unless appropriate
- Return ONLY valid JSON. Do not include explanations, markdown, or extra text.

Startup Idea:
Title: ${title}
Description: ${description}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content.trim();
};
