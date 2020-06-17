import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@material-ui/core'

const getAppointmentData = (appointment) => {
  return <div className="card-container">
    <br />
    <Card style={{ width: '50vw' }} variant="outlined">
      <CardContent>
        <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
          Appointment Information:
        </Typography>
        <Typography variant="h5" component="h4">
          Nurse: {appointment.nurse}
        </Typography>
        <Typography variant="h5" component="h4">
          Patient: {appointment.patient}
        </Typography>
        <br />
        <Typography variant="h6" component="h4">
          Address: {appointment.address}
        </Typography><br />

        <Grid container>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
              Appointment Time: {getAppointmentTime(appointment.start_time)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
              Length: {appointment.length} minutes
            </Typography>
          </Grid>
        </Grid>
        <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
          Reason for Visit: {appointment.reason}
        </Typography>
        <br />
        {mapNotes(appointment.notes).length > 0 && <React.Fragment>
          <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
            Notes:
          </Typography>
          <ul style={{ margin: 0, fontSize: 14, color: "#767676" }}>{mapNotes(appointment.notes)}</ul>
          <br />
        </React.Fragment>}
        <Typography variant="h6" component="h6">
          Status: {appointment.completed ? 'Complete' : 'Incomplete'}
        </Typography><br />
        {getMessageButtons(appointment.userType, appointment.nurseId, appointment.patientId, appointment.getMessages)}
        <br /><br />
        {getEditDelButtons(appointment, appointment.setFormApptData, appointment.updateRenderedItem, appointment.deleteAppointment)}
      </CardContent>
    </Card>
    <br />
  </div >
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

const getMessageButtons = (userType, nurseId, patientId, getMessages) => {
  switch (userType) {
    case "patient":
      return <Button variant="contained" onClick={() => getMessages(nurseId)}>Message Nurse</Button>;
    case "nurse":
      return <Button variant="contained" onClick={() => getMessages(patientId)}>Message Patient</Button>;
    case "dispatcher":
      return <React.Fragment>
        <span>
          <Button variant="contained" onClick={() => getMessages(patientId)}>Message Patient</Button> <Button variant="contained" onClick={() => getMessages(nurseId)}>Message Nurse</Button>
        </span>
      </React.Fragment>
    default:
      return;
  }
}

const handleEditClick = (appointment, setFormApptData, updateRenderedItem) => {
  // set state with appt data
  setFormApptData(appointment)
  // render filled in appt form
  updateRenderedItem('apptForm')
}

const getEditDelButtons = (appointment, setFormApptData, updateRenderedItem, deleteAppointment) => {
  if (appointment.userType !== 'patient') {
    return (
      <span>
        <Button variant="contained" onClick={() => handleEditClick(appointment, setFormApptData, updateRenderedItem)}>Edit Appt</Button> <Button variant="contained" onClick={() => deleteAppointment(appointment.id)}>Delete Appt</Button>
      </span>
    )
  }
}

const Appointment = props => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center">
      {getAppointmentData(props)}
    </Grid>
  )
}

export default Appointment;