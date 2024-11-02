const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = (email, token) => {
  const verificationLink = `http://localhost:3000/api/auth/verify?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verifica il tuo account",
    text: `Clicca sul link per verificare il tuo account: ${verificationLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Errore nell'invio dell'email:", error);
    } else {
      console.log("Email inviata:", info.response);
    }
  });
};

module.exports = sendVerificationEmail;
