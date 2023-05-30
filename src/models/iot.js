const mongoose = require('mongoose');

const iotSchema = mongoose.Schema({
    id_nodo: {
        type: mongoose.Types.ObjectId
    },
    cant: {
        type: Number,
    },
    ts:{
        type: Date,
    }
});

module.exports= mongoose.model('medidas', iotSchema);