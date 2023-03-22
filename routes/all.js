const router = require('express').Router();
const fs = require('fs')
const envfile = require('envfile')
const sourcePath = '.env'
const axios = require("axios");
const dotenv = require("dotenv");


dotenv.config();
router.get('/authenticate', async (req, res) => {
    const resp = await axios({
        method: 'POST',
        url: 'https://api-sandbox.orum.io/authenticate',
        headers: {
            accept: 'application/json',
            'X-API-Key': process.env.ORUM_API,
            'Orum-Version': process.env.ORUM_VERSION,
            'content-type': 'application/json'
        },
        data: {
            name: process.env.ORUM_EMAIL,
            secret: process.env.ORUM_PASSWORD
        }
    });
    const token = resp.data.auth.token;

    const parsedFile = envfile.parseFileSync(sourcePath);
    parsedFile.ORUM_TOKEN = token;
    fs.writeFileSync('./.env', envfile.stringifySync(parsedFile))
    console.log(envfile.stringifySync(parsedFile))
    res.send("New token generated!")
})

module.exports = router;