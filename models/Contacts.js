const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    phone: {type: Number, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Contacts', schema);