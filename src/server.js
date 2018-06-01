const express = require('express');
const app = express();

// CONFIGURATION:
app.use(express.static('src'));
app.set('view engine', 'pug');
app.set('views', 'views');

// ROUTES:
app.get('/', (req, res) => {
    res.render('index', {'variable': 'valor'});
});

app.get('/api/questions', (request, response) => {
    let questions = [
        {
          id: 0,
          question: "Cual es la capital de Venezuela?",
          answer: [
            {
              id: 0,
              value: "Barcelona"
            },
            {
              id: 1,
              value: "Barquisimeto"
            },
            {
              id: 2,
              value: "Caracas"
            }
          ],
          correctAnswer: { id: 2 }
        },
        {
          id: 1,
          question: "Cual es la capital de Brasil?",
          answer: [
            {
              id: 0,
              value: "Rio de Janeiro"
            },
            {
              id: 1,
              value: "Brasilia"
            },
            {
              id: 2,
              value: "Sao Paulo"
            }
          ],
          correctAnswer: { id: 1 }
        },
        {
          id: 2,
          question: "Cual es la capital de Venezuela?2",
          answer: [
            {
              id: 0,
              value: "Barcelona"
            },
            {
              id: 1,
              value: "Barquisimeto"
            },
            {
              id: 2,
              value: "Caracas"
            }
          ],
          correctAnswer: { id: 2 }
        },
        {
          id: 3,
          question: "Cual es la capital de Brasil?3",
          answer: [
            {
              id: 0,
              value: "Rio de Janeiro"
            },
            {
              id: 1,
              value: "Brasilia"
            },
            {
              id: 2,
              value: "Sao Paulo"
            }
          ],
          correctAnswer: { id: 1 }
        },
        {
          id: 4,
          question: "Cual es la capital de Venezuela?4",
          answer: [
            {
              id: 0,
              value: "Barcelona"
            },
            {
              id: 1,
              value: "Barquisimeto"
            },
            {
              id: 2,
              value: "Caracas"
            }
          ],
          correctAnswer: { id: 2 }
        }
      ];
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(questions));
});

// START APP
app.listen(3000, () => console.log('Example app listening on port 3000!'))
