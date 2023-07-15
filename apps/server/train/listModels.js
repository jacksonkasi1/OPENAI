const { openai } = require("../openai");
const { info, warn, error, success } = require("../utils/debug");

async function listModels() {
  info("Listing models...");

  try {
    const response = await openai.listModels();

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      warn("No model data available.");
      return;
    }

    // Map the data to include the owner type and id
    const formattedData = response.data.data.map(model => ({
      ...model,
      owned_by: model.owned_by || "",
    }));


    console.table(formattedData, ["id", "object", "created", "name", "owned_by"]);
  } catch (err) {
    error("Error while listing models: ", err);
  }
}

listModels();