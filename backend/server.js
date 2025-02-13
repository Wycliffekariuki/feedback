require('dotenv').config({ path: '../.env' });
const {pool, query} = require('./db');
console.log(process.env.SMTP_HOST);

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
    const {fullName, phoneNumber, subject, email, feedback} = req.body;
    /*
    console.log('Name:', fullName || "Name not retrived properly");
    console.log('Phone:', phoneNumber || "Phone not retrived properly");
    console.log('Email:', email || "Email not retrived properly");
    console.log('Subject:', subject || "Subject not retrived properly");
    console.log('Body:', feedback || "Body not retrived properly");
    */
   try {
    const mailOptions = {
        from: process.env.SMTP_SENDER,
        to: email,
        subject: subject,
        text: feedback,
    };
    const transporter = transporterCreate();


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        }else {
            console.log('Email sent:', info.response);
        }
    });
    res.status(200).send("Feedback submitted successfully");

    
   } catch (error) {
    res.status(500).send("Something went wrong on our end");
    console.log("Something went wrong with the email", error);
    
   }
    
 
})

const transporterCreate= () => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        return transporter;
        
    } catch (error) {
        throw error;
        
    }

};


const recordFeedback = async (feedbackAll) => {
    
    try {
        const sql = "INSERT INTO Optiven (name, phone, email, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [feedbackAll.fullName, feedbackAll.phoneNumber, feedbackAll.email, feedbackAll.subject, feedbackAll.message];
        const result = await query(sql, values);
        if (result.rows > 0)  {
            console.log("Feedback recorded successfully:", result.rows[0]);
        }else {
            console.log("Feedback insert failed");
        }
    } catch (error) {
        console.error("Error recording feedback:", error);
        throw error;
    }

}


// Email Options












app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})