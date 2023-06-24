const payload = {
  //   des: "make hospital related survey",
  //   category: "health",
//   des: "Titanic is a critically acclaimed and commercially successful Hollywood film that tells the tragic love story of Jack Dawson (Leonardo DiCaprio), a young, impoverished artist, and Rose DeWitt Bukater (Kate Winslet), a wealthy, upper-class woman.",
//   category: "Entertainment",
//   des: "Recent News. Rio de Janeiro 2016 Olympic Games, athletic festival held in Rio de Janeiro that took place August 5–21, 2016. The Rio Games were the 28th occurrence of the modern Olympic Games. The event marked the first time that either the Summer or the Winter Olympics was held in South America.",
//   category: "Sports",
//   des: "apollo hospital doctor & patients & consultancy",
//   category: "Health",
//   des: "donald trump presidential of america",
//   category: "Politics",
  des: "dmart shopping",
  category: "Shopping",
  quiz: [
    {
      type: "SingleSelect",
      count: 1
    },
    {
      type: "MultiSelect",
      count: 2
    },
    {
      type: "StarRating",
      count: 3
    },
    {
      type: "SmileyScale",
      count: 4
    },
    {
      type: "NPS",
      count: 2
    }
  ]
}

module.exports = payload
