import React from 'react';
import Appointment from './Appointment';

const mapAppointments = appointments => {
  return appointments.map((appointment, i) => <Appointment
    key={i}
    address={appointment.address}
    length={appointment.length}
    notes={appointment.notes}
    nurse={appointment.nurse.name}
    reason={appointment.reason}
    start_time={appointment.start_time}
  />)
}

const AppointmentDetailsContainer = props => {
  return (
    <div className='appointment-details-container'>
      {mapAppointments(props.appointments)}
    </div>
  )
}

export default AppointmentDetailsContainer;