import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import Form from './components/Form';
import Tables from './components/Tables';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      alert('Contact deleted successfully!'); // Display popup after deletion
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error deleting contact. Please try again.'); // Handle error case
    }
  };

  const editContact = (contact) => {
    setCurrentContact(contact);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        Contact List
      </Typography>
      <Form fetchContacts={fetchContacts} currentContact={currentContact} setCurrentContact={setCurrentContact} />
      <Tables contacts={contacts} deleteContact={deleteContact} editContact={editContact} />
    </Container>
  );
};

export default App;
