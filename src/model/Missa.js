const { Schema, model } = require("mongoose");

const DevSchema = new Schema({
    dia: {
        type: String,
        require: true,
    },
    semana:{
        type:String,
        required: true
    },
    horas:{
        type:String,
        required: true
    },
    pessoas: [{
        type: String,
        ref: 'Missa',
    }],
    numero:{
        type: Number
    }
}, {
    timestamps: true,
});

module.exports = model('Missa', DevSchema);