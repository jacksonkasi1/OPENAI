import { Configuration, OpenAIApi } from "openai"

import env from "@/config"

const configuration = new Configuration({
  organization: env.organization,
  apiKey: env.apiKey
})

const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body)

  const shape = {
    attributes: ["data"]
  }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${prompt}. Return the response as a JSON object with a shape of ${JSON.stringify(
          shape
        )}.`
      }
    ]
  })

  const data = JSON.parse(completion.data.choices[0].message.content)

  res.status(200).json({
    data
  })
}
