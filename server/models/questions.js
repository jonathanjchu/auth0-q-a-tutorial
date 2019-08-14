const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true,
        minlength: 5,
        unique: true
    },
    author: {
        type: String
    }
}, {timestamps: true});

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        minlength: 3
    },
    details: {
        type: String,
        required: true,
        minlength: 5
    },
    answers: [AnswerSchema],
    author: {
        type: String
    }
}, {timestamps: true});

const Question = mongoose.model("Question", QuestionSchema);
const Answer = mongoose.model("Answer", AnswerSchema);