// const { openai } = require("../openai");

const { success, info } = require("../utils/debug");

// // ** import debug
// const error = require("debug")("error");
// const info = require("debug")("info");

// error("error");

// const generateJsonl = async () => {
//   try {
//   } catch (error) {
//     error(error);
//   }
// };

(async () => {
  info("work start...");
  success("2 sec delay");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  success("2 sec delay");
})();

