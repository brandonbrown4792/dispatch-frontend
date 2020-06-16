import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Grid, Paper, List } from '@material-ui/core'
import './App.css'
import MenuAppBar from './Components/MenuAppBar'
import UtilitiesContainer from './Components/UtilitiesContainer'
import MapContainer from './Components/MapContainer'
import AppointmentDetailsContainer from './Components/AppointmentDetailsContainer'
import TableBox from './Components/TableBox'
import LoginForm from './Components/LoginForm'
import AppointmentForm from './Components/AppointmentForm'

class App extends React.Component {
  state = {
    viewport: {
      latitude: 33.8145,
      longitude: -84.3539,
      height: '94vh',
      width: '83vw',
      zoom: 12
    },
    userData: {}, 
    selectedAppointments: [],
    renderedItem: 'map',
    filterParams: {
      nurse: '',
      patient: '',
      appointmentReason: '',
      appointmentStatus: ''
    },
    filteredUserData: {},
    popupState: null,
  }
  // should we move this into a .env file?
  mapboxToken = 'pk.eyJ1IjoicnBkZWNrcyIsImEiOiJja2JiOTVrY20wMjYxMm5tcWN6Zmtkdno0In0.F_U-T3nJUgcaJGb6dO5ceQ'

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  componentDidMount() {
    this.getUserData();
  }

  handleLogin = token => {
    localStorage.setItem('auth_token', token);
    this.getUserData();
  }

  getUserData = () => {
    const auth_token = localStorage.getItem('auth_token');

    if (!auth_token) {
      return;
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': auth_token
      }
    }

    fetch('http://localhost:3000/api/v1/get-info', fetchObj)
      .then(res => res.json())
      .then(userData => this.setState({ userData: userData, filteredUserData: userData }))
  }

  whatToRender = () => {
    const renderedItem = this.state.renderedItem;

    if (renderedItem === 'map') {
      return <MapContainer
        viewport={this.state.viewport}
        mapboxApiAccessToken={this.mapboxToken}
        handleViewportChange={this.handleViewportChange} // allows to drag map inside grid
        userData={this.state.filteredUserData}
        setSelectedAppointments={this.setSelectedAppointments}
        updateRenderedItem={this.updateRenderedItem}
        setPopupState={this.setPopupState}
        popupState={this.state.popupState}
      />

    } else if (renderedItem === 'table') {
      return <TableBox userData={this.state.filteredUserData} setSelectedAppointments={this.setSelectedAppointments} />
    } else if (renderedItem === 'login') {
      return <LoginForm />
    } else if (renderedItem === 'apptForm') {
      return <AppointmentForm
        userData={this.state.userData}
        updateRenderedItem={this.updateRenderedItem}
        addAppointment={this.addAppointment} 
        selectedAppointments={this.selectedAppointments}/>
    } else if (renderedItem === 'apptDetails') {
      return <AppointmentDetailsContainer 
          appointments={this.state.selectedAppointments} 
          updateRenderedItem={this.updateRenderedItem} />
    }
  }

  updateRenderedItem = item => this.setState({ renderedItem: item })

  setPopupState = (user) => {
    this.setState({ popupState: user }, () => console.log(this.state.popupState))
  }

  setSelectedAppointments = id => {
    this.setState({
      selectedAppointments: this.state.userData.appointments.filter(appointment => appointment.patient_id === id || appointment.nurse_id === id)
    })
  }

  addAppointment = (appt) => {
    const auth_token = localStorage.getItem('auth_token');

    if (!auth_token) {
      return;
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': auth_token
      },
      body: JSON.stringify({
        patient_id: appt.patient_id,
        nurse_id: appt.nurse_id,
        start_time: appt.start_time,
        length: appt.length,
        reason: appt.reason,
        notes: appt.notes
      })
    }

    fetch('http://localhost:3000/api/v1/appointments', fetchObj)
      .then(res => res.json())
      .then(appt => this.setState({
        userData: { ...this.state.userData, appointments: [...this.state.userData.appointments, appt] }
      }))
  }

  updateFilteredUserData = filterParams => {
    let filteredUserData = { ...this.state.userData };

    if (filterParams.nurse) {
      filteredUserData.nurses = filteredUserData.nurses.filter(nurse => nurse.id === parseInt(filterParams.nurse))
    }

    if (filterParams.patient) {
      filteredUserData.patients = filteredUserData.patients.filter(patient => patient.id === parseInt(filterParams.patient))
    }

    if (filterParams.appointmentReason) {
      const appointments = filteredUserData.appointments.filter(appointment => appointment.reason === filterParams.appointmentReason)
      const patient_ids = appointments.map(appointment => appointment.patient_id).filter(this.onlyUnique)
      const nurse_ids = appointments.map(appointment => appointment.nurse_id).filter(this.onlyUnique)
      filteredUserData.patients = filteredUserData.patients.filter(patient => patient_ids.includes(patient.id))
      filteredUserData.nurses = filteredUserData.nurses.filter(nurse => nurse_ids.includes(nurse.id))
    }

    if (filterParams.appointmentStatus) {
      const status = filterParams.appointmentStatus === 'complete' ? true : false;
      const appointments = filteredUserData.appointments.filter(appointment => appointment.completed === status)
      const patient_ids = appointments.map(appointment => appointment.patient_id).filter(this.onlyUnique)
      const nurse_ids = appointments.map(appointment => appointment.nurse_id).filter(this.onlyUnique)
      filteredUserData.patients = filteredUserData.patients.filter(patient => patient_ids.includes(patient.id))
      filteredUserData.nurses = filteredUserData.nurses.filter(nurse => nurse_ids.includes(nurse.id))
    }

    this.setState({ filteredUserData: filteredUserData, filterParams: filterParams });
  }

  onlyUnique = (value, index, self) => self.indexOf(value) === index

  render() {
    return (
      <BrowserRouter>
        <MenuAppBar updateRenderedItem={this.updateRenderedItem} />
        <Grid container >
          {/* <Grid item xs={12} className='header'> */}
          {/* </Grid> */}
          <Grid item xs={2}>
            <div className='nav-left'>
              <Paper style={{ maxHeight: '100vh', overflow: 'auto' }}>
                <List>
                  <UtilitiesContainer
                    filterParams={this.state.filterParams}
                    updateFilteredUserData={this.updateFilteredUserData}
                    userData={this.state.userData}
                    updateRenderedItem={this.updateRenderedItem}
                    renderedItem={this.state.renderedItem}
                  />
                </List>
              </Paper>
            </div>
          </Grid>
          <Switch>
            <Route exact path='/'>
              <Grid container item xs={10} className='main-display'>
                  <Grid item xs={12}>
                    {this.whatToRender()}
                  </Grid>
              </Grid>
            </Route>
            <Route exact path='/login'>
              <LoginForm handleLogin={this.handleLogin} />
            </Route>
          </Switch>
        </Grid>
      </BrowserRouter>
    )
  };
}

export default App;
