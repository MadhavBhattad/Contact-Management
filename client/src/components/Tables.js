import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';

const Tables = ({contacts, deleteContact, editContact}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {contacts.map((contact) => (
                        <TableRow key={contact._id}>
                        <TableCell>{contact.firstName}</TableCell>
                        <TableCell>{contact.lastName}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>{contact.jobTitle}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => editContact(contact)}>
                            <Edit />
                            </IconButton>
                            <IconButton onClick={() => deleteContact(contact._id)}>
                            <Delete />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Tables;