const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
    {
        customer_reference_id: {
            type: String,
            required: true
        },
        contractors: [
            {
                customer_reference_id: {
                    type: String
                }
            }
        ]
    },
    { timestamps: true }
)
module.exports = mongoose.model('Company', companySchema);