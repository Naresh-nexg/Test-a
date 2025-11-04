import { GoogleGenAI, Type } from "@google/genai";
import { JobMatch } from '../types';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    jobs: {
      type: Type.ARRAY,
      description: "A list of 5 suitable job matches.",
      items: {
        type: Type.OBJECT,
        properties: {
          jobTitle: {
            type: Type.STRING,
            description: "A realistic and suitable job title."
          },
          company: {
            type: Type.STRING,
            description: "A fictional but plausible company name."
          },
          location: {
            type: Type.STRING,
            description: "The location provided by the user."
          },
          summary: {
            type: Type.STRING,
            description: "A 2-3 sentence summary explaining why the job is a good fit for the user."
          },
          matchPercentage: {
            type: Type.NUMBER,
            description: "A percentage score from 0 to 100 representing the quality of the match."
          },
        },
        required: ['jobTitle', 'company', 'location', 'summary', 'matchPercentage']
      }
    }
  },
  required: ['jobs']
};


export const getCareerMatches = async (profile: string, location: string): Promise<JobMatch[]> => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error("API_KEY environment variable not set. The application UI should prevent this function from being called.");
  }
  const ai = new GoogleGenAI({ apiKey: "AIzaSyBk_EA87l0eX8raiiw7q23K0rdBNv-7fjA" });

  const prompt = `
    You are an AI Career Advisor. Based on the user's profile and desired location, generate a list of 5 suitable job roles.
    For each role, provide a realistic job title, a fictional but plausible company name, a summary of why it's a good fit, and a match percentage.
    The location for all jobs should be the one provided by the user.

    User Profile:
    ---
    ${profile}
    ---

    Location:
    ---
    ${location}
    ---

    Provide your response in a structured JSON format according to the provided schema. Do not include any introductory text, markdown formatting, or any other text outside of the JSON object.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString) as { jobs: JobMatch[] };

    // Validate and clamp percentage for each job
    const validatedJobs = parsedData.jobs.map(job => ({
      ...job,
      matchPercentage: Math.max(0, Math.min(100, Math.round(job.matchPercentage))),
    }));

    return validatedJobs;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check the console for more details.");
  }
};