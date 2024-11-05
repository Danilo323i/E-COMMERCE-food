const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = (email, token) => {
  const verificationLink = `http://localhost:3000/api/auth/verify?token=${token}`;
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER, // Assicurati che questa sia configurata nel tuo .env
    subject: 'Verifica il tuo account',
    text: `Clicca sul link per verificare il tuo account: ${verificationLink}`
  };

  sgMail.send(msg).then(() => {
    console.log('Email inviata con successo');
  }).catch((error) => {
    console.error('Errore nell\'invio dell\'email:', error);
  });
};

module.exports = sendVerificationEmail;
