import mongoose from "mongoose"
const appointmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    time: {
        type: String,
        required: [true, 'Time is required']
    }
})

export default mongoose.model('Appointment', appointmentSchema);