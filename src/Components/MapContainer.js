import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import '../App.css';

const mapMarkers = (userData, setPopupState, renderPopup, popupState, setSelectedAppointments) => {
  const nurses = mapNurses(userData.nurses, setPopupState, renderPopup, popupState, setSelectedAppointments) || [];
  const patients = mapPatients(userData.patients, setPopupState, renderPopup, popupState, setSelectedAppointments) || [];
  return nurses.concat(patients) || null;
}

// Original stuff
// const handleClick = (user, setSelectedAppointments, updateRenderedItem) => {
//   updateRenderedItem('apptDetails')
//   setSelectedAppointments(user)
// }

const handleClick = (user, setPopupState, renderPopup, popupState, setSelectedAppointments) => {
  setPopupState(user)
  setSelectedAppointments(user.id)
  // renderPopup(popupState)
}

const mapNurses = (nurses, setPopupState, renderPopup, popupState, setSelectedAppointments) => {
  if (nurses) {
    return nurses.map(nurse => {
      return <Marker
        key={nurse.address}
        latitude={nurse.latitude}
        longitude={nurse.longitude}
      >
        {/* <button className='marker-btn' onClick={() => handleClick(nurse.id, setSelectedAppointments, updateRenderedItem)}> */}
        <button className='marker-btn' onClick={() => handleClick(nurse, setPopupState, renderPopup, popupState, setSelectedAppointments)}>
          <img src='nurse-pin.png' alt='nurse-pin' />
        </button>
      </Marker>
    })
  }
}

const mapPatients = (patients, setPopupState, renderPopup, popupState, setSelectedAppointments) => {
  if (patients) {
    return patients.map(patient => {
      return <Marker
        key={patient.address}
        latitude={patient.latitude}
        longitude={patient.longitude}
      >
        {/* <button className='marker-btn' onClick={() => handleClick(patient.id, setSelectedAppointments, updateRenderedItem)}> */}
        <button className='marker-btn' onClick={() => handleClick(patient, setPopupState, renderPopup, popupState, setSelectedAppointments)}>
          <img src='patient-pin.png' alt='patient-pin' />
        </button>
      </Marker>
    })
  }
}

const renderPopup = (stateObj, setPopupState) => {

  // handleClick =() => {

  // }

  return (
    stateObj && (
      <Popup
        classname="popup"
        tipSize={5}
        anchor="top"
        longitude={stateObj.longitude}
        latitude={stateObj.latitude}
        closeOnClick={false}
        onClose={() => setPopupState(null)}
      >
        { stateObj.name }
        { stateObj.address }
        <button >
          Edit
        </button >
        <button >
          Delete
        </button >
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
    {props.userData.user_type !== 'patient' && mapMarkers(props.userData, props.setPopupState, props.renderPopup, props.popupState, props.setSelectedAppointments)}
    {renderPopup(props.popupState, props.setPopupState)}
  </ReactMapGL>
}

export default MapContainer;