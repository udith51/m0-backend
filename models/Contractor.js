const mongoose = require('mongoose');
const contractorSchema = mongoose.Schema(
    {
        customer_reference_id: {
            type: String,
            unique: true,
            required: true,
            index: true
        },
        email: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        companys: [
            {
                customer_reference_id: {
                    type: String
                }
            }
        ]
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Contractor', contractorSchema);