import React from 'react';
import Appointment from './Appointment';

const mapAppointments = (appointments, userType, setFormApptData, updateRenderedItem) => {
  return appointments.map((appointment, i) => <Appointment
    key={i}
    id={appointment.id}
    address={appointment.address}
    completed={appointment.completed}
    length={appointment.length}
    notes={appointment.notes}
    nurse={appointment.nurse.name}
    patient={appointment.patient.name}
    reason={appointment.reason}
    start_time={appointment.start_time}
    userType={userType}
    setFormApptData={setFormApptData}
    updateRenderedItem={updateRenderedItem}
  />)
}

const AppointmentDetailsContainer = props => {
  return (
    <div className='appointment-details-container'>
      {mapAppointments(props.appointments, props.userType, props.setFormApptData, props.updateRenderedItem)}
    </div>
  )
}

export default AppointmentDetailsContainer;