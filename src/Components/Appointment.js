import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core'

const getAppointmentData = appointment => {
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
        </Typography>
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