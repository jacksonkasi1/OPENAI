// express server crud
const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const { openai } = require("./openai")

const port = 5000

app.use(cors())

app.get("/api/engines", async (req, res) => {
  try {
    const response = await openai.listEngines()
    res.status(200).json(response.data.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// generate image
app.get("/api/images", async (req, res) => {
  const { prompt } = req.query
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" })
  }
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512"
    })
    res.status(200).json(response.data.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
