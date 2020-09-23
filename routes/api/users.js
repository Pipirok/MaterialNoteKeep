const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');


function validateEmail(email) {
    const re = /([a-z0-9!#$%&'*+/=?^_`{|}~-]{4,68})+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    return re.test(email)
}



router.get('/', (req, res) => {
   User.find({}, ["_id", "login", "registration_date", "email"]).sort({ registration_date: -1 }).exec((err, users) => {
        if (err) throw err;
        res.json(users);
    })
    
});



router.post('/', async (req, res) => {
    try {
        const { login, email, password } = req.body;

        if(!login || !email || !password) {
            throw Error("Enter all fields!");
        }

        if (!validateEmail(email)) {
            throw Error("Invalid email")
        }

        if (await User.findOne({ email })) {
            throw Error("Email already registered")
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
            password: hash,
        })

        newUser.save().then(user => {

            jwt.sign(
                { id: user.id },
                process.env.SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    res.status(200).json({
                        token,
                        user: {
                            id: user.id,
                            login: user.login,
                            email: user.email,
                        }
                    })
                } 
            )

        })


    } catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        
        const deletedUser = await User.findByIdAndDelete(req.params.id)

        if(!deletedUser) {
            throw Error("Something went wrong, most likely incorrect id");
        }

        res.status(200).json({success: true})

    } catch(e) {
        res.status(400).json({msg: e.message, success: false})
    }
});


module.exports = router;