const mongoose = require('mongoose');

const {Schema} = mongoose;

const DummyUserModel = new Schema({
    name: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    avatar: {type: String}
},{
    timestamps: true
});


module.exports = mongoose.model('DummyUser', DummyUserModel);
