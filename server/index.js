const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const validator = require('validator');


mongoose.connect('mongodb+srv://madhav_14:madhav@crm.wqiio.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


    const schema = mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        company: { type: String, required: true },
        jobTitle: { type: String, required: true },
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    

const Contact = mongoose.model('contact', schema);

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/contacts', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, company, jobTitle } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        if (!validator.isMobilePhone(phone, 'any') || phone.length !== 10) {
            return res.status(400).json({ message: 'Phone number must be exactly 10 digits.' });
        }

        if (!firstName || !lastName || !email || !phone || !company || !jobTitle) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingContact = await Contact.findOne({ $or: [{ email }, { phone }] });
        if (existingContact) {
            return res.status(400).json({ message: 'A contact with this email or phone number already exists.' });
        }

        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: 'Contact added successfully!', contact: newContact });
    } catch (err) {
        console.error('Error in POST /contacts:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


app.put('/contacts/:id', async (req, res) => {
    try {
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }
        if (!validator.isMobilePhone(req.body.phone, 'any')) {
            return res.status(400).json({ error: 'Invalid phone number format.' });
        }
        
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/contacts/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});