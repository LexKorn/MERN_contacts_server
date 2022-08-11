const {Router} = require('express');
const Contacts = require('../models/Contacts');
// const auth = require('../middleware/auth.middleware');

const router = Router();


// во все endpoints добавить auth


router.post('/post', async (req, res) => {
    try {
        const {name, phone} = req.body;
        const contact = new Contacts({name, phone});
        await contact.save();
        res.status(201).json({message: 'Контакт добавлен'});

    } catch(err) {
        res.status(500).json({message: 'POST. Что-то пошло не так. Попробуйте снова'});
    }
});

router.get('/', async (req, res) => {
    try {
        const contacts = await Contacts.find(req.params);
        res.json(contacts);

    } catch(err) {
        res.status(500).json({message: 'GET. Что-то пошло не так. Попробуйте снова'});
    }
});

router.delete('/post-delete/:id', async (req, res) => {
    try {
        await Contacts.findOne({ _id: req.params.id }).exec((err, result) => {
            if (err) {
                return res.status(422).json({message: 'Нет такого контакта'});
            }

            result
                .remove()
                .then(() => res.status(200).json({message: 'Success'}))
                .catch((err) => console.error(err));
        });

    } catch(err) {
        res.status(500).json({message: 'DELETE. Что-то пошло не так. Попробуйте снова'});
    }
});

router.put('/post-update', async (req, res) => {
    try {
        await Contacts.findByIdAndUpdate(
            { _id: req.body.contactId },
            { $set: { ...req.body } },
            { new: true },

            (err, results) => {
                if (err) {
                    return res.status(422).json({message: 'Нет такого контакта'});
                }

                return res.status(200).json(results);
            }      
        );
        
    } catch(err) {
        console.error(err.message);
        // res.status(500).json({message: 'PUT. Что-то пошло не так. Попробуйте снова'});
    }
});


module.exports = router;