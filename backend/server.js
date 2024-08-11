// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const OpenAI = require('openai');
//const callOpenAIAPI = require('./openai'); // Import the utility function
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
  
async function callOpenAIAPI(prompt, model = "gpt-3.5-turbo", maxTokens = 150, temperature = 0.7) {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
      temperature: temperature,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}

// Compile and run code
app.post('/api/compile', async (req, res) => {
  const { language, code, input } = req.body;

  // Mapping of languages to their appropriate identifiers and version indexes for JDoodle API
  const languageConfig = {
    python: { lang: 'python3', versionIndex: 3 },
    javascript: { lang: 'nodejs', versionIndex: 0 },
    java: { lang: 'java', versionIndex: 3 },
    c: { lang: 'c', versionIndex: 5 },
    cpp: { lang: 'cpp17', versionIndex: 0 }
  };

  const lang = languageConfig[language]?.lang;
  const versionIndex = languageConfig[language]?.versionIndex;

  if (!lang || versionIndex === undefined) {
    return res.status(400).json({ error: `Language ${language} is not supported or version index is missing.` });
  }

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      script: code,
      language: lang,
      versionIndex: versionIndex,
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      stdin: input
    });

    if (response.data.statusCode === 200) {
      res.json({ output: response.data.output });
    } else {
      res.status(response.data.statusCode).json({ error: response.data.error || 'Compilation failed' });
    }
  } catch (error) {
    console.error("Compilation error:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ 
      error: error.response ? error.response.data.error : 'Compilation failed',
      details: error.message
    });
  }
});


// Generate algorithm
// app.post('/api/algorithm', async (req, res) => {
//   const { code, language } = req.body;
//   const prompt = `Generate an algorithm for the following ${language} code:\n\n${code}\n\nAlgorithm:`;
//   try {
//     const algorithm = await getOpenAIResponse(prompt);
//     res.json({ algorithm });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to generate algorithm' });
//   }
// });


app.post('/api/algorithm', async (req, res) => {
  const { code, language } = req.body;
  const prompt = `Generate an algorithm for the following ${language} code:\n\n${code}\n\nAlgorithm:`;
  
  try {
    const algorithm = await callOpenAIAPI(prompt); // Use the utility function here
    res.json({ algorithm });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Failed to generate algorithm' });
  }
});


// Generate pseudo-code
// app.post('/api/pseudocode', async (req, res) => {
//   const { code, language } = req.body;
//   const prompt = `Convert the following ${language} code to pseudo-code:\n\n${code}\n\nPseudo-code:`;
//   try {
//     const pseudocode = await getOpenAIResponse(prompt);
//     res.json({ pseudocode });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to generate pseudo-code' });
//   }
// });

app.post('/api/pseudocode', async (req, res) => {
  const { code, language } = req.body;
  const prompt = `Convert the following ${language} code to pseudo-code:\n\n${code}\n\nPseudo-code:`;
  try {
    const pseudocode = await callOpenAIAPI(prompt);
    res.json({ pseudocode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate pseudo-code' });
  }
});





// // Add comments
// app.post('/api/comment', async (req, res) => {
//   const { code, language } = req.body;
//   const prompt = `Add detailed comments to the following ${language} code:\n\n${code}\n\nCommented code:`;
//   try {
//     const commentedCode = await getOpenAIResponse(prompt);
//     res.json({ commentedCode });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add comments' });
//   }
// });

app.post('/api/comment', async (req, res) => {
  const { code, language } = req.body;
  const prompt = `Add detailed comments to the following ${language} code:\n\n${code}\n\nCommented code:`;
  try {
    const commentedCode = await callOpenAIAPI(prompt);
    res.json({ commentedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add comments' });
  }
});


// Optimize code
// app.post('/api/optimize', async (req, res) => {
//   const { code, language } = req.body;
//   const prompt = `Optimize the following ${language} code for better performance:\n\n${code}\n\nOptimized code:`;
//   try {
//     const optimizedCode = await getOpenAIResponse(prompt);
//     res.json({ optimizedCode });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to optimize code' });
//   }
// });


app.post('/api/optimize', async (req, res) => {
  const { code, language } = req.body;
  const prompt = `Optimize the following ${language} code for better performance:\n\n${code}\n\nOptimized code:`;
  try {
    const optimizedCode = await callOpenAIAPI(prompt);
    res.json({ optimizedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to optimize code' });
  }
});



// // Convert code
// app.post('/api/convert', async (req, res) => {
//   const { code, fromLanguage, toLanguage } = req.body;
//   const prompt = `Convert the following ${fromLanguage} code to ${toLanguage}:\n\n${code}\n\n${toLanguage} code:`;
//   try {
//     const convertedCode = await getOpenAIResponse(prompt);
//     res.json({ convertedCode });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to convert code' });
//   }
// });


app.post('/api/convert', async (req, res) => {
  const { code, fromLanguage, toLanguage } = req.body;
  const prompt = `Convert the following ${fromLanguage} code to ${toLanguage}:\n\n${code}\n\n${toLanguage} code:`;
  try {
    const convertedCode = await callOpenAIAPI(prompt);
    res.json({ convertedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to convert code' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));