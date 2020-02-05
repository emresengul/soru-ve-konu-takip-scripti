const User = require("../models/user");
const Sinav = require("../models/sinav");

exports.getIndex = (req, res, next) => {
    res.render("main/index", {
        title: "Soru ve Konu Takip Uygulaması",
        path: "/",
        user: req.user,
        url: req.protocol + "://" + req.get('host') + "/" + "istatistik" + "/"
    });
}


exports.getPrivateStats = (req, res, next) => {
    var ders = req.params.ders
    var sinav = req.user.sinav;

    const degerim = req.user.konular[0].ders
    var matematik = ["Matematik", 0];
    var turkce = ["Türkçe", 0];


    var genel = [];


    var tumKonuSoruSayisi = [];
    var toplamCozulenSoru = 0;
    var bitmeyenler = 0;
    var bitenler = 0;
    var tumKonular = []
    var oranlar = [];
    var kullaniciDersi = [];





    function ekle(ders, deger) {
        deger = Number(deger)
        if (ders) {
            tumKonuSoruSayisi.push(deger);
            toplamCozulenSoru = toplamCozulenSoru + deger;
        }
    }

    const islemler = new Promise(function (resolve, reject) {
        if (sinav) {
            let value = eval(`req.user.konular[0].ders.${ders}[0]`)
            for (let i = 0; i < value.length; i++) {
                tumKonular.push(value[i][0]) // Konuyu Alır
                if (value[i][2] == "Bitmedi") {
                    bitmeyenler = bitmeyenler + 1;
                }
                else {
                    bitenler = bitenler + 1;
                }
                ekle(ders, value[i][1])
            }
            oranlar.push(ders, bitenler, bitmeyenler)
            kullaniciDersi.push(value)

        }
        resolve("ok")
        reject("no")
    })
    islemler
        .then(() => {
            res.render("main/istatistik", {
                title: "İstatistiklerim",
                path: "/istatistik",
                konular: kullaniciDersi[0],
                dersad: ders,
                konu: oranlar,
                basliklar: tumKonular,
                toplam: toplamCozulenSoru,
                sorular: tumKonuSoruSayisi
            })

        })
        .catch(err => {
            next(err)
        })



}
exports.getKonular = (req, res, next) => {
    var deger = []
    for (let x = 0; x < req.user.dersler.length; x++) {
        var ders = eval(`req.user.konular[0].ders.${req.user.dersler[x]}`)
        deger.push(ders)
    }
    res.render("main/konular", {
        title: "Deneme",
        path: "/konular",
        deger: deger,
        dersler: req.user.dersler,
    })
}
exports.konuGuncelle = (req, res, next) => {

    const gelenDeger = req.body.update
    const gelenDegerSplit = gelenDeger.split(":"); // Matematik,0
    if (gelenDegerSplit.length > 0) {
        User.findOne({ _id: Object(req.user._id) })
            .then((result) => {
                var deneme2 = eval(`result.konular[0].ders.${gelenDegerSplit[0]}[0]`);
                const objem = deneme2[gelenDegerSplit[1]][2];
                if (objem == "Bitti") {
                    deneme2[gelenDegerSplit[1]][2] = "Bitmedi"
                }
                if (objem == "Bitmedi") {
                    deneme2[gelenDegerSplit[1]][2] = "Bitti"
                }
                result.markModified("konular")
                return result.save()
            })
            .then(() => {
                res.redirect("/konular")
            })
            .catch(err => {
                next(err)
            })
    }
}


exports.getSorular = (req, res, next) => {
    var deger = []
    for (let x = 0; x < req.user.dersler.length; x++) {
        var ders = eval(`req.user.konular[0].ders.${req.user.dersler[x]}`)
        deger.push(ders)
    }
    res.render("main/sorular", {
        title: "Deneme",
        path: "/sorular",
        deger: deger,
        dersler: req.user.dersler,
    })

}
exports.soruGuncelle = (req, res, next) => {
    // Gelen Soruya Göre İşlem Yap
    const gelenDeger = req.body.update
    var gelenSoru = req.body.soru;
    const gelenDegerSplit = gelenDeger.split(":"); // Matematik,0
    const durum = req.body.durum;
    if (durum == "esitle") {
        if (gelenDegerSplit.length > 0) {
            User.findOne({ _id: Object(req.user._id) })
                .then((result) => {
                    var deneme2 = eval(`result.konular[0].ders.${gelenDegerSplit[0]}[0]`); // matematik
                    const objem = deneme2[gelenDegerSplit[1]][1];
                    deneme2[gelenDegerSplit[1]][1] = req.body.soru
                    result.markModified("konular")

                    return result.save()
                })
                .then(yeni => {
                    res.redirect("/sorular")
                })
                .catch(err => {
                    next(err)
                })
        }

    }
    if (durum == "ekle") {
        if (gelenDegerSplit.length > 0) {
            User.findOne({ _id: Object(req.user._id) })
                .then((result) => {
                    var deneme2 = eval(`result.konular[0].ders.${gelenDegerSplit[0]}[0]`);
                    const objem = deneme2[gelenDegerSplit[1]][1];
                    let topla = Number(objem) + Number(req.body.soru)
                    deneme2[gelenDegerSplit[1]][1] = topla
                    result.markModified("konular")

                    return result.save()
                })
                .then(yeni => {
                    res.redirect("/sorular")
                })
                .catch(err => {
                    next(err)
                })
        }

    }
}

exports.getStats = (req, res, next) => {
    const degerim = req.user.konular[0].ders;
    const sinav = req.user.sinav

    function ekle(ders, deger) {
        deger = Number(deger)
        if (ders) {
            tumKonuSoruSayisi.push(deger);
            toplamCozulenSoru = toplamCozulenSoru + deger;
        }
    }
    var oranlar = [];
    var toplamSoru = 0;
    var genel = [];

    const islemler = new Promise(function (resolve, reject) {
        if (sinav) {


            let my = Object.keys(req.user.konular[0].ders);

            for (let x = 0; x < req.user.dersler.length; x++) {
                var ders_bitmis = 0;
                var ders_bitmemis = 0;
                var ders_toplam_soru = 0;
                let value = eval(`req.user.konular[0].ders.${my[x]}[0]`)
                for (let i = 0; i < value.length; i++) {
                    toplamSoru = Number(toplamSoru) + Number(value[i][1])
                    ders_toplam_soru = Number(ders_toplam_soru) + Number(value[i][1])
                    if (value[i][2] == "Bitmedi") {
                        ders_bitmemis = ders_bitmemis + 1;
                    }
                    else{
                        ders_bitmis = ders_bitmis + 1;
                    }
                }
                genel.push([my[x],ders_toplam_soru])
                oranlar.push([my[x],ders_bitmis,ders_bitmemis])
            }
            
        }
        resolve("ok")
        reject("no")
    })
    islemler
        .then(() => {
            res.render("main/istatistikler", {
                title: "İstatistiklerim",
                path: "/istatistikler",
                butun: genel,
                oranlar: oranlar,
                toplamsoru: toplamSoru
            })

        })
        .catch(err => {
            next(err)
        })









  




}