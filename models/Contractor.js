const mongoose = require('mongoose');
const contractorSchema = mongoose.Schema(
    {

    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Contractor', contractorSchema);