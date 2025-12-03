// Simple helper to call Gemini API from the browser.
// NOTE: For a school project this is okay, but in real apps
// you should keep API keys on a backend server.

const GEMINI_API_KEY = 'AIzaSyC7fncsT6DcHokncYzxQburDzUHiLWy--o'; // <-- put your key here
const GEMINI_MODEL = 'gemini-2.5-flash'; // or 'gemini-flash-latest'

/**
 * Ask Gemini a question about water management.
 * - mode = 'general'  -> ignore layout/scenario
 * - mode = 'scenario' -> include layout & scenario as context
 */
export async function askGemini(question, layout, scenario, mode = 'general') {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error(
      'Gemini API key not set. Please edit src/services/gemini.js and add your key.'
    );
  }

  if (!question || !question.trim()) {
    throw new Error('Please enter a question about water management.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  // Decide what context to send
  const useScenarioContext = mode === 'scenario';
  const effectiveLayout = useScenarioContext ? layout : 'none';
  const effectiveScenario = useScenarioContext ? scenario : null;

  const systemPrompt = `
You are AquaFlow AI, the AI help agent for a water-management website called "AquaFlow AI".

Your behaviour:
- Start EVERY answer with exactly this sentence: "Hi, I'm AquaFlow's AI help agent."
- Answer user questions ONLY about:
  • water usage and conservation
  • plumbing (taps, pipes, leaks, tanks, pumps, motors, valves, bathrooms, kitchens)
  • water quality, filtration, storage, rainwater harvesting
  • school, home, apartment or building water systems
  • irrigation and basic farming water management
- If the user asks about anything that is NOT related to water or water management,
  politely refuse and say you can only answer water-related questions.

Question mode: ${useScenarioContext ? 'scenario-based' : 'general'}

Hidden context you may use (only if helpful, do NOT mention "cards" or "UI"):
- Layout: ${effectiveLayout}
- Scenario ID: ${effectiveScenario?.id || 'none'}
- Scenario name: ${effectiveScenario?.name || 'none'}
- Scenario description: ${effectiveScenario?.description || 'none'}

Important:
- Do NOT explain how the website works.
- Just answer as a helpful water expert.
- Keep language simple and clear for school students.
`;

  const userPrompt = `
User question:
${question}
`;

  const body = {
    contents: [
      {
        parts: [{ text: systemPrompt + '\n' + userPrompt }],
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      'Gemini API error: ' + res.status + ' ' + res.statusText + ' - ' + text
    );
  }

  const data = await res.json();
  const candidates = data.candidates || [];
  const first = candidates[0];
  const parts = first?.content?.parts || [];
  const text = parts.map((p) => p.text || '').join('\n');

  return text.trim();
}
