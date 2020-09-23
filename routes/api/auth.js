const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../../middlewares/auth');


router.post('/', async (req, res) => {
    try {

        const {login, password} = req.body;

        if(!login || !password) {
            throw Error("Enter all fields!");
        }

        const userToAuthenticate = await User.findOne({ login });
        
        if(!userToAuthenticate) {
            throw Error("User does not exist");
        }


        const match = await bcrypt.compare(password, userToAuthenticate.password);
        if(!match) {
            throw Error("Incorrect password");
        }


        jwt.sign(
            { id: userToAuthenticate.id },
            process.env.SECRET,
            (err, token) => {
                if(err) throw err;
                res.status(200).json({
                    token,
                    user: {
                        id: userToAuthenticate.id,
                        login: userToAuthenticate.login,
                        email: userToAuthenticate.email,
                    }
                })
            } 
        )



    } catch(e) {
        res.status(400).json({ msg: e.message });
    }
});



// Using async/await in this route
// for some reason causes weird nodejs errors
// so it is done via callbacks

router.get('/user', auth, (req, res) => {  
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});



module.exports = router;