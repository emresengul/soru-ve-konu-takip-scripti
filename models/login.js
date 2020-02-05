const mongoose = require("mongoose");
const {isEmail} = require("validator");
const loginScheme = mongoose.Schema({
    email: {
        type: String,
        validate: [isEmail,"Mail Hatası: Hatalı Mail Adresi"]
    },
    password:{
        type: String,
        required: [true,"Şifre Hatası: Parolanızı tekrar kontrol edin."]
    }
})

module.exports = mongoose.model("Login",loginScheme)