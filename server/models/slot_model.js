const mongoose=require ('mongoose')

    const Slots = new mongoose.Schema({
        slot: { type: Number, required: true },
        isBooked: { type: Boolean, required: true },
        company: { type: String, required: true },
        // userId: { type: String, required: true }
    },

)
const slot = mongoose.model('slot',Slots)
module.exports={slot}