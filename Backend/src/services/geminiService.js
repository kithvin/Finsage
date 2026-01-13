const { GoogleGenerativeAI } = require('@google/generative-ai');
const AppError = require('../utils/AppError');

/**
 * @class GeminiService
 * @classdesc Service class for interacting with the Google Gemini AI API.
 * This service handles the initialization of the generative model and provides
 * methods to generate content based on financial data prompts.
 */
class GeminiService {
  /**
   * @constructor
   * @description Initializes the GeminiService instance.
   * Retrieves the API key from environment variables and sets up the
   * GoogleGenerativeAI client with the specified model (gemini-2.5-flash).
   * Logs a warning if the API key is missing.
   */
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  /**
   * @method generateAdvice
   * @description Generates personalized financial advice using the Gemini AI model.
   * This method constructs a prompt using the provided financial summary (incomes, assets, liabilities, cards)
   * and requests the AI to act as a professional financial advisor.
   *
   * @param {Object} data - The aggregated financial data object.
   * @param {Array<Object>} data.incomes - List of user income sources.
   * @param {Array<Object>} data.assets - List of user assets.
   * @param {Array<Object>} data.liabilities - List of user liabilities.
   * @param {Array<Object>} data.cards - List of user credit cards.
   * @returns {Promise<string>} A promise that resolves to the AI-generated advice text.
   * @throws {AppError} Throws a 500 error if the AI service fails to generate a response.
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
