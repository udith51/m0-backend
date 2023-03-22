const router = require('express').Router();
const axios = require("axios");
const dotenv = require("dotenv");
const Company = require('../models/Company');
const Contractor = require('../models/Contractor');

router.post('/add', async (req, res) => {
    try {
        const { id, email, legal_name, business_name, entity_type, tax_id, tax_id_type, account_holder_name, incorporation_date } = req.body;

        const company = new Company({
            customer_reference_id: id,
            email: email
        })
        await company.save();
        const resp = await axios({
            method: 'POST',
            url: 'https://api-sandbox.orum.io/momentum/businesses',
            headers: {
                'accept': 'application/json',
                'x-api-key': process.env.ORUM_API,
                'orum-version': process.env.ORUM_VERSION,
                'content-type': 'application/json',
                'authorization': `Bearer ${process.env.ORUM_TOKEN}`
            },
            data: {
                customer_reference_id: id,
                legal_name: legal_name,
                business_name: business_name,
                entity_type: entity_type,
                tax_id: tax_id,
                tax_id_type: tax_id_type,
                account_holder_name: account_holder_name,
                incorporation_date: incorporation_date
            }
        });
        console.log(resp.data);
        res.send("Company Added").status(200);
    }
    catch (error) {
        if (error.code == "11000")
            res.send("User exists").status(500)
        else
            res.send(error)
    }
})

router.post('/link/:id', async (req, res) => {
    try {
        const { contractor_id } = req.body;
        console.log(contractor_id);
        const contractor = await Contractor.findOne({ customer_reference_id: contractor_id });
        console.log(contractor);
        if (contractor) {
            const filter = { customer_reference_id: req.params.id };
            const update = { customer_reference_id: contractor_id }
            const company = await Company.findOne(filter);
            company.contractors.push(update);
            contractor.companys.push(filter)
            await company.save();
            await contractor.save();
            res.send("Contractor-Company linked").status(200);
        }
        else
            res.send("No such contractor exists").status(404);

    } catch (e) {
        res.send(e).status(500)
    }
})



module.exports = router;