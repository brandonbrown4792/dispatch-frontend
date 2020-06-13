import React, { useState } from 'react';
import { Grid, Paper, List } from '@material-ui/core';
import ReactMapGL from 'react-map-gl';
import './App.css';
import MenuAppBar from './Components/MenuAppBar'
import UtilitiesContainer from './Components/UtilitiesContainer'

function App() {
  const mapboxToken = 'pk.eyJ1IjoicnBkZWNrcyIsImEiOiJja2JiOTVrY20wMjYxMm5tcWN6Zmtkdno0In0.F_U-T3nJUgcaJGb6dO5ceQ' 

  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    height: '70vh',
    width: '82vw',
    zoom: 10
  })

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
                <UtilitiesContainer />
              </List>
            </Paper>
          </div>
        </Grid>
        <Grid container item xs={10} className='main-container'>
          <Grid item xs={12}>
            <div className='main-display'>
              <ReactMapGL 
                {...viewport} 
                mapboxApiAccessToken={mapboxToken}
                onViewportChange={viewport => { setViewport(viewport)}}
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
  );
}

export default App;
