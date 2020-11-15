const express = require('express')
const router = express.Router()
const factory = require('./factory')
const YouTube = require('./YouTube')
const yt = new YouTube() 

// TODO: handle wrong YouTube id : right now it crashed the server
router.get('/yt/:videoId', (req, res) => {
    yt.getVideoDetails(req.params.videoId, (data) => {
        const s = data.items[0].snippet
        const vidLango = {
            video_id: req.params.videoId,
            meta: {
                title: s.title,
                description: s.description,
                categoryId: s.categoryId,
                thumbnails: JSON.stringify(s.thumbnails)
            },
            language: s.defaultAudioLanguage,
            tags: s.tags,
            captions: [],
            author: req.session.user.id
        }
        factory.create(vidLango).then(doc => {
            res.send(doc)
        })
    })
})
.get('/list/:page?/:query?', (req, res) => { //:var?
    let qTerms = []
    let selecter = {}
    let page = 1
    if (req.params.page !== undefined) {
        page = req.params.page
    }
    if (req.params.query !== undefined) {
        qTerms = req.params.query.split('_')
        let c = {} // VidLango properties
        let t = [] // tags
        let lCode = ''
        let categoryId = ''
        let s = ''
        //console.log(qTerms)
        for (let i = 0; i < qTerms.length; i++) {
            let split = qTerms[i].split('-')
            switch (split[0]) {
                case 'lang':
                    c['language'] = new RegExp(`^${split[1]}`) // Ensures that codes like en_US are included
                    break
                case 'cat':
                    categoryId = split[1]
                    break
                case 'cefr':
                    t.push(split[1])
                    break
                case 'cap':
                    lCode = new RegExp(`^${split[1]}`) // Ensures that codes like en_US are included
                    break
                case 's':
                default:
                    s = split[1]
                    break
                }
        }
        let captions = (lCode !== '') ? {'captions.lCode': lCode} : {}
        let meta = (categoryId !== '') ? {'meta.categoryId': categoryId} : {}
        let tags = (t.length > 0) ? {tags : {$in: t}} : {}
        let search = (s !== '') ? {$text : {$search: s}} : {}
        console.log(search)
        selecter = {...c, ...captions, ...meta, ...tags, ...search}
    }
    factory.read(selecter, page, (err, docs) => {
        if (err) {
            res.status(500).send('MongoDB Error: ' + err.codeName)
            return
        }
        res.send(docs)
    })
})
.get('/:id', (req, res) => {
    factory.read({_id: req.params.id}, 1, (err, doc) => {
        if (err) {
            res.statusMessage(500).send('Database Error', err.codeName)
        }
        res.send(doc)
    })
})

router.post('/sub', (req, res) => {
    /** takes a srt file, converts and returns as json */
    let captions = []

    const srtText = req.files.sub.data.toString('utf8')
    const lines = srtText.split('\n')
    let cap = {};
    let i = 0
    lines.forEach((line) => {
        switch (i) {
            case 0:
                cap.id = line
                i++
                break
            case 1:
                const timeSegments = line.split(' --> ')
                cap.start = timeSegments[0]
                cap.end = timeSegments[1]
                i++
                break
            case 2:
                if (cap.content === undefined) {
                    cap.content = line
                } else if (line === '') {
                    // we are done with the current caption
                    captions.push(cap)
                    cap = {} // Overwrite pointer object
                    i = 0
                } else {
                    // we have a multi-line caption
                    cap.content += '\n'+ line
                }
                break
        }
    })
    let names = req.files.sub.name.split('.')
    const caption = {
        name: names[0],
        lCode: names[1], // Note this may not translate to an exact language code like it could be en_US
        captions: captions
    }
    res.send(caption)
})

router.put('/', (req, res) => {
    const body = {...req.body, snippet: JSON.stringify(req.body.snippet)}
    factory.update({_id: req.body._id, author: req.session.user.id}, body, (doc) => {
        res.send(doc)
    })
})

module.exports = router