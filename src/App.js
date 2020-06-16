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
      height: '70vh',
      width: '82vw',
      zoom: 12
    },
    userData: {},
    selectedAppointments: [],
    renderedItem: 'map',
    filterParams: {
      nurse: ''
    },
    filteredUserData: {}
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
      />

    } else if (renderedItem === 'table') {
      return <TableBox userData={this.state.filteredUserData} setSelectedAppointments={this.setSelectedAppointments} />
    } else if (renderedItem === 'login') {
      return <LoginForm />
    } else if (renderedItem === 'apptForm') {
      return <AppointmentForm
        userData={this.state.userData}
        updateRenderedItem={this.updateRenderedItem}
        addAppointment={this.addAppointment} />
    }
  }

  updateRenderedItem = item => this.setState({ renderedItem: item })

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
        patient_id: apptObj.patient_id,
        nurse_id: apptObj.nurse_id, 
        start_time: apptObj.start_time, 
        length: apptObj.length,
        reason: apptObj.reason, 
        notes: apptObj.notes
      })
    }

    fetch('http://localhost:3000/api/v1/appointments', fetchObj)
      .then(res => res.json())
      .then(appt => this.setState({
        userData: {...this.state.userData, appointments: [...this.state.userData.appointments, appt]}
      }))
  }

  updateFilteredUserData = filterParams => {
    let filteredUserData = { ...this.state.userData };

    if (filterParams.nurse) {
      filteredUserData.nurses = filteredUserData.nurses.filter(nurse => nurse.id === parseInt(filterParams.nurse))
    }
    this.setState({ filteredUserData: filteredUserData, filterParams: filterParams });
  }

  render() {
    return (
      <BrowserRouter>
        <Grid container>
          <Grid item xs={12}>
            <div className='header'>
              <MenuAppBar updateRenderedItem={this.updateRenderedItem} />
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className='nav-left'>
              <Paper style={{ maxHeight: '90vh', overflow: 'auto' }}>
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
              <Grid container item xs={10} className='main-container'>
                <Grid item xs={12}>
                  <div className='main-display'>
                    {this.whatToRender()}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className='detail-display'>
                    <Paper style={{ maxHeight: '20vh', overflow: 'auto' }}>
                      {this.state.selectedAppointments.length > 0 && <AppointmentDetailsContainer appointments={this.state.selectedAppointments} />}
                    </Paper>
                  </div>
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
