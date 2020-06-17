import React from 'react';
import Appointment from './Appointment';
import { Button } from '@material-ui/core'

const mapAppointments = (appointments, userType, getMessages, setFormApptData, updateRenderedItem, deleteAppointment) => {
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
      deleteAppointment={deleteAppointment}
    />)
  }
}

const AppointmentDetailsContainer = props => {
  debugger;
  return (
    <div className='appointment-details-container'>
      {(props.userType === 'nurse' || props.userType === 'dispatcher') &&
        <Button onClick={() => props.updateRenderedItem('map')}>
          Back to map
      </Button>}
      {mapAppointments(props.appointments, props.userType, props.getMessages, props.setFormApptData, props.updateRenderedItem, props.deleteAppointment)}
    </div>
  )
}

export default AppointmentDetailsContainer;