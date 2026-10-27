import fetch from 'node-fetch';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyzeCode = async (sourceCode, language) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('CRITICAL: GEMINI_API_KEY is missing in process.env');
    return {
      summary: { high: 1, medium: 0, low: 0 },
      findings: [
        {
          category: 'Bug Risk',
          severity: 'High',
          message: 'GEMINI_API_KEY is missing in server environment variables.',
          lineStart: 1,
          lineEnd: 1,
          suggestedFix: 'Add GEMINI_API_KEY to your server .env file.'
        }
      ]
    };
  }

  const prompt = `
You are an expert static code analysis assistant. Analyze the following ${language} code for syntax errors, bugs, security vulnerabilities, performance issues, and style violations.

Code:
\`\`\`${language}
${sourceCode}
\`\`\`

You must respond with a JSON object matching this exact structure:
{
  "summary": {
    "high": number_of_high_severity_issues,
    "medium": number_of_medium_severity_issues,
    "low": number_of_low_severity_issues
  },
  "findings": [
    {
      "category": "Security" | "Performance" | "Style" | "Bug Risk",
      "severity": "High" | "Medium" | "Low",
      "message": "Description of the issue or syntax error",
      "lineStart": line_number_or_null,
      "lineEnd": line_number_or_null,
      "suggestedFix": "How to fix the issue"
    }
  ]
}
`;

  const modelName = 'gemini-3.5-flash-lite';
  const TIMEOUT_MS = 15000; // 15 seconds is plenty for the Lite model

  // Retry up to 3 times with exponential backoff if needed
  for (let attempt = 1; attempt <= 3; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      console.log(`📡 Sending analysis request to ${modelName} (Attempt ${attempt})...`);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.1
            }
          })
        }
      );

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.status === 503) {
        console.warn(`⚠️ ${modelName} experiencing high demand (503). Retrying in ${attempt * 1.5}s...`);
        await delay(attempt * 1500);
        continue;
      }

      if (!response.ok) {
        console.error(`❌ Gemini API Rejected Request:`, JSON.stringify(data, null, 2));
        throw new Error(data.error?.message || `HTTP error status: ${response.status}`);
      }

      const candidate = data.candidates?.[0];
      if (!candidate || !candidate.content?.parts?.[0]?.text) {
        throw new Error('Invalid response structure from Gemini API');
      }

      console.log(`✅ Code analysis succeeded using ${modelName}`);
      return JSON.parse(candidate.content.parts[0].text);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        console.warn(`⏱️ Request timed out after ${TIMEOUT_MS / 1000}s.`);
      } else {
        console.error(`Error on attempt ${attempt}:`, err.message);
      }
      if (attempt === 3) {
        return {
          summary: { high: 1, medium: 0, low: 0 },
          findings: [
            {
              category: 'Bug Risk',
              severity: 'High',
              message: `AI Analysis Failed: ${err.message}`,
              lineStart: 1,
              lineEnd: 1,
              suggestedFix: 'Please check your connection or try again in a moment.'
            }
          ]
        };
      }
      await delay(1500);
    }
  }
};
