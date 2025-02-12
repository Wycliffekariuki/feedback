const express = require('express');
const cors = require('cors');
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


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})