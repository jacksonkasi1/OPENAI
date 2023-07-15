const { info, warn, error, success } = require("../../utils/debug");
const { openai } = require("../../openai");
const characters = require("../../data/characters.json");
const writeToFile = require("../../utils/file");

(async function run() {
  try {
    info("app started!");
    let allPrompts = [];
    for (const character of characters) {
      const prompts = await generatePrompts(character);
      allPrompts.push(prompts);
    }

    await writeToFile(
      "./data/trained/char-prompts.jsonl",
      allPrompts.join("\n")
    ).then(() => {
      success("Prompts written!");
    });

    success("Prompts generated!");
  } catch (e) {
    error(e);
  }
})();

async function generatePrompts(character) {
  info("Generating prompts...");
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `
            You are an assistant that generates JSONL prompts based off of JSON data for fine tuning.
            Each response should be formatted as:
            ${JSON.stringify({
              prompt: `What species is ${character.name}?`,
              completion: character.species,
            })}
            Please generate 10 questions based off of the JSON.
            Each response should come from the following JSON:
            ${JSON.stringify(character)}
          `,
      },
    ],
  });

  const prompts = completion.data.choices[0].message.content;

  console.log(prompts);

  // Remove leading and trailing square brackets
  const trimmedPrompts = prompts.slice(1, -1);

  // Split the string into individual JSON objects
  const promptStrings = trimmedPrompts.split("},{");

  // Add the missing braces to each JSON object and join them with newline characters
  const jsonlPrompts = promptStrings
    .map((promptString) => `{${promptString}}`)
    .join("\n");

  return jsonlPrompts;
}
