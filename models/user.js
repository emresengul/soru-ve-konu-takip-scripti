const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: [isEmail,"Mail Adresini Kontrol Edin"]
    },
    password:{
        type: String,
        // validate: {
        //     validator:function(value){
        //         return value && value.length < 7;
        //     },
        //     message: "Şifreniz minumum 8 karakter olmalıdır."
        // },
        // required: [true,"Şifre Hatası: Lütfen Şifrenizi Giriniz"],
    },
    resetToken: String,
    resetTokenExpiration: Date,
    isAdmin:{
        type: Boolean,
        default: false
    },
    sinav:{
        type: String,
        required: true
    },
    dersler: [],
    konular: mongoose.Schema.Types.Mixed,
})


module.exports = mongoose.model("User", userSchema);


