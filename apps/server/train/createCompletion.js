const { openai } = require("../openai");
const { info, warn, error, success } = require("../utils/debug");

async function createCompletion() {
  try {
    const response = await openai.createCompletion({
      model: "ft-AXA4wnVosM31KYrzH5qhdOu6",
      prompt: "explain story about a character",
      max_tokens: 200,
    });
    if (response.data) {
      info("Choice: ", response.data.choices[0].text);
      info("------");
      info(JSON.stringify(response.data, null, 2));
    }
  } catch (err) {
    error(err);
  }
}

createCompletion();
