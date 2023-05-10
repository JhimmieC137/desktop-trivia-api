const mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({

    question_id: {
        type: Number,
        unique: true,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
    },
    category: {
        type: Number,
        required: true
    }

})

const categorySchema = new mongoose.Schema({

    category_id: {
        type: Number,
        unique: true,
        required: true,
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = { questionsSchema, categorySchema }