const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const auth = require('../../middlewares/auth');


// fetch items from database
router.get('/', async (req, res) => {
    try {
        
        /* const items = await */ Item.find().sort({ date: -1 }).exec((err, items) => res.json(items));

       // res.status(200).json(items);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// add a new item
router.post('/', auth, async (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    try {
        const item = await newItem.save();
        if (!item) {
            throw Error('Something went wrong whilst saving new item');
        }

        res.status(200).json(item);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// delete an item by its id

//////////////////////////////////////////
// Add auth before working on front end //
//////////////////////////////////////////

router.delete('/:id', auth, async (req, res) => {
    try {
        //console.log(req.params.id)
        const item = await Item.findById(req.params.id);
        if (!item) throw Error('No item found!');
        
        const removed = await item.remove();
        if (!removed) throw Error('Error deleting item');

        res.status(200).json({ success: true });
    } catch (e) {
        res.status(400).json({ msg: e.message, success: false });
    }
});




module.exports = router;