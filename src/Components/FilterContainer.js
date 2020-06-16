import React from 'react'
import { TextField } from '@material-ui/core'
// import Filter from './Filter'

const updateFilteredNurse = (e, filterParams, updateFilteredUserData) => {
    updateFilteredUserData({ ...filterParams, nurse: e.target.value })
}

const updateFilteredPatient = (e, filterParams, updateFilteredUserData) => {
    updateFilteredUserData({ ...filterParams, patient: e.target.value })
}

const updateFilteredReason = (e, filterParams, updateFilteredUserData) => {
    updateFilteredUserData({ ...filterParams, appointmentReason: e.target.value })
}

const updateFilteredStatus = (e, filterParams, updateFilteredUserData) => {
    updateFilteredUserData({ ...filterParams, appointmentStatus: e.target.value })
}

const updateFilteredFromDate = (e, filterParams, updateFilteredUserData) => {
    updateFilteredUserData({ ...filterParams, date: { ...filterParams.date, from: e.target.value } })
}

const updateFilteredToDate = (e, filterParams, updateFilteredUserData) => {
    updateFilteredUserData({ ...filterParams, date: { ...filterParams.date, to: e.target.value } })
}

const mapNursesOptions = nurses => {
    if (nurses) {
        return nurses.map(nurse => <option key={nurse.id} value={nurse.id}>{nurse.name}</option>)
    }
}

const mapPatientsOptions = patients => {
    if (patients) {
        return patients.map(patient => <option key={patient.id} value={patient.id}>{patient.name}</option>)
    }
}

const mapReasonOptions = appointments => {
    if (appointments) {
        const uniqueReasons = appointments.map(appointment => appointment.reason).filter(onlyUnique)
        return uniqueReasons.map(reason => <option key={reason} value={reason}>{reason}</option>)
    }
}

const onlyUnique = (value, index, self) => self.indexOf(value) === index

const dateField = (label, method, filterParams, updateFilteredUserData) => {
    return <TextField
        key={label}
        id="datetime-local"
        label={label}
        name="start_time"
        type="date"
        onChange={e => method(e, filterParams, updateFilteredUserData)}
        InputLabelProps={{
            shrink: true,
        }}
    />
}

function FilterContainer(props) {
    return (
        <div>
            <h3>Filters:</h3>
            <label>Nurse</label><br />
            <select onChange={e => updateFilteredNurse(e, props.filterParams, props.updateFilteredUserData)}>
                <option value=''>All Nurses</option>
                {mapNursesOptions(props.userData.nurses)}
            </select><br /><br />
            <label>Patient</label><br />
            <select onChange={e => updateFilteredPatient(e, props.filterParams, props.updateFilteredUserData)}>
                <option value=''>All Patients</option>
                {mapPatientsOptions(props.userData.patients)}
            </select><br /><br />
            <label>Appointment Reason</label><br />
            <select onChange={e => updateFilteredReason(e, props.filterParams, props.updateFilteredUserData)}>
                <option value=''>All Reasons</option>
                {mapReasonOptions(props.userData.appointments)}
            </select><br /><br />
            <label>Appointment Status</label><br />
            <select onChange={e => updateFilteredStatus(e, props.filterParams, props.updateFilteredUserData)}>
                <option value=''>All Statuses</option>
                <option value='complete'>Complete</option>
                <option value='incomplete'>Incomplete</option>
            </select><br /><br />
            <label>Date</label><br />
            {dateField('From', updateFilteredFromDate, props.filterParams, props.updateFilteredUserData)}
            {dateField('To', updateFilteredToDate, props.filterParams, props.updateFilteredUserData)}<br /><br />
        </div>
    )
}

export default FilterContainer 