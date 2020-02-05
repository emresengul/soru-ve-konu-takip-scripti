const mongoose = require("mongoose");


const sinavScheme = mongoose.Schema({
    sinav: {
        type: String,
        required: true
    },
    dersler:[],
    konular: mongoose.Schema.Types.Mixed,
    isActive: {
        type: Boolean,
        default: false
    }
    

})



module.exports = mongoose.model("Sinav", sinavScheme);
