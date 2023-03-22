const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
    {
        customer_reference_id: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        contractors: [
            {
                customer_reference_id: {
                    type: String
                },
                status: {
                    type: String,
                    default: "Waiting"
                }
            }
        ]
    },
    // { timestamps: true }
)
module.exports = mongoose.model('Company', companySchema);