const { openai } = require("../../openai");
const writeToFile = require("../../utils/file");
const { info, warn, error, success } = require("../../utils/debug");

const character = {
  name: "",
  biography: "",
  species: "",
  homeworld: {
    name: "",
    description: "",
  },
  attributes: [""],
};

async function generateCharacters() {
  info("Starting character generation...");
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
            You are a sci-fi character generator for a fictional TV show the does not yet exist.
            Create a JSON object for each character in the format of ${JSON.stringify(
              character
            )}.
            Add each character to an array.
            Respond with the array in JSON format.
            Do not include any commentary outside of the JSON.
          `,
        },
        {
          role: "user",
          content: `Generate 1 character and respond with an array of objects in JSON form.`,
        },
        {
          role: "assistant",
          content: JSON.stringify([
            {
              name: "Zara Flux",
              biography:
                "Zara is a renegade bounty hunter who survived a harrowing escape from a maximum security prison. She has a rebellious streak and is feared by many in the galaxy for her cunning and ruthlessness.",
              species: "Human",
              homeworld: {
                name: "Corellia",
                description:
                  "A bustling planet with a rich history of smugglers and traders.",
              },
              attributes: ["Expert marksmanship", "Agile", "Intimidating"],
            },
          ]),
        },
        {
          role: "user",
          content: `Generate 5 more unique characters and respond with an array of objects in JSON form.`,
        },
      ],
    });

    if (!completion.data.choices[0].message.content) {
      warn("No content received from OpenAI completion.");
      return;
    }

    const data = JSON.parse(completion.data.choices[0].message.content);

    if (!data || data.length === 0) {
      warn("No valid character data received.");
      return;
    }

    info(`Received ${data.length} characters. Writing to file...`);
    writeToFile("./data/characters.json", JSON.stringify(data, null, 2));
    success("Successfully wrote character data to file.");
  } catch (e) {
    error("An error occurred during character generation: ", e.message);
  }
}

generateCharacters();