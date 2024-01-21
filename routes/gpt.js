// this file will contain all the codes for
// checking grammar and spellings, use of emotional language and personal information requests
// it shall use the large laconst OpenAI = require("openai");
const express = require("express");
const app = express();
const router = express.Router();
const OpenAI = require("openai");
const grammarCheck = require("../controllers/grammar.json");

const gptCheck = async (req, res, next) => {
  try {
    const content = req.body.content;
    console.log("hello", content);
    console.log(grammarCheck);

    const instructions = `
        Analyze the email content using the provided JSON configuration. 
        JSON configuration: ${JSON.stringify(grammarCheck)}
        Email content: ${content}
        Assign weights to each prompt based on identified issues and  return the sum of all the weights the end as sum in JSON format
      `;

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
            { role: "user", content: content },
          ],
          // messages: [
          //   {role: "system",content:"You are a helpful assistant. Your response should be in JSON format.",},
          //   { role: "user", content: "Hello!" },
          // ],
          model: "gpt-3.5-turbo-1106",
          response_format: { type: "json_object" },
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
        console.log("This is output", response);
        const output = response.choices[0].message.content;
        console.log("Processed Text Data:\n", output);
        res.locals.result = output;
        res.rawResponse = output;

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
  next();
};

module.exports = gptCheck;
