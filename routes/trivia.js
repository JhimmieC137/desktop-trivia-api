const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const { questionsSchema, categorySchema } = require('../models/trivia')

const Question = mongoose.model('Question', questionsSchema)
const Category = mongoose.model('Category', categorySchema)




// Trivia homepage
router.get('/', async(req, res) => {
    
    try{
        const questions = await Question.find();
        const categories = await Category.find();
        console.log(questions)
        res.send(questions)
    }catch(err){
        console.log(err)
        res.send('Error ' + err)
    }
});


// For Questions
// Create questions 
router.post('/questions', async(req, res) => {
    
    try{
        const question = new Question({
            question_id: req.body.question_id,
            question: req.body.question,
            answer: req.body.answer,
            difficulty: req.body.difficulty,
            category: req.body.category
        })
        const report = await question.save()
        console.log(report)
        res.send(report)
    }catch(err){
        console.log(err)
        res.send('Error ' + err)
    }
});


// Display all questions
router.get('/questions', async(req, res) => {
    
    try{
        const questions = await Question.find();
        const categories = await Category.find();
        const totalQuestions = Object.keys(questions).length
        console.log(questions)
        res.json({
            "questions": questions,
            "total_questions": totalQuestions,
            "categories": categories,
            "current_category": "History",
        })
    }catch(err){
        console.log(err)
        res.send('Error ' + err)
    }
});

// Display question by question_id
router.get('/questions/:question_id', async(req, res) => {
    
    try{
        const question = await Question.findOne({question_id: req.params.question_id});
        res.json(question)
        console.log(question)
    }catch(err){
        console.log(err)
        res.send('Error ' + err)
    }
});

// Delete questions 
router.delete('/questions/:id', async(req, res) => {
    try{
            const report = await Question.deleteOne({_id: req.params.id})
            console.log(report)
            res.json(report)
    }catch(err){
        console.log(err);
        res.send('Error ' + err)
    }
})

// Update questions
router.patch('/questions/:question_id', async(req, res) => {
    try{
        const question = await Question.findOne({question_id: req.params.question_id})
        question_data = req.body
        for (let i of Object.keys(question_data)){
            question[i] = question_data[i]
        }
        const report = await question.save()
        console.log(report) 
        res.json(report)

    }catch(err){
        console.log(err)
        res.send('Error ' + err)
    }
})


// For Categories
// Display all categories
router.get('/categories', async(req, res) => {
    
    try{
        const categories = await Category.find();
        console.log(categories)
        res.send(categories)
    }catch(err){
        console.log(err)
        res.send('Error ' + err)
    }
});



// Create Category
router.post('/categories', async(req, res) => {
    try{

        const category = new Category({
            category_id: req.body.category_id,
            type: req.body.type
        })

        const report = await category.save()
        console.log(report)
        res.send(report)
    }catch(err){
        console.log(err)
        res.send('Error ' + err)
    }
});

// Questions per category
router.get('/categories/:category_id/questions', async(req, res) => {
    try{
        const category = await Category.findOne({category_id: req.params.category_id})
        const totalQuestions = await Question.count()
        // const totalQuestions = Object.keys(questions).length
        const questions = await Question.find()
        const categoryQuestions = []
        for (let i of questions){
            if (i.category == req.params.category_id){
                categoryQuestions.push(i)
            }
        }
        res.json({
            'questions': categoryQuestions,
            'total_questions': totalQuestions,
            'current_category': category
        })
    }catch(err){
        console.log(err)
        res.send('Error ' + err)
    }
})

// For quizz
router.post('/quizzes', async(req, res) => {
    try{
        let prev_questions = req.body.previous_questions
        let quiz_category = req.body.quiz_category
        let random_value = prev_questions[Math.floor(Math.random()*prev_questions.length)];
        const question = await Question.findOne({question_id: random_value})
        res.json(question)
        console.log(question)


    }catch(err){
        console.log(err)
        res.send("Error " + err)
    }
})

module.exports = router