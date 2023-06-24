const express = require("express")
const app = express()
require("dotenv").config()

const { openai } = require("./openai")
const payload = require("./payload")
const { parseQuestion, saveRawQuestion } = require("./util")

const port = 3001

app.use(express.json())

app.get("/generate-quiz", async (req, res) => {
  req.body = payload // here modifying req.body
  const { des, category, quiz } = req.body

  try {
    const questions = []
    let totalQuestions = 0
    let questionsGenerated = 0

    // Calculate total number of questions
    for (const quizItem of quiz) {
      totalQuestions += quizItem.count
    }

    let questionIndex = 1
    for (const quizItem of quiz) {
      const { type, count } = quizItem

      for (let i = 0; i < count; i++) {
        const prompt = `Generate a ${type} quiz question related to ${category} and ${des}.`

        const questionResponse = await openai.createCompletion({
          model: "text-davinci-003",
          prompt,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 0.9
        })

        const raw_question = questionResponse.data.choices[0].text.trim()

        // // store this data in json file ( raw_question )
        // await saveRawQuestion(raw_question, questionIndex)
        questionIndex++

        const { question_text, question_options } = parseQuestion(raw_question)
        questions.push({ type, question_text, question_options })

        // const question = questionResponse.data.choices[0].text.trim()
        // questions.push({ type, question })

        // Update questions generated count and log progress
        questionsGenerated++
        const progress = (questionsGenerated / totalQuestions) * 100
        console.log(`Progress: ${progress.toFixed(2)}%`)
      }
    }

    res.status(200).json({ questions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to generate quiz questions." })
  }
})

app.listen(port, () => {
  console.log(`Quiz generator app listening at http://localhost:${port}`)
})
