const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.post('/register', async (req, res) => {
    try {
        const login = req.body.login;
        const email = req.body.email;
        const password = req.body.password;


        if (!login || !email || !password) {
            throw Error("Enter all fields");
        }

        if (await User.findOne({email})) {
            throw Error("Email already registered");
        }

        const salt = await bcrypt.genSalt(10);

        if(!salt) {
            throw Error("Something went wrong with bcrypt");
        }

        const hash = await bcrypt.hash(password, salt);

        if(!hash) {
            throw Error("Error during hashing the password");
        }

        const newUser = new User({
            login,
            email,
            password: hash
        });

        await newUser.save();

        res.status(200).json({login, email, hash})

    } catch(e) {
        res.status(400).json({ msg: e.message })
    }
});

module.exports = router;