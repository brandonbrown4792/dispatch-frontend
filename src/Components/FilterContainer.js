import React from 'react'
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

function FilterContainer(props) {
    return (
        <div>
            <h3>Filters:</h3>
            <label>Nurse</label><br />
            <select onChange={e => updateFilteredNurse(e, props.filterParams, props.updateFilteredUserData)}>
                <option value=''>All Nurses</option>
                {mapNursesOptions(props.userData.nurses)}
            </select>
            <label>Patient</label><br />
            <select onChange={e => updateFilteredPatient(e, props.filterParams, props.updateFilteredUserData)}>
                <option value=''>All Patients</option>
                {mapPatientsOptions(props.userData.patients)}
            </select>
            <label>Appointment Reason</label><br />
            <select onChange={e => updateFilteredReason(e, props.filterParams, props.updateFilteredUserData)}>
                <option value=''>All Reasons</option>
                {mapReasonOptions(props.userData.appointments)}
            </select>
        </div>
    )
}

export default FilterContainer 