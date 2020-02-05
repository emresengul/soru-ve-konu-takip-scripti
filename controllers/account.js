const User = require("../models/user");
const Login = require("../models/login");
const sgMail = require('@sendgrid/mail');
const crypto = require("crypto");
const bcrypt = require("bcrypt")
const Sinav = require("../models/sinav");

var apiKey = process.env.MAIL_API




sgMail.setApiKey(apiKey);

exports.getLogin = (req, res, next) => {
    if (req.user) {
        return res.redirect("/")
    }
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render("account/login", {
        path: "/login",
        title: "Login",
        errorMessage: errorMessage
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const loginModel = new Login({
        email: email,
        password: password
    })
    loginModel.validate()
        .then(() => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        req.session.errorMessage = "Bu mail adresi ile bir kayıt bulunamadı";
                        req.session.save(function (err) {
                            console.log(err)
                            return res.redirect("/login");
                        })
                    }
                    bcrypt.compare(password, user.password)
                        .then(isSuccess => {
                            if (isSuccess) {
                                req.session.user = user;
                                req.session.isAuthenticated = true;
                                return req.session.save(function (err) {
                                    var url = req.session.redirectTo || "/";
                                    delete req.session.redirectTo;
                                    res.redirect(url)
                                })
                            }
                            else {
                                req.session.errorMessage = "Şifre Hatası: Girilen Şifre Hatalı";
                                req.session.save(function (err) {
                                    console.log(err)
                                    return res.redirect("/login");
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            if (err.name == "ValidationError") {
                let message = "";
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }
                res.render("account/login", {
                    path: "/login",
                    title: "Login",
                    errorMessage: message,
                })
            }
            else {
                next(err)
            }
        })


}


exports.getRegister = (req, res, next) => {
    Sinav.find()
        .then(result=>{
            var errorMessage = req.session.errorMessage;
            delete req.session.errorMessage;
            res.render("account/register", {
                path: "/register",
                title: "Register",
                errorMessage: errorMessage,
                sinavlar: result
            })
        })

}

exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const sinav = req.body.sinav;
    var sonuc;
    var sifresonuc;
    User.findOne({ email: email })
        .then(user => {

            if (user) {
                req.session.errorMessage = "Bu mail adresi ile zaten bir kayıt var";
                req.session.save(function (err) {
                    console.log(err)
                    return sonuc = false;
                })
            }
            if (password.length < 6) {
                return sifresonuc = false;
            }
            return bcrypt.hash(password, 10)


            // if(password.length < 7){
            //     req.session.errorMessage = "Şifrenizin uzunluğu en az 8 olmalı.";
            //     req.session.save(function (err) {
            //         console.log(err)
            //         return res.redirect("/register");
            //     })
            // }
            // else{
            //     return bcrypt.hash(password, 10)
            // }
        })
        .then(hashedPassword => {
            if (sonuc == false) {
                return sonuc = false;
            }
            else if (sifresonuc == false){
                return sifresonuc = false;

            }
            else if (sifresonuc == false && sonuc == false){
                return sifresonuc = false; sonuc = false;
            }
            else {
                var d = new Date();
                var n = d.getFullYear();
                var sorgu = sinav;
     
    
            
                Sinav.findOne({sinav:sorgu})
                    .then(sonuc=>{
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            sinav: sinav,
                            dersler: sonuc.dersler,
                            konular: sonuc.konular
                        })
                        return newUser.save();
                    })

            }
        })
        .then(() => {
            if (sonuc == false){
                req.session.errorMessage = "Bu mail adresi ile zaten bir kayıt var";
                req.session.save(function (err) {
                    // console.log(err)
                    return res.redirect("/register")
                })
            }
            else if (sifresonuc == false){
                req.session.errorMessage = "Şireniz minumum 8 karakter olmalıdır.";
                req.session.save(function (err) {
                    // console.log(err)
                    return res.redirect("/register")
                })
            }
            else{
                const msg = {
                    to: email,
                    from: 'info@emresengul.com',
                    subject: 'Hesabınız başarıyla oluşturuldu',
                    html: `
                    <h1>Sitemize kayıt olduğunuz için teşekkürler <span style="color:red;">${name}</span>,</h1>
                        <h5>Kayıt olunan mail adresi: ${email}</h5>
                        <a href="${req.protocol + "://" + req.get('host') + "/"}"> ${req.protocol + "://" + req.get('host') + "/"}</a>
                        <p style="background-color:black; color:white;">Bol bol soru çözmek sana çok güzel bir gelecek hazırlayacak! Sakın ihmal etme, senin geleceğine biz de katkı yapmak istiyoruz.</p>
                    `,
                    // html: '<h1>Hesabınız verilen bilgilerle sitemize kayıt edildi</h1>',
                };
                sgMail.send(msg);
                res.redirect("/login");

            }

           
        })
        .catch(err => {
            if (err.name == "ValidationError") {
                let message = "";
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }
                res.render("account/register", {
                    path: "/register",
                    title: "Register",
                    errorMessage: message
                })
            }
            else {
                next(err);
            }
        })
}

exports.getReset = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;

    res.render("account/reset", {
        path: "/reset-password",
        title: "Reset Password",
        errorMessage: errorMessage
    })
}

exports.postReset = (req, res, next) => {
    const email = req.body.email;


    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            return res.redirect("/reset-password")
        }
        const token = buffer.toString("hex")
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    req.session.errorMessage = "Böyle bir mail adresi bulunamadı";
                    req.session.save(function (err) {
                        return res.redirect("/reset-password");
                    })
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(() => {
                var link = req.protocol + "://" + req.get('host') + "/";
                const msg = {
                    to: email,
                    from: 'info@emresengul.com',
                    subject: 'Parolanızı Şimdi Sıfırlayın',
                    html: `
                    <h1>Şifre Sıfırlama</h1>
                    <p>Şifre Sıfırlama Kodunuzu Kullanabilirsiniz</p>
                    <p>
                        <a href="${link}reset-password/${token}"> Reset Password </a>
                    </p>
                    `,
                };
                sgMail.send(msg);
                res.redirect("/")
            })
            .catch(err => {
                next(err)

            })
    })
}

exports.getNewPassword = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;

    const token = req.params.token;
    User.findOne({
        resetToken: token, resetTokenExpiration: {
            $gt: Date.now()
        }
    })
        .then(user => {

            res.render("account/new-password", {
                path: "/new-password",
                title: "New Password",
                errorMessage: errorMessage,
                userId: user._id.toString(),
                passwordToken: token
            })
        })
        .catch(err => {
            next(err)
        })
}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const token = req.body.passwordToken;
    const userId = req.body.userId;
    let _user;
    if(newPassword.length>7){
        User.findOne({
            resetToken: token,
            resetTokenExpiration: {
                $gt: Date.now()
            },
            _id: userId
        })
            .then(user => {
                _user = user;
                return bcrypt.hash(newPassword, 10);
            })
            .then(hashedPassword => {
                _user.password = hashedPassword;
                _user.resetToken = undefined;
                _user.resetTokenExpiration = undefined;
                return _user.save();
            })
            .then(() => {
                res.redirect("/login");
            })
            .catch(err => {
                next(err)
    
            })

    }





}

exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect("/")
    })
}
