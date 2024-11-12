const SibApiV3Sdk = require('@sendinblue/client');

// Configura la chiave API direttamente durante la creazione dell'istanza
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = process.env.BREVO_API_KEY;

// Funzione per inviare l'email
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const sendSmtpEmail = {
            sender: { email: process.env.BREVO_SENDER },
            to: [{ email: to }],
            subject,
            htmlContent,
        };
        
        // Imposta la chiave API nel momento della chiamata
        apiInstance.apiClient.authentications['api-key'].apiKey = apiKey;
        
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`Email inviata a ${to}`);
    } catch (error) {
        console.error("Errore nell'invio dell'email:", error);
    }
};

module.exports = { sendEmail };
