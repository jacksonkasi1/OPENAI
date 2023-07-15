const { openai } = require("../openai");
const { info, warn, error, success } = require("../utils/debug");

async function listFineTunes() {
  info("Listing fine-tunes...");

  try {
    const response = await openai.listFineTunes();

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      warn("No fine-tune data available.");
      return;
    }

    console.table(response.data.data, ["id", "status", "model", "fine_tuned_model"]);

    let allTrainingFiles = [];
    response.data.data.forEach((fineTune, index) => {
      if (fineTune.training_files && fineTune.training_files.length > 0) {
        const trainingFiles = fineTune.training_files.map(file => ({
          ...file,
          fineTuneId: fineTune.id // add fine-tune id to each training file
        }));
        allTrainingFiles = allTrainingFiles.concat(trainingFiles);
      }
    });

    if (allTrainingFiles.length > 0) {
      console.table(allTrainingFiles, ["fineTuneId", "id", "purpose", "filename", "created_at"]);
    } else {
      warn("No training files data available.");
    }
    
  } catch (err) {
    error("Error while listing fine-tunes: ", err);
  }
}

listFineTunes();