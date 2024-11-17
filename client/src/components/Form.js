import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const Form = ({ fetchContacts, currentContact, setCurrentContact }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    if (currentContact) {
      setContact(currentContact);
    }
  }, [currentContact]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.phone || !contact.company || !contact.jobTitle) {
      alert('All fields are required.');
      return;
    }

    if (!contact.email.endsWith('@gmail.com')) {
      alert('Email must be a valid Gmail address (e.g., example@gmail.com).');
      return;
    }

    if (contact.phone.length !== 10 || !/^\d+$/.test(contact.phone)) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    try {
        if (currentContact) {
          await axios.put(`http://localhost:3001/contacts/${currentContact._id}`, contact);
          alert('Contact updated successfully!');
        } else {
          await axios.post('http://localhost:3001/contacts', contact);
          alert('Contact added successfully!');
        }
  
        fetchContacts();
        setContact({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          jobTitle: '',
        });
        setCurrentContact(null);
      } catch (error) {
        console.error('Error saving contact:', error);
        alert('Error saving contact. Please try again.');
      }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {['firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle'].map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              fullWidth
              label={field.replace(/^\w/, (c) => c.toUpperCase())}
              name={field}
              value={contact[field]}
              onChange={handleChange}
              required
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="contained" fullWidth>
            {currentContact ? 'Update Contact' : 'Add Contact'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
