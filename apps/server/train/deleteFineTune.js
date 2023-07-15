const { openai } = require("../openai");
const { info, warn, error, success } = require("../utils/debug");

async function deleteFineTune() {
  try {
    const response = await openai.deleteModel("ft-AXA4wnVosM31KYrzH5qhdOu6");
    info(JSON.stringify(response.data, null, 2));
    success(response.data.status);
    success("Fine tune deleted!");
  } catch (err) {
    error(err);
  }
}

deleteFineTune();
