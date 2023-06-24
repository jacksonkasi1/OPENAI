## Survey GPT

This is a GPT-3 powered survey app. It is a simple app that allows you to create a survey and share it with others. The survey is created using GPT-3 and the results are displayed in a table.

## How to use

## INPUT

```js
const payload = {
  des: "Titanic is a critically acclaimed and commercially successful Hollywood film that tells the tragic love story of Jack Dawson (Leonardo DiCaprio), a young, impoverished artist, and Rose DeWitt Bukater (Kate Winslet), a wealthy, upper-class woman.",
  category: "Entertainment",
  quiz: [
    {
      type: "SingleSelect",
      count: 1
    },
    {
      type: "MultiSelect",
      count: 1
    },
    {
      type: "StarRating",
      count: 1
    },
    {
      type: "SmileyScale",
      count: 1
    },
    {
      type: "NPS",
      count: 1
    }
  ]
}
```

## OUTPUT

```js
[
  {
    "type": "SingleSelect",
    "question_text": "Question: Which of the following is a lead actor in the movie Titanic?",
    "question_options": [
      "A) Leonardo DiCaprio",
      "B) Morgan Freeman",
      "C) Brad Pitt",
      "D) Tom Cruise",
      "E) Matthew McConaughey",
      "F) Kate Winslet"
    ]
  },
  {
    "type": "MultiSelect",
    "question_text": "Question: Who stars as the main characters in the movie Titanic?",
    "question_options": [
      "A) Brad Pitt and Angelina Jolie",
      "B) Tom Cruise and Nicole Kidman",
      "C) Leonardo DiCaprio and Kate Winslet",
      "D) Johnny Depp and Helena Bonham Carter",
      "E) Will Smith and Halle Berry",
      "F) Robert De Niro and Uma Thurman"
    ]
  },
  {
    "type": "StarRating",
    "question_text": "Question: How would you rate your experience of the movie Titanic?",
    "question_options": [
      "A) Terrible",
      "B) Poor",
      "C) Average",
      "D) Good",
      "E) Great",
      "F) Excellent"
    ]
  },
  {
    "type": "SmileyScale",
    "question_text": "Question: How much did you like watching the movie Titanic?",
    "question_options": [
      "A) Loved it!",
      "B) Enjoyed it",
      "C) It was OK",
      "D) Did not like it",
      "E) Hated it",
      "F) Never seen it"
    ]
  },
  {
    "type": "NPS",
    "question_text": "Question: How would you rate your experience while watching the movie Titanic?",
    "question_options": [
      "A) Highly Satisfied",
      "B) Satisfied",
      "C) Neutral",
      "D) Dissatisfied",
      "E) Highly Dissatisfied",
      "F) N/A"
    ]
  }
]
```