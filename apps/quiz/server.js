const express = require("express")
const app = express()
require("dotenv").config()

const { openai } = require("./openai")
const payload = require("./payload")
const { parseQuestion, saveRawQuestions, delay } = require("./util")

const port = 3001

app.use(express.json())

const minOptionCount = 4
const maxOptionCount = 6

app.get("/generate-quiz", async (req, res) => {
  req.body = payload // here modifying req.body
  const { des, category, quiz } = req.body

  try {
    const questions = []
    let totalQuestions = 0
    let questionsGenerated = 0
    const raw_questions = []

    // Calculate total number of questions
    for (const quizItem of quiz) {
      totalQuestions += quizItem.count
    }

    for (const quizItem of quiz) {
      const { type, count } = quizItem

      for (let i = 0; i < count; i++) {
        const prompt = `Generate a ${type} quiz question related to ${category} and ${des}.`

        const promptWithInstruction = `Please provide a question with a minimum of ${minOptionCount} options and a maximum of ${maxOptionCount} options in the following format:\nQuestion: <Question text>\nA) <Option A>\nB) <Option B>\nC) <Option C>\n...\n\n${prompt}`
        const questionResponse = await openai
          .createCompletion({
            model: "text-davinci-003",
            prompt: promptWithInstruction,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.9
          })
          .catch((error) => {
            console.log(error.response)
            console.error(`Error generating question: ${error.message}`)
            return null
          })

        if (!questionResponse) {
          console.error("Skipping question due to API error.")
          continue // Skip to the next iteration of the loop
        }

        const raw_question = questionResponse.data.choices[0].text.trim()
        raw_questions.push(raw_question)

        try {
          const { question_text, question_options } =
            parseQuestion(raw_question)
          questions.push({ type, question_text, question_options })
        } catch (error) {
          console.error(`Error parsing question: ${error.message}`)
          console.error(`Raw question: ${raw_question}`)
        }

        // Update questions generated count and log progress
        questionsGenerated++
        const progress = (questionsGenerated / totalQuestions) * 100
        console.log(`Progress: ${progress.toFixed(2)}%`)

        await delay(1000) // Waits for 1 second (1000 ms) before continuing
      }
    }

    // Save raw questions to a file after all questions have been generated
    await saveRawQuestions(raw_questions, category)
    await saveRawQuestions(questions, category + "-parse")

    res.status(200).json({ questions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to generate quiz questions." })
  }
})

app.listen(port, () => {
  console.log(`Quiz generator app listening at http://localhost:${port}`)
})
