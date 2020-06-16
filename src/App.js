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
    renderedItem: 'map'
  }
  // should we move this into a .env file?
  mapboxToken = 'pk.eyJ1IjoicnBkZWNrcyIsImEiOiJja2JiOTVrY20wMjYxMm5tcWN6Zmtkdno0In0.F_U-T3nJUgcaJGb6dO5ceQ'

  // Here we can maintain filter labels and pass them as props. We may want a function that pushes all nurse names into this arry as well as appt types automatically. These filterTypes should be passed as props for mapping in FilterContainer.
  filterTypes = ['Appt type 1', 'Appt type 2', 'Filter by Date', 'Completed appts',
    'Incomplete appts', 'Show nurses only', 'Show patients only',
    'Filter appts by nurse1', 'Filter appts by nurse2']

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
      .then(userData => this.setState({ userData: userData }))
  }

  whatToRender = () => {
    const renderedItem = this.state.renderedItem;

    if (renderedItem === 'map') {
      return <MapContainer
        viewport={this.state.viewport}
        mapboxApiAccessToken={this.mapboxToken}
        handleViewportChange={this.handleViewportChange} // allows to drag map inside grid
        userData={this.state.userData}
        setSelectedAppointments={this.setSelectedAppointments}
      />

    } else if (renderedItem === 'table') {
      return <TableBox userData={this.state.userData} setSelectedAppointments={this.setSelectedAppointments} />
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
        patient_id: appt.patient_id,
        nurse_id: appt.nurse_id,
        address: appt.address,
        start_time: appt.start_time,
        length: appt.length,
        reason: appt.reason,
        notes: appt.notes
      })
    }

    fetch('http://localhost:3000/api/v1/appointments', fetchObj)
      .then(res => res.json())
      .then(appt => console.log(appt))
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
                    filterTypes={this.filterTypes}
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
