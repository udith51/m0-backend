const router = require('express').Router();
const axios = require("axios");
const dotenv = require("dotenv");
const Contractor = require("../models/Contractor");

router.post('/add', async (req, res) => {
    try {
        const { id, email, first_name, last_name, dob, ssn } = req.body;
        const contractor = new Contractor({
            customer_reference_id: id,
            email: email
        })
        await contractor.save();
        const resp = await axios({
            method: 'POST',
            url: 'https://api-sandbox.orum.io/momentum/persons',
            headers: {
                'accept': 'application/json',
                'x-api-key': process.env.ORUM_API,
                'orum-version': process.env.ORUM_VERSION,
                'content-type': 'application/json',
                'authorization': `Bearer ${process.env.ORUM_TOKEN}`
            },
            data: {
                customer_reference_id: id,
                first_name: first_name,
                last_name: last_name,
                date_of_birth: dob,
                social_security_number: ssn
            }
        });
        res.send(contractor).status(200)
    }
    catch (error) {
        if (error.code == "11000")
            res.send("User exists").status(500)
        else
            res.send(error)
    }
})

module.exports = router;