import OpenAI from "openai";

export const generateIdeaAnalysis = async (title, description) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are an expert startup consultant.

Analyze the following startup idea and return a structured JSON object with these fields:
problem, customer, market, competitor, tech_stack, risk_level, profitability_score, justification.

Rules:
- Keep responses concise and realistic
- competitor must include exactly 3 competitors with one-line differentiation
- tech_stack must include 4–6 practical MVP technologies
- profitability_score must be an integer between 0 and 100
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
