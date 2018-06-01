import app from '../src/main.js';
var pug = require('pug');

describe("the questions navigator", () => {
    var questions = [
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
        }
    ];
    var application = app();

    // beforeEach(function () {
    //     questionsNavigator = app().initialize();
    // });

    it("gest the current question", () => {
        var question = app.printNewQuestion();
        expect(questions).toContain(question);
    }); 
});