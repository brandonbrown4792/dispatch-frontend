import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const createTableHeaders = () => {
    return (
        <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
        </TableRow>
    )
}

const nurseTable = nurses => {
    if (nurses.length > 0) {
        return (
            <>
                <h3>Nurse Information:</h3>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        {createTableHeaders(nurses[0])}
                    </TableHead>
                    <TableBody>
                        {nurses.map((nurse) => (
                            <TableRow key={nurse.id}>
                                <TableCell component="th" scope="row">{nurse.id}</TableCell>
                                <TableCell >{nurse.name}</TableCell>
                                <TableCell >{nurse.email}</TableCell>
                                <TableCell >{nurse.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>I
                </Table>
           </>
        )
    }
}

const patientTable = patients => {
    if (patients.length > 0) {
        return (
            <>
                <h3>Patient Information:</h3>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        {createTableHeaders(patients[0])}
                    </TableHead>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell component="th" scope="row">{patient.id}</TableCell>
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
        <Paper style={{ maxHeight: '70vh', overflow: 'auto' }}>
            <TableContainer>
                {nurseTable(props.userData.nurses)}
                {patientTable(props.userData.patients)}
            </TableContainer>
        </Paper>
    )
}

export default TableBox