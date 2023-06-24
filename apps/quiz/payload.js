const payload = {
  des: "make hospital related survey",
  category: "health",
  quiz: [
    {
      type: "SingleSelect",
      count: 2
    },
    {
      type: "MultiSelect",
      count: 1
    },
    {
      type: "StarRating",
      count: 3
    },
    {
      type: "SmileyScale",
      count: 2
    },
    {
      type: "NPS",
      count: 1
    }
  ]
}

module.exports = payload
