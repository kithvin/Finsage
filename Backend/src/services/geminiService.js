const { GoogleGenerativeAI } = require('@google/generative-ai');
const AppError = require('../utils/AppError');

/**
 * Service to interact with Google Gemini AI
 */
class GeminiService {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  /**
   * Generate financial recommendations based on provided data
   * @param {Object} data - Aggregated financial data (incomes, assets, liabilities, cards)
   * @returns {Promise<String>} - The AI generated advice
   */
  async generateAdvice(data) {
    try {
      const prompt = `
        You are a professional financial advisor. I will provide you with a summary of financial data including incomes, assets, liabilities, and credit cards.
        
        Please analyze this data and provide 3-5 concise, actionable, and specific recommendations to improve financial health. 
        Focus on debt reduction, savings optimization, and investment opportunities where applicable.
        
        Here is the financial data:
        ${JSON.stringify(data, null, 2)}
        
        Format your response as a clean list of recommendations.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new AppError('Failed to generate recommendations from AI service', 500);
    }
  }
}

module.exports = new GeminiService();
