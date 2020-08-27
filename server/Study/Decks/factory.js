const Deck = require('./DeckResource')
const DeckExpression = require('./DeckExpressionRelation')
const Expression = require('../Expression/ExpressionResource')

function create(body) {
    let d = Deck(body)
    return d.save()
}

async function createDeckExp(decks, expressions, author) {
    return await expressions.map(async (expression) => {
        return await decks.map(async (deck) => {
            const body = {
                deck: deck,
                expression: expression,
                author: author
            }
            const DeckExpObj = new DeckExpression(body)
            return DeckExpObj.save()
                .catch(async err => {
                    if (err.code === 11000) {
                        console.log('user attempting to add duplicate')
                        throw new Error(expression  + ' has already been added to deck ' + deck)
                    }
                })
        })
    })
}

async function read(body) {
    let d = await Deck.find(body, (err, docs) => {
        if (err) throw new Error(err)
    })
    return d
}

function update(_id, body) {

}

function _delete(_id) {

}

module.exports = {
    create,
    createDeckExp,
    read,
    update,
    delete : _delete
}