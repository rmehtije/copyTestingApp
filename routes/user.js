const express = require('express');
const router = express.Router();

const UserDataModule = require('../modules/UserData');

router.get('/:email', async (req, res) => {

    try {
        const user = await UserDataModule.findOne({
            email: req.params.email
        });

        if (user) {
            return res.send({user});
        }

        const userData = new UserDataModule({
            email: req.params.email,
        });

        userData.save().then(data => {
            res.send({data});
        })

    } catch (error) {
        res.send({error})
    }

});

module.exports = router;

