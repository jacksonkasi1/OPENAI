const { openai } = require("../openai");
const { info, warn, error, success } = require("../utils/debug");

async function deleteFineTuneFile() {
  try {
    const response = await openai.deleteFile("file-p2vtG6brhLTUJoNoKkgh3riC");
    info(JSON.stringify(response.data, null, 2));
    info(response.data.id);
    success("Fine tune file deleted!");
  } catch (err) {
    error(err);
  }
}

deleteFineTuneFile();
