import React from 'react';
import { Grid, Paper, List } from '@material-ui/core';
import ReactMapGL from 'react-map-gl';
import './App.css';
import MenuAppBar from './Components/MenuAppBar'
import UtilitiesContainer from './Components/UtilitiesContainer'
import AppointmentDetails from './Components/AppointmentDetails'
import AppointmentContainer from './Components/AppointmentContainer';
import LoginForm from './Components/LoginForm'

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
    renderedItem: 'map',
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

  // componentDidMount(){
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
  // }

  whatToRender() {
    const renderedItem = this.state.renderedItem;

    if (renderedItem === 'map') {
      return <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={this.mapboxToken}
        mapStyle='mapbox://styles/rpdecks/ckbczsigy1q5m1ilf2qhgsphi'
        onViewportChange={this.handleViewportChange} // allows to drag map inside grid
      >
      </ReactMapGL>
    } else if (renderedItem === 'table') {
      return <AppointmentContainer />
    } else if (renderedItem === 'login') {
      return <LoginForm />
    }
  }

  updateRenderedItem = item => this.setState({ renderedItem: item })

  render() {
    return (
      <div>
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
        </Grid>
      </div>
    )
  };
}

export default App;
