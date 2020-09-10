const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({id: -1});

        if(!users || users.length === 0) {
            throw Error("No users found");
        }

        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});


module.exports = router;