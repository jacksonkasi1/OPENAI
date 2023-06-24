const fs = require("fs")

function parseQuestion(raw_question) {
  const lines = raw_question.split("\n").filter((line) => line.trim() !== "")
  const question_text = lines.shift()

  const question_options = []
  let option_label = ""
  let option_text = ""

  for (const line of lines) {
    const hasOptionLabel = /^[A-Za-z]\./.test(line)
    if (hasOptionLabel) {
      if (option_label && option_text) {
        question_options.push(`${option_label} ${option_text.trim()}`)
      }
      const [label, ...textParts] = line.split(" ")
      option_label = label
      option_text = textParts.join(" ")
    } else {
      option_text += ` ${line}`
    }
  }

  // Add the last option if available
  if (option_label && option_text) {
    question_options.push(`${option_label} ${option_text.trim()}`)
  }

  return { question_text, question_options }
}

function saveRawQuestion(raw_question, index) {
  return new Promise((resolve, reject) => {
    const fileName = `raw_question_${index}.json`
    const data = { raw_question }

    fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(`Error writing file: ${fileName}`)
        reject(err)
      } else {
        console.log(`File saved: ${fileName}`)
        resolve()
      }
    })
  })
}

module.exports = {
  parseQuestion,
  saveRawQuestion
}
