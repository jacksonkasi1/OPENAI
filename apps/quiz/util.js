// Helper functions
const fs = require("fs")
const path = require("path")

function parseQuestion(raw_question) {
  const lines = raw_question.split("\n").filter((line) => line.trim() !== "")
  const question_text = lines.shift()

  const question_options = []
  const optionRegex = /^([A-Z]+[.)])\s*(.*)$/

  for (const line of lines) {
    const match = line.match(optionRegex)
    if (match) {
      question_options.push(`${match[1]} ${match[2].trim()}`)
    }
  }

  return { question_text, question_options }
}

// function saveRawQuestions(raw_questions) {
//   return new Promise((resolve, reject) => {
//     const uploadFolder = "output"
//     if (!fs.existsSync(uploadFolder)) {
//       fs.mkdirSync(uploadFolder)
//     }

//     const fileName = path.join(uploadFolder, "raw_questions.json")

//     fs.writeFile(fileName, JSON.stringify(raw_questions, null, 2), (err) => {
//       if (err) {
//         console.error(`Error writing file: ${fileName}`)
//         reject(err)
//       } else {
//         console.log(`File saved: ${fileName}`)
//         resolve()
//       }
//     })
//   })
// }

function saveRawQuestions(raw_questions, category) {
  return new Promise((resolve, reject) => {
    const uploadFolder = "output"
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder)
    }

    const timeStamp = new Date()
      .toISOString()
      .replace(/[:-]/g, "")
      .replace("T", "_")
      .replace(/\..+/, "")
    const fileName = path.join(
      uploadFolder,
      `${category}_${timeStamp}_raw_questions.json`
    )

    fs.writeFile(fileName, JSON.stringify(raw_questions, null, 2), (err) => {
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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports = {
  parseQuestion,
  saveRawQuestions,
  delay
}
