const express = require('express');
const bcrypt = require('bcrypt');
const { users, badges, ships, ranks, linkbadges, linkships, linkranks } = require('../models/prismaclient');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, mail, pwd, pwdRepeat } = req.body;
        if(pwd !== pwdRepeat) {
            res.send({
                status: 'error',
                message: 'Password doesnt match',
            })
            return;
        }
        const hashPwd = await bcrypt.hash(pwd, 10);

        const username = await users.findUnique({
            where: {
                name: name,
            },
            select: {
                name: true,
            }
        });
        const usermail = await users.findUnique({
            where: {
                email: mail,
            },
            select: {
                email: true,
            }
        });

        if (username) res.status(200).send({ status: 'error', message: 'Mail or username in use',});
        else if (usermail)  res.status(200).send({ status: 'error', message: 'Mail or username in use',});
        else {
            await users.create({
                data: {
                    email: mail,
                    name: name,
                    pwd: hashPwd,
                }
            });
            res.send({status: 'success', message: 'You are being redirected to the login page', action: 'redirect', target: '/login', data: {
                name: name,
            }});
        }
    } catch(err) {
        console.log(err)
        res.status(200).send({ status: 'error', message: 'Unknown error has accured'})
    }

})

router.post('/login', async (req, res) => {
    const {name, pwd} = req.body
    try {
        const user = await users.findFirst({
            where: {
                OR: [
                    {
                        name: name,
                    }, 
                    {
                        email: name,
                    }
                ]
            },
            select: {
                userID: true,
                name: true,
                pwd: true,
            }
        });
        if(!user) res.send({ status: 'error', message: 'Username or Email not in use'})
        else if (await bcrypt.compare(pwd, user.pwd)) {
            req.session.user = {
                name: user.name
            }
            res.send({ 
                status: 'success', 
                message: 'You are being redirected to the Login page', 
                data: {
                    name: user.name,
                    id: user.userID,
                }
            });
        } else {
            res.send({ status: 'error', message: 'Password not matching'})
        }
    } catch(err) {
        console.log(err)
        res.send({ status: 'error', message: 'Unknown error has accured'})
    }
})

router.post('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.send('destoyed');
    });
})

// If req.session false
router.get('/notAuth', async (req, res) => {
    if(req.session.user) res.send(false);
    else res.send(true)
})

// If req.session true
router.get('/auth', async (req, res) => {
    if(req.session.user) res.send(true);
    else res.send(false)
})

module.exports = router;

