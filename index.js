const functions = require('@google-cloud/functions-framework');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASS,
  },
});

functions.http('sendEmailNotification', async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed only post');
    return;
  }

  const { html_content, heading, emails } = req.body;

  if (!html_content || !heading || !emails) {
    res.status(400).send('Bad Request: Missing fields, required - { "html_content": "the body", "heading": "the header", "emails": ["example1@gmail.com", "example2@gmail.com"]}');
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: emails.join(','), 
    subject: heading,
    html: html_content,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal Server Error');
  }
});
