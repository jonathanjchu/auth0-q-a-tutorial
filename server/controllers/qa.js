const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
const ObjectId = mongoose.Types.ObjectId;
const Question = mongoose.model("Question");
const Answer = mongoose.model("Answer");

class QA {
    // retrieve all questions
    allQuestions(req, res) {
        Question.find({},
            null,
            { sort: { type: 1 } },
            (err, questions) => {
                if (err) {
                    console.log(err);
                    res.json({
                        status: 500,
                        error: err
                    });
                }
                else {
                    res.json({
                        status: 200,
                        questions: questions
                    });
                }
            });

        // const qs = questions.map(q => ({
        //     id: q.id,
        //     title: q.title,
        //     description: q.description,
        //     answers: q.answers.length,
        // }));
        // res.send(qs);
    }

    // get a specific question
    getQuestion(req, res) {
        // console.log("get question");
        Question.findById(req.params.id,
            (err, ques) => {
                if (err) {
                    // res.status(500).send();
                    res.json({
                        status: 500,
                        error: err
                    });
                }
                else {
                    res.json({
                        status: 200,
                        question: ques
                    });
                }
            });

        // const question = questions.filter(q => (q.id === parseInt(req.params.id)));
        // if (question.length > 1) return res.status(500).send();
        // if (question.length === 0) return res.status(404).send();
        // res.send(question[0]);
    }

    // insert a new question
    addNewQuestion(req, res) {
        console.log(req);
        let q = new Question(req.body);
        q.author = req.user.name;
        q.save((err) => {
            if (err) {
                res.json({
                    status: 500,
                    error: err
                });
            }
            else {
                // res.status(200).send();
                res.json({
                    status: 200
                });
            }
        });
    }

    // insert a new answer to a question
    addNewAnswer(req, res) {
        // console.log(req.body);
        let ans = new Answer(req.body);
        ans.author = req.user.name;
        console.log(ans);
        Question.findByIdAndUpdate(req.params.id,
            { $push: { answers: ans } },
            err => {
                if (err) {
                    res.json({
                        status: 500,
                        error: err
                    });
                }
                else {
                    res.json({
                        status: 200
                    });
                }
            })

        // const { answer } = req.body;

        // const question = questions.filter(q => (q.id === parseInt(req.params.id)));
        // if (question.length > 1) return res.status(500).send();
        // if (question.length === 0) return res.status(404).send();

        // question[0].answers.push({
        //     answer,
        // });

        // res.status(200).send();
    }

}

module.exports = new QA();