// Require the OpenAI package
const OpenAI = require("openai");
const express = require("express");
const app = express();
const router = express.Router();

// Load the contents of pdata.json
const pdata = require("./pdata.json"); // Ensure the file path is correct

router.get("/response", (req, res) => {
  // Extract the user's query from the request
  // Assuming the query is sent as a query parameter named 'userQuery'
  const userQuery = req.body.userQuery;
  console.log("api key", process.env["API-KEY"]);

  // Prepare instructions combining userQuery and pdata contents
  const instructions = `Generate a friendly response to ${userQuery} representing Aayush Thapaliya. The response should be as short as possible but at max within 50 words if user ask. Use the following data: ${JSON.stringify(
    pdata
  )}. to generate a friendly response`;

  // Initialize OpenAI with the API key
  //   const openai = new OpenAI(process.env["API-KEY"]);
  const openai = new OpenAI({
    apiKey: "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",
  });

  // Define an asynchronous function to get a response from GPT-3.5
  const gptResponse = async () => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant representing Aayush Thapaliya.Your response should be in JSON format.",
          },
          { role: "user", content: instructions },
        ],
        // messages: [
        //   {role: "system",content:"You are a helpful assistant. Your response should be in JSON format.",},
        //   { role: "user", content: "Hello!" },
        // ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      // Send the GPT-3.5 response back to the user
      res.send(completion.choices[0].message.content);
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while processing your request.");
    }
  };

  // Call the asynchronous function to get the GPT response
  gptResponse();
});

// Export the router for use in the main server file
module.exports = router;
