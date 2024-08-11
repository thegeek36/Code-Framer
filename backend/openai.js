// openai.js
require('dotenv').config();
const axios = require('axios');

async function callOpenAIAPI(prompt) {
    const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    };
    const data = {
        prompt,
        max_tokens: 150, // Adjust based on your needs
        n: 1,
        stop: null,
        temperature: 0.5 // Adjust based on creativity vs. determinism
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}

module.exports = callOpenAIAPI;
