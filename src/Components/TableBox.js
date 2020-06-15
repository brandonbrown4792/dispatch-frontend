import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const mapTable = userData => {
    const nurses = nurseTable(userData.nurses) || [];
    const patients = patientTable(userData.patients) || [];
    debugger
    return <TableContainer>{nurses.concat(patients) || null}</TableContainer>;
}

const createTableHeaders = (personObj) => {
    let headerAry = Object.keys(personObj)
    return (
        <TableRow>
            {headerAry.map(header => <TableCell>header</TableCell>)}
        </TableRow>
    )
}

const nurseTable = nurses => {
    if (nurses.length > 0) {
        return <Table size="small" aria-label="a dense table">
            <TableHead>
                {createTableHeaders(nurses[0])}
            </TableHead>
            <TableBody>
                {nurses.map((nurse) => (
                    <TableRow key={nurse.name}>
                        <TableCell component="th" scope="row">
                            {nurse.name}
                        </TableCell>
                        <TableCell align="right">{nurse.email}</TableCell>
                        <TableCell align="right">{nurse.address}</TableCell>
                    </TableRow>
                ))}
            </TableBody>I
        </Table>
    }
}

const patientTable = patients => {
    if (patients.length > 0) {
        return <Table size="small" aria-label="a dense table">
            <TableHead>
                {createTableHeaders(patients[0])}
            </TableHead>
            <TableBody>
                {patients.map((patient) => (
                    <TableRow key={patient.name}>
                        <TableCell component="th" scope="row">
                            {patient.name}
                        </TableCell>
                        <TableCell align="right">{patient.email}</TableCell>
                        <TableCell align="right">{patient.address}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    }
}

const TableBox =(props)=> {
    // debugger;
    return props.userData.user_type !== 'patient' && mapTable(props.userData)
}

export default TableBox