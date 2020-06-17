import React from 'react';
import Appointment from './Appointment';

const mapAppointments = (appointments, userType, getMessages, setFormApptData, updateRenderedItem) => {
  if (appointments.length > 0) {
    return appointments.map((appointment, i) => <Appointment
      key={i}
      id={appointment.id}
      address={appointment.address}
      completed={appointment.completed}
      getMessages={getMessages}
      length={appointment.length}
      notes={appointment.notes}
      patient={appointment.patient.name}
      patientId={appointment.patient.id}
      nurse={appointment.nurse.name}
      nurseId={appointment.nurse.id}
      reason={appointment.reason}
      start_time={appointment.start_time}
      userType={userType}
      setFormApptData={setFormApptData}
      updateRenderedItem={updateRenderedItem}
    />)
  }
}

const AppointmentDetailsContainer = props => {
  return (
    <div className='appointment-details-container'>
      {mapAppointments(props.appointments, props.userType, props.getMessages, props.setFormApptData, props.updateRenderedItem)}
      {mapAppointments(props.appointments, props.userType, props.getMessages)}
    </div>
  )
}

export default AppointmentDetailsContainer;