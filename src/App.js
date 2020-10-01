import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";

function App() {

  // Appointments in Local Storage
  let initialAppointments = JSON.parse(localStorage.getItem('appointments')) 
  if(!initialAppointments){
    initialAppointments = []
  }
  
  //array appoiments
  const [appointments, saveAppointment] = useState(initialAppointments)

  // Use effect to do some operations when it changes
  useEffect( () => {
    let initialAppointments = JSON.parse(localStorage.getItem('appointments')) 
    
    if( initialAppointments){
      localStorage.setItem('appointments', JSON.stringify(appointments) )
    } else{
      localStorage.setItem('appointments', JSON.stringify([]) )
    }
  }, [appointments])

  // Function that takes new appoiments and add new appoiment
  const createAppointment = appointment => {
    console.log(appointment)
    saveAppointment([
      ...appointments,
      appointment
    ])
  }

  // Function to Delete appointment
  const deleteAppointment = id => {
    const newAppointments = appointments.filter(appointment => appointment.id !== id)
    saveAppointment(newAppointments)
  }

  // Conditional Message to admin or add new appointments
  const titleNewAppointment = appointments.length === 0 ? 'Any appointment' : 'Admin your Appointments'

  return (
    <Fragment>
      <h1>Manage your Appointments</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form
              createAppointment = {createAppointment}
            />
          </div>
          <div className="one-half column">
            <h2>{titleNewAppointment}</h2>
            {appointments.map(appointment => (
              <Appointment
              key = {appointment.id} 
              appointment = {appointment}
              deleteAppointment = {deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
