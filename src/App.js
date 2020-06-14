import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid, Paper, List } from '@material-ui/core';
import './App.css';
import MenuAppBar from './Components/MenuAppBar'
import UtilitiesContainer from './Components/UtilitiesContainer'
import MapContainer from './Components/MapContainer'
import AppointmentDetails from './Components/AppointmentDetails'
import AppointmentContainer from './Components/AppointmentContainer';
import LoginForm from './Components/LoginForm'

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

    //   Promise.all([
    //     fetch('http://localhost:3000/patients'),
    //     fetch('http://localhost:3000/appointments'),
    //     fetch('http://localhost:3000/nurses'),
    //   ])
    //   .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
    //   .then(([data1, data2, data3]) => this.setState({
    //       patients: data1, 
    //       appointments: data2,
    //       nurses: data3,
    //   }));
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
      />

    } else if (renderedItem === 'table') {
      return <AppointmentContainer />
    } else if (renderedItem === 'login') {
      return <LoginForm />
    }
  }

  updateRenderedItem = item => this.setState({ renderedItem: item })

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
                      <List>
                        <h3>Appointment Details</h3>
                        <AppointmentDetails />
                      </List>
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
