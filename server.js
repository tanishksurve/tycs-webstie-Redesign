const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, contact, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rohitganji173@gmail.com',
            pass: 'sigl wrcn tyvo arcu'
        }
    });

    const mailOptions = {
        from: email,
        to: 'rohitganjiapple2@gmail.com',
        subject: 'Query',
        text: `Name: ${name}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Query could not be sent');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Query has been issued succesfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
