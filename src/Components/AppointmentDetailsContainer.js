import React from 'react';
import Appointment from './Appointment';
import { Button } from '@material-ui/core'

const mapAppointments = (appointments, userType, getMessages, setFormApptData, updateRenderedItem, deleteAppointment) => {
  if (appointments.length > 0) {
    debugger;
    return appointments.map((appointment, i) => {
      return <Appointment
        key={i}
        id={appointment.id}
        address={appointment.address}
        completed={appointment.completed}
        getMessages={getMessages}
        length={appointment.length}
        notes={appointment.notes}
        patient={appointment.patient.name}
        patient_id={appointment.patient.id}
        nurse={appointment.nurse.name}
        nurse_id={appointment.nurse.id}
        reason={appointment.reason}
        start_time={appointment.start_time}
        userType={userType}
        setFormApptData={setFormApptData}
        updateRenderedItem={updateRenderedItem}
        deleteAppointment={deleteAppointment}
      />
    })
  }
}

const AppointmentDetailsContainer = props => {
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