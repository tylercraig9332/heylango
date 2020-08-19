const express = require('express')
const router = express.Router()
const factory = require('./factory')

// Determines if the current user has liked a post based on the body
router.get('/', (req, res) => {
    if (req.session.user === undefined) {
        res.statusMessage = 'Must be logged in to preform this action'
        res.status(200).send(false)
        return
    }
    req.body.user = user.id
    factory.read_like(req.body).then(l => {
        if (l.length > 0) res.send(true)
        else res.send(false)
    })
})
.get('/s/u/:id', (req, res) => {
    factory.read_save({_id : req.params.id}).then(r => res.send(r))
    .catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})
.get('/s/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.statusMessage = 'Not logged in'
        res.status(200).send(false)
        return
    }
    req.body.user = req.session.user.id
    factory.read_save({parent: req.params.id}).then(s => {
        if (s.length > 0) res.send(true)
        else res.send(false)
    })
})
// Determines if the current user has read the post given by the url
.get('/:post', async (req, res) => {
    if (req.session.user === undefined) {
        res.statusMessage = 'Must be logged in to preform this action'
        res.status(200).send(false)
        return
    }
    let l = await factory.readOne({parent: req.params.post, user: req.session.user.id})
    res.send(l)
})

router.post('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('Must be logged in to preform this action')
        return
    }
    req.body.user = req.session.user.id
    factory.create_like(req.body)
    res.status(200).send('Liked!')
})
.post('/s/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('Must be logged in to preform this action')
        return
    }
    req.body.user = req.session.user.id
    factory.create_save(req.body)
    res.status(200).send('Saved!')
})

router.delete('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('Must be logged in to preform this action')
        return
    }
    req.body.user = req.session.user.id
    factory.delete(req.body)
    res.status(200).send('Unliked')
})
.delete('/s/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('Must be logged in to preform this action')
        return
    }
    req.body.user = req.session.user.id
    factory.delete(req.body)
    res.status(200).send('Unsaved')
})

module.exports = router