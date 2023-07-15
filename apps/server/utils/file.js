const fs = require('fs').promises;
const path = require('path');

async function writeToFile(filePath, data) {
  // Ensure the directory exists
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  // Write the file
  await fs.writeFile(filePath, data);
}

module.exports = writeToFile;