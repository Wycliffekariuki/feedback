require('dotenv').config();


const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow cookies and credentials
  }));



app.post('/', (req, res) => {
    const {fullName, phoneNumber, email, feedback} = req.body;
    console.log('Name:', fullName || "Name not retrived properly");
    res.status(200).send("Feedback submitted successfully");
})


const trnasporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 456,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Email Options
const mailOptions = {
    from: process.env.SMTP_SENDER,
    to: 'cleofordklumurd@gmail.com',
    subject: 'This is a test subject',
    text: 'This is a test email sent to Zoho Mail uisng Nodemailer.',
};











app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})