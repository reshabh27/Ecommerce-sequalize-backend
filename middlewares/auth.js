const jwt = require('jsonwebtoken')
// const User = require('../models/user')
const db = require("../db/index");
const User = db.user;

const auth = async (req, res, next) => {
    try {
        const token = await req.header('Authorization').replace('Bearer ', '')
        // console.log("token", token);
        const decoded = jwt.verify(token, "secret_secret")
        const user = await User.findOne({ id: decoded.id, 'tokens.token': token })
        // console.log("decoded", decoded);
        // console.log("user", user);
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        req.role = decoded.role
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth