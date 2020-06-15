import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl';
import '../App.css';

const mapMarkers = userData => {
  const nurses = mapNurses(userData.nurses) || [];
  const patients = mapPatients(userData.patients) || [];
  return nurses.concat(patients) || null;
}

const mapNurses = nurses => {
  if (nurses) {
    return nurses.map(nurse => {
      return <Marker
        key={nurse.address}
        latitude={nurse.latitude}
        longitude={nurse.longitude}
      >
        <button className='marker-btn'>
          <img src='nurse-pin.png' alt='nurse-pin' />
        </button>
      </Marker>
    })
  }
}

const mapPatients = patients => {
  if (patients) {
    return patients.map(patient => {
      return <Marker
        key={patient.address}
        latitude={patient.latitude}
        longitude={patient.longitude}
      >
        <button className='marker-btn'>
          <img src='patient-pin.png' alt='patient-pin' />
        </button>
      </Marker>
    })
  }
}

const MapContainer = props => {
  return <ReactMapGL
    {...props.viewport}
    mapboxApiAccessToken={props.mapboxApiAccessToken}
    mapStyle='mapbox://styles/rpdecks/ckbczsigy1q5m1ilf2qhgsphi'
    onViewportChange={props.handleViewportChange} // allows to drag map inside grid
  >
    {props.userData.user_type !== 'patient' && mapMarkers(props.userData)}
  </ReactMapGL>
}

export default MapContainer;