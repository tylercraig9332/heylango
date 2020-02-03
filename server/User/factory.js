const User = require('./User')
const crypto = require('crypto')

async function create(body) {
    body.salt = crypto.randomBytes(16).toString('hex')
    body.password = crypto.pbkdf2Sync(body.password, body.salt, 10000, 512, 'sha512').toString('hex');
    let newUser = new User(body)
    await newUser.save()
    return await _readByUsername(body.username)
}

function read(value) {
    if (typeof Number(value) === 'number') return _readById(value)
    else if (typeof value.toString() === 'string') return _readByUsername(value)
    else console.log("ERROR: unsupported read type")
}

async function _readByUsername(username) {
    let r = undefined
    await User.find({username: username}, (err, user) => {
        if (err) console.log(err)
        console.log(user)
        r = {
            username: user.username,
            id: user._id,
            email: user.email,
            meta: user.meta,
            createdAt: user._id.getTimestamp()
        }
    })
    return r
}

async function _readById(_id) {
    let r = undefined
    await User.findById(_id, (err, user) => {
        if (err) console.log(err)
        r = {
            username: user.username,
            id: user._id,
            email: user.email,
            meta: user.meta,
            createdAt: user._id.getTimestamp()
        }
    })
    return r
}

async function update() {

}

async function _delete() {

}

async function validate(data) {
    //let ret = "awaiting response..."
    let user = await User.findOne({username: data.username})
    if (user === null) throw Error('User does not exist')

    const hash = crypto.pbkdf2Sync(data.password, user.salt, 10000, 512, 'sha512').toString('hex');
    if (user.password === hash) {
        return {
            username: user.username,
            id: user._id,
            email: user.email,
            meta: user.meta,
            createdAt: user._id.getTimestamp()

        }
    } else {
        console.log('incorrect password')
        throw new Error('Incorrect Password')
    }
}

module.exports = {
    create,
    read,
    update,
    _delete: _delete,
    validate
}