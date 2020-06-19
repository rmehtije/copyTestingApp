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
            res.send({data, created: true});
        })

    } catch (error) {
        res.send({error})
    }

});

router.post('/save', async (req, res) => {
    try {
        const body = req.body;
        console.log('body', body);

        const userData = await UserDataModule.findOne({
            email: body.email
        });

        if (userData) {

            userData.name = body.name;
            userData.imageUrl = body.imageUrl;
            userData.birthday = body.birthday;
            userData.country = body.country;
            userData.experience = body.experience;
            userData.bio = body.bio;
            userData.name = body.name;

            return userData.save().then(data => {
                res.send({done: true});
            });

        }

        throw Error('User not found');
    } catch (error) {
        res.send({error});
    }
});

router.post('/delete', async (req, res) => {
    try {
        return UserDataModule.deleteOne({
            email: req.body.email
        }).then(() => {
            res.send({done: true});
        });
    } catch (error)  {
        res.send({error});
    }

});

module.exports = router;

