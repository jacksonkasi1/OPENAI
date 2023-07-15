const { openai } = require("../openai");
const { info, warn, error, success } = require("../utils/debug");

async function listFiles() {
  info("Listing files...");

  try {
    const response = await openai.listFiles();

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      warn("No file data available.");
      return;
    }

    console.table(response.data.data, ["id", "object", "filename", "status", "created_at"]);
  } catch (err) {
    error("Error while listing files: ", err);
  }
}

listFiles();