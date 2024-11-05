const isAuthored = (req, res, next) => {
    const header = req.headers['authorization'];

    console.log(header);
    if (!header || !header.includes('pluto')) {
        return res.status(403).send('Non sei autorizzato!');
    }

    next();
};

module.exports = isAuthored;
