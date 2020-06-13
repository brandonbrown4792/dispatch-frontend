import React from 'react';
import { Grid, Paper, List } from '@material-ui/core';
import ReactMapGL from 'react-map-gl';
import './App.css';
import MenuAppBar from './Components/MenuAppBar'
import UtilitiesContainer from './Components/UtilitiesContainer'

class App extends React.Component {
  state = {
    viewport: {
      latitude: 45.4211,
      longitude: -75.6903,
      height: '70vh',
      width: '82vw',
      zoom: 10
    },
    nurses: [],
    appointments: [],
    patients: [],
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

  render() {
    return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <div className='header'>
            <MenuAppBar />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='nav-left'>
            <Paper style={{ maxHeight: '90vh', overflow: 'auto' }}>
              <List>
                <UtilitiesContainer filterTypes={this.filterTypes} />
              </List>
            </Paper>
          </div>
        </Grid>
        <Grid container item xs={10} className='main-container'>
          <Grid item xs={12}>
            <div className='main-display'>
              {/* figure out how to map over appts and nurses to put them on the map */}
              <ReactMapGL 
                {...this.state.viewport} 
                mapboxApiAccessToken={this.mapboxToken}
                onViewportChange={this.handleViewportChange} // allows to drag map inside grid
                mapStyle='mapbox://styles/rpdecks/ckbczsigy1q5m1ilf2qhgsphi'
              >

              </ReactMapGL>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='detail-display'>
              <Paper style={{ maxHeight: '20vh', overflow: 'auto' }}>
                <List>
                  <h3>Appointment Details</h3>
                </List>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )};
}

export default App;
