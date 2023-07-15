const { openai } = require("../openai");
const { info, warn, error, success } = require("../utils/debug");

async function getFineTunes() {
  try {
    const response = await openai.retrieveFineTune(
      "ft-AXA4wnVosM31KYrzH5qhdOu6"
    );
    info(JSON.stringify(response.data, null, 2));
    success(response.data.status);
    success("Fine tunes fetched!");
  } catch (err) {
    error(err);
  }
}

getFineTunes();
