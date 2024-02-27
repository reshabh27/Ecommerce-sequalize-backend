const db = require("../db/index.js")
const User = db.user



exports.handleSignUp = async (req, res) => {
    // console.log(req.body);
    try {
        const user = await User.create(req.body)
        // console.log(user);
        const token = await user.generateToken()
        res.status(201).json({ message: "Registration successfully!", user, token })


    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.parent.sqlMessage })
    }
}



exports.handleLogIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findByCredentials(username, password)
        // console.log(user);
        const token = await user.generateToken();
        console.log(token);
        res.json({ message: "Login successful", user, token });
    } catch (e) {
        console.error("Error logging in user:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



exports.handleLogOut = async (req, res) => {
    try {
        const curruser = req.user;
        const currentTokens = JSON.parse(curruser.tokens);
        // console.log("currenttoken", currentTokens);
        const isAvailable = currentTokens.some(ele => ele.token === req.token);
        // console.log("isavailable", isAvailable);
        if (!isAvailable)
            return res.status(400).send({ message: "you are already logged out" })
        const filteredTokens = currentTokens.filter((token) => {
            return token.token !== req.token;
        })
        curruser.tokens = JSON.stringify(filteredTokens);
        // console.log("filteredtoken", filteredTokens);
        await curruser.save();
        res.json("Logout successful");
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



exports.handleLogOutAll = async (req, res) => {
    try {
        req.user.tokens = "[]"
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}


exports.handleGetMyProfile = async (req, res) => {
    res.send(req.user)
}


exports.handleUpdateMyProfile = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.handleDeleteMyProfile = async (req, res) => {
    try {
        // console.log(req.user._id);
        await User.findByIdAndDelete(req.user._id)
        // await req.user.remove()
        // sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}



