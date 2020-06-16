import React from 'react';
import Appointment from './Appointment';

const mapAppointments = (appointments, userType, getMessages) => {
  return appointments.map((appointment, i) => <Appointment
    key={i}
    address={appointment.address}
    completed={appointment.completed}
    getMessages={getMessages}
    length={appointment.length}
    notes={appointment.notes}
    nurse={appointment.nurse.name}
    nurseId={appointment.nurse.id}
    patient={appointment.patient.name}
    patientId={appointment.patient.id}
    reason={appointment.reason}
    start_time={appointment.start_time}
    userType={userType}
  />)
}

const AppointmentDetailsContainer = props => {
  return (
    <div className='appointment-details-container'>
      {mapAppointments(props.appointments, props.userType, props.getMessages)}
    </div>
  )
}

export default AppointmentDetailsContainer;