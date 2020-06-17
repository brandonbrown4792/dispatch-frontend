import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import '../App.css';

const mapMarkers = (userData, setSelectedAppointments, setPopupState) => {
  const nurses = mapNurses(userData.nurses, setSelectedAppointments, setPopupState) || [];
  const patients = mapPatients(userData.patients, setSelectedAppointments, setPopupState) || [];
  return nurses.concat(patients) || null;
}

const handleClick = (user, setSelectedAppointments, setPopupState) => {
  setSelectedAppointments(user.id)
  setPopupState(user)
}

const mapNurses = (nurses, setSelectedAppointments, setPopupState) => {
  if (nurses) {
    return nurses.map(nurse => {
      return <Marker
        key={nurse.address}
        latitude={nurse.latitude}
        longitude={nurse.longitude}
      >
        <button className='marker-btn' onClick={() => handleClick(nurse, setSelectedAppointments, setPopupState)}>
          <img src='nurse-pin.png' alt='nurse-pin' />
        </button>
      </Marker>
    })
  }
}

const mapPatients = (patients, setSelectedAppointments, setPopupState) => {
  if (patients) {
    return patients.map(patient => {
      return <Marker
        key={patient.address}
        latitude={patient.latitude}
        longitude={patient.longitude}
      >
        <button className='marker-btn' onClick={() => handleClick(patient, setSelectedAppointments, setPopupState)}>
          <img src='patient-pin.png' alt='patient-pin' />
        </button>
      </Marker>
    })
  }
}

const renderPopup = (stateObj, setPopupState, updateRenderedItem) => {

  return (
    stateObj && (
      <Popup
        className="popup"
        tipSize={5}
        anchor="top"
        longitude={stateObj.longitude}
        latitude={stateObj.latitude}
        closeOnClick={false}
        onClose={() => setPopupState(null)}
      >
        <div>
          <b>{ stateObj.name }</b><br />
          { stateObj.address }<br />
          <button onClick={() => {
            updateRenderedItem('apptDetails')
            setPopupState(null)
          }}>
            Appt Details
          </button >
        </div>
      </Popup>
    )
  );
}

const MapContainer = props => {
  return <ReactMapGL
    {...props.viewport}
    mapboxApiAccessToken={props.mapboxApiAccessToken}
    mapStyle='mapbox://styles/rpdecks/ckbczsigy1q5m1ilf2qhgsphi'
    onViewportChange={props.handleViewportChange} // allows to drag map inside grid
  >
    {props.userData.user_type !== 'patient' && mapMarkers(props.userData, props.setSelectedAppointments, props.setPopupState)}
    {renderPopup(props.popupState, props.setPopupState, props.updateRenderedItem)}
  </ReactMapGL>
}

export default MapContainer;