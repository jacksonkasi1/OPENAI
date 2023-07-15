const { openai } = require("../openai");
const { info, success } = require("../utils/debug");

(async function run() {
  info("Starting fine-tuning...");
  const response = await openai.createFineTune({
    training_file: "file-ywF3njde8eJDeKDhCOadKWBO",
    model: "davinci", // ada, babbage, curie, davinci
  });
  info(JSON.stringify(response.data, null, 2)); // ft-tvERZYOzroB505vSy4v4npNA
  success("Fine tunes generated!");
})();
