// this file will contain all the codes for
// checking grammar and spellings, use of emotional language and personal information requests
// it shall use the large language model to determine the weight for each aspect

const express = require("express");
const router = express.Router();
const grammarCheck = require("./grammar.json");
const OpenAI = require("openai");
const gptCheck = async (req, res, next) => {
  try {
    const rawResponse = JSON.stringify(res.combinedResults);
    const instructions = `Generate a user-friendly summary of the email analysis results using the ${rawResponse}. Include the following information:\n\n1. URL Verification\n2. Domain Name Verification:\n   - \n   - Message:\n\n3. Email Content Analysis:\n   - Grammar Prompts:\n      - List identified grammar issues with corresponding weights.\n   - Emotionally Charged Language Prompts:\n      - List identified emotionally charged language issues with corresponding weights.\n   - Total Weight: \n\nProvide a concise summary for the end user.\n\nAdditionally, please visit social media platforms like Reddit or LinkedIn to verify if this is a legitimate job offer. If you find something different or have any doubts, please contact the responsible person to verify further.`;

    const openai = new OpenAI({
      apiKey: process.env.api_key,
    });

    const gptResponse = async () => {
      try {
        const response = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: instructions,
            },
            { role: "user", content: rawResponse },
          ],
          // messages: [
          //   {role: "system",content:"You are a helpful assistant. Your response should be in JSON format.",},
          //   { role: "user", content: "Hello!" },
          // ],
          model: "gpt-4",
          // response_format: { type: "json_object" },
        });

        // Send the GPT-3.5 response back to the user
        // // res.send(completion.choices[0].message.content);
        // console.log(completion.choices[0].message.content);

        // Check Clarifai API response status
        if (!response) {
          console.error("gpt API response error:", response);
          res.status(500).json({ error: "Failed to process text data" });
          return;
        }

        // Extract and log the processed text data
        const output = response.choices[0].message.content;
        console.log("Processed Text Data:\n", output);
        res.result = output;
        res.rawResponse = output;
        next();

        // Send a JSON response to the client
      } catch (error) {
        console.error("Error processing text data:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    };

    // Call the asynchronous function to get the GPT response
    gptResponse();

    // Send a JSON response to the client
  } catch (error) {
    console.error("Error processing text data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = gptCheck;
