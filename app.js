const express = require('express'),
      config = require('config'),
      cors = require('cors'),
      mongoose = require('mongoose');
require('colors');

const app =express();

app.use(cors());
app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/contacts', require('./routes/contacts.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'));

        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}...`.bgCyan);
        });

    } catch(err) {
        console.log('Server Error', err.message);
        process.exit(1);
    }
}
start();