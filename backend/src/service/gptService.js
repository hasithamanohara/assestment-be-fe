import OpenAI from "openai";
import Course from "../models/courseModel.js";

const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  apiKey:
    "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",
});

export const generateCourseRecommendations = async (prompt) => {
  console.log(process.env.OPENAI_API_KEY);
  const courses = await Course.find();
  const courseTitles = courses.map((course) => course.title).join(", ");

  const gptPrompt = `Based on: "${prompt}", recommend relevant courses from: ${courseTitles}. Provide a short explanation for each.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: gptPrompt }],
    max_tokens: 200,
  });

  return response.choices[0].message.content;
};
