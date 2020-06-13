import React from 'react'
import Appointment from './Appointment'

function AppointmentContainer(props) {

    return (
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Nurse</th>
                <th scope="col">Appt Date</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Appt Type</th>
                <th scope="col">Link to notes</th>
                </tr>
            </thead>
            <tbody>
                {
                    <Appointment />
                }
            </tbody>
        </table>
    )
}

export default AppointmentContainer