const express = require('express');
const router = express.Router();
const Alien =  require('../models/alien')

router.post('/', async(req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    });

    try{
        const a1 = await alien.save()
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
});

router.get('/', async(req, res) => {

    try{
            const aliens = await Alien.find()
            res.json(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
});

router.get('/:id', async(req, res) => {

    try{ 
        const alien = await Alien.findById(req.params.id)
        res.json(alien)
    }catch(err){
        res.send('Error ' + err)
    }
});

router.patch('/:id', async(req, res) => {

    try{ 
        const alien = await Alien.alien(req.params.id)
        alien_data = req.body 
        for (let i of Object.keys(alien_data)){
            alien[i] = alien_data[i]
        }
        console.log(alien)
        const a1 = await alien.save()
        res.json(a1)
    }catch(err){
        res.send('Error ' + err)
    }
});

router.delete('/:id', async(req, res) => {

    try{ 
        const alien = await Alien.deleteOne({_id: req.params.id})
        res.json(alien)
    }catch(err){
        res.send('Error ' + err)
    }
});



module.exports = router