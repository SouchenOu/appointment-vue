import Appointment from "../models/Appointment.js";
import moment from 'moment';
import mongoose from 'mongoose';

const { isValidObjectId } = mongoose;

export const getAllApointements= async(req, res) =>{
    try {
        const appointments = await Appointment.find()
          .sort({ date: 1, time: 1 })
          .exec();
          
        res.status(200).json({ success: true, appointments });

      } catch (error) {
        console.error('Error fetching appointments:', error);
        throw new Error('Could not fetch appointments');
      }

}

export const createApointements = async(req, res) =>{
    const { title, date, time } = req.body;
  
    
    try{
      if(!title){
        return res.status(400).json({ status: 'failure', error: 'The title should not be empty' });
      }
      if(!date){
        return res.status(400).json({ status: 'failure', error: 'The date should not be empty' });
      }
      if(!time){
        return res.status(400).json({ status: 'failure', error: 'The time should not be empty' });
      }
     
      const formattedDate = moment(date).format('YYYY-MM-DD');

      const appointmentDateTime = moment(`${formattedDate} ${time}`, 'YYYY-MM-DD h:mm A');

    
      const now = moment();
    
  
      if (!appointmentDateTime.isBetween(moment(`${formattedDate} 08:00 AM`, 'YYYY-MM-DD h:mm A'), moment(`${formattedDate} 06:00 PM`, 'YYYY-MM-DD h:mm A'))) {
        return res.status(400).json({ error: 'Appointments must be scheduled between 8 AM and 6 PM.' });
  
      }
      const lunchStart = moment(`${formattedDate} 12:00 PM`, 'YYYY-MM-DD h:mm A');
      const lunchEnd = moment(`${formattedDate} 02:00 PM`, 'YYYY-MM-DD h:mm A');
      if (appointmentDateTime.isSameOrAfter(lunchStart) && appointmentDateTime.isSameOrBefore(lunchEnd)) {
        return res.status(400).json({ error: 'Time falls within lunch break (12 PM - 2 PM).' });
      }
    
      if (appointmentDateTime.minute() !== 0) {
        return res.status(400).json({ error: 'Appointments must be scheduled at full hour intervals.' });

      }
    
      if (appointmentDateTime.isSame(now, 'day') && appointmentDateTime.isBefore(now.add(2, 'hours'))) {
        return res.status(400).json({ error: 'If the appointment is for today, it must be at least 2 hours from now.' });
  
      }
    
      const existingAppointment = await Appointment.findOne({
        date: formattedDate,
        time: time,
      });
      if (existingAppointment) {
        return res.status(400).json({ error: 'There is already an appointment scheduled for this time.' });
  
      }
      const newAppointment = new Appointment({
        title,
        date,
        time,
      });
    
      await newAppointment.save();
      return res.status(200).json({ message: "Appointment created successfully",appointment: newAppointment });
  

    }catch(err){
      console.error('Error creating Appointement:', err);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later.' });
    }
  };

  export const updateApointements = async (req, res) => {
    const { id } = req.params; 
    const { title, date, time } = req.body;
  
  
    try {
      if (!isValidObjectId(id)) {
        return res.status(400).json({ status: 'failure', error: 'Appointment not found.' });
      }
      const appointment = await Appointment.findById(id); 
     
      if (!appointment) {
        return res.status(404).json({ status: 'failure', error: 'Appointment not found.' });
      }

      if (!title || !date || !time) {
        return res.status(400).json({ status: 'failure', error: 'All fields are required' });
      }

      
  
      const appointmentDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD h:mm A');
      const now = moment();
  
      if (!appointmentDateTime.isBetween(moment(`${date} 08:00 AM`, 'YYYY-MM-DD h:mm A'), moment(`${date} 06:00 PM`, 'YYYY-MM-DD h:mm A'))) {
        return res.status(400).json({ error: 'Appointments must be scheduled between 8 AM and 6 PM.' });
      }
  
      const lunchStart = moment(`${date} 12:00 PM`, 'YYYY-MM-DD h:mm A');
      const lunchEnd = moment(`${date} 02:00 PM`, 'YYYY-MM-DD h:mm A');
      if (appointmentDateTime.isBetween(lunchStart, lunchEnd)) {
        return res.status(400).json({ error: 'Appointments cannot be scheduled between 12 PM and 2 PM due to lunch break.' });
      }
  
      if (appointmentDateTime.minute() !== 0) {
        return res.status(400).json({ error: 'Appointments must be scheduled at full hour intervals.' });
      }
  
      if (appointmentDateTime.isSame(now, 'day') && appointmentDateTime.isBefore(now.add(2, 'hours'))) {
        return res.status(400).json({ error: 'If the appointment is for today, it must be at least 2 hours from now.' });
      }
  
      const existingAppointment = await Appointment.findOne({
        date: date,
        time: time,
        _id: { $ne: id }, 
      });
  
      if (existingAppointment) {
        return res.status(400).json({ error: 'There is already an appointment scheduled for this time.' });
      }
  
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { title, date, time },
        { new: true }
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ error: 'Appointment not found.' });
      }
  
      return res.status(200).json({
        message: 'Appointment updated successfully.',
        appointment: updatedAppointment,
      });
  
    } catch (err) {
      console.error('Error updating Appointment:', err);
      return res
        .status(500)
        .json({ error: 'Server error. Please try again later.' });
    }
  };

export const deleteApointements = async(req, res)=>{
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }

}