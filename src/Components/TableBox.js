import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const createTableHeaders = () => {
    return (
        <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
        </TableRow>
    )
}

const nurseTable = (nurses, setSelectedAppointments) => {
    if (nurses && nurses.length > 0) {
        return (
            <React.Fragment>
                <h3>Nurse Information:</h3>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        {createTableHeaders()}
                    </TableHead>
                    <TableBody>
                        {nurses.map((nurse) => (
                            <TableRow key={nurse.id} onClick={() => setSelectedAppointments(nurse.id)}>
                                <TableCell >{nurse.name}</TableCell>
                                <TableCell >{nurse.email}</TableCell>
                                <TableCell >{nurse.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}

const patientTable = (patients, setSelectedAppointments) => {
    if (patients && patients.length > 0) {
        return (
            <>
                <h3>Patient Information:</h3>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        {createTableHeaders()}
                    </TableHead>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id} onClick={() => setSelectedAppointments(patient.id)}>
                                <TableCell >{patient.name}</TableCell>
                                <TableCell >{patient.email}</TableCell>
                                <TableCell >{patient.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        )
    }
}

const TableBox = props => {
    return (
        <TableContainer>
            {nurseTable(props.userData.nurses, props.setSelectedAppointments)}
            <br />
            {patientTable(props.userData.patients, props.setSelectedAppointments)}
        </TableContainer>
    )
}

export default TableBox;