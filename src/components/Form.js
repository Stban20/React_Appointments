import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types'

const Form = ({ createAppointment }) => {
  //State to create appoiments
  const [appointment, updateAppointment] = useState({
    pet: "",
    owner: "",
    date: "",
    hour: "",
    simptoms: "",
  });

  //Error
  const [error, updateError] = useState(false);

  //function that execute everytime the user write
  const updateState = (e) => {
    updateAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  // Extract value from appoiment
  const { pet, owner, date, hour, simptoms } = appointment;

  // when the user send the form
  const submitAppointment = (e) => {
    e.preventDefault();

    //validate form
    if (
      pet.trim() === "" ||
      owner.trim() === "" ||
      date.trim() === "" ||
      hour.trim() === "" ||
      simptoms.trim() === ""
    ) {
      updateError(true);
      return;
    }

    console.log("Sengind...");

    // Delete previous message
    updateError(false);

    //Asign  key
    appointment.id = uuidv4();

    // Create appoiment
    createAppointment(appointment);

    //Reset form
    updateAppointment({
      pet: "",
      owner: "",
      date: "",
      hour: "",
      simptoms: "",
    });
  };

  return (
    <Fragment>
      <h2>Create Appointment</h2>

      {error ? <p className="alerta-error">All the info is needed</p> : null}

      <form onSubmit={submitAppointment}>
        <label>Pet Name</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Pet Name"
          onChange={updateState}
          value={pet}
        />
        <label>Owner Name</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="Owner Name"
          onChange={updateState}
          value={owner}
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          className="u-full-width"
          onChange={updateState}
          value={date}
        />
        <label>Hour</label>
        <input
          type="time"
          name="hour"
          className="u-full-width"
          onChange={updateState}
          value={hour}
        />
        <label>Simptoms</label>
        <textarea
          className="u-full-width"
          name="simptoms"
          onChange={updateState}
          value={simptoms}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Add Appointment
        </button>
      </form>
    </Fragment>
  );
};

Form.propTypes = {
  createAppointment: PropTypes.func.isRequired  
}

export default Form;
