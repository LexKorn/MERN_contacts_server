const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    phone: {type: Number, required: true}
});

module.exports = model('Contacts', schema);