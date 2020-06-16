import React from 'react';

const getAppointmentData = appointment => {
  return <React.Fragment>
    <h3>Nurse: {appointment.nurse}</h3>
    <h4>Appointment Time: {getAppointmentTime(appointment.start_time)}</h4>
    <p>Length: {appointment.length}</p>
    <p>Address: {appointment.address}</p>
    <p>Reason: {appointment.reason}</p>
    <span>Notes</span>
    <ul>
      {mapNotes(appointment.notes)}
    </ul>
  </React.Fragment>
}

const getAppointmentTime = dateInput => {
  const dateObj = new Date(dateInput);
  const date = dateObj.toDateString();
  const hour = (dateObj.getHours() % 12) || 12;
  const minute = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  const meridiem = dateObj.getHours() <= 12 ? 'am' : 'pm'

  return `${date} at ${hour}:${minute}${meridiem}`
}

const mapNotes = notes => {
  return notes.map(note => <li key={note.content}>{note.content}</li>)
}

const Appointment = props => {
  return (
    <React.Fragment>
      {getAppointmentData(props)}
    </React.Fragment>
  )
}

export default Appointment;