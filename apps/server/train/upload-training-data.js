const fs = require('fs');
const path = require('path');
const { openai } = require("../openai");
const { info, warn, error, success } = require("../utils/debug");
const writeToFile = require("../utils/file");

const counterFilePath = path.resolve(__dirname, './counter.txt'); // Counter file path

// Function to get the current counter value from the file
async function getFileCounter() {
  try {
    const data = await fs.promises.readFile(counterFilePath, 'utf8');
    return Number(data);
  } catch (e) {
    if (e.code === 'ENOENT') {
      // If the file doesn't exist, return 1
      return 1;
    } else {
      // If some other error occurred, throw it
      throw e;
    }
  }
}

// Function to increment the counter and save it back to the file
async function incrementFileCounter() {
  const counter = await getFileCounter();
  const newCounter = counter + 1;
  await fs.promises.writeFile(counterFilePath, newCounter.toString(), 'utf8');
  return newCounter;
}

(async function run() {
  info("Starting fine-tuning...");

  try {
    const response = await openai.createFile(
      fs.createReadStream("./data/trained/char-prompts.jsonl"),
      "fine-tune"
    );

    // Check if response exists and write it to file
    if (response && response.data) {
      const fileCounter = await incrementFileCounter();
      const fileName = `./responses/response-${fileCounter}.json`;
      await writeToFile(fileName, JSON.stringify(response.data, null, 2));
      success(`Response has been written to ${fileName}`);
    } else {
      warn("No response data received from OpenAI.");
    }
  } catch (e) {
    error("An error occurred during fine-tuning: ", e.message);
  }
})();