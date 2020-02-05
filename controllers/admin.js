const Sinav = require("../models/sinav");

exports.getIndex = (req, res, next) => {
    res.render("admin/index", {
        user: req.user
    })
}
exports.getSinav = (req, res, next) => {
    const link = req.params.sinav;
    var d = new Date();
    var n = d.getFullYear();
    res.render("admin/sinavlar", {
        yil: n,
        sinav: link
    })


}
exports.sinaviKontrolEt = (req, res, next) => {
    const gelenDeger = (req.params.yil).split(":");
    const sinavTuru = gelenDeger[0];
    const yil = gelenDeger[1];
    const birlesim = sinavTuru + yil;

    const dgsDers = ["ornekders1", "ornekders2"]

    const dgsTest = [{
        ornekders1: {
            tum: [[["Örnek Konu1", 0, "Bitmedi"], ["Örnek Konu2", 0, "Bitmedi"], ["Örnek Konu3", 0, "Bitmedi"], ["Örnek Konu4", 0, "Bitmedi"]]]
        },
        ornekders2: {
            tum: [[["Örnek Konu1", 0, "Bitmedi"], ["Örnek Konu2", 0, "Bitmedi"], ["Örnek Konu3", 0, "Bitmedi"], ["Örnek Konu4", 0, "Bitmedi"], ["Örnek Konu5", 0, "Bitmedi"]]]
        }
    }]


    Sinav.findOne({ sinav: birlesim })
        .then(sinav => {
            if (sinav == undefined || sinav == null) {

                const yeniSinav = new Sinav({
                    sinav: birlesim,
                    dersler: dgsDers,
                    konular: [{
                        ders: {
                            ornekders1: dgsTest[0].ornekders1.tum,
                            ornekders2: dgsTest[0].ornekders2.tum
                        }
                    }],
                    isActive: true
                })
                return yeniSinav.save();
            }
            else {
            }
        })
        .then(() => {
            res.redirect(`/admin/duzenle/${birlesim}`)
        })
        .catch(err => {
            next(err)
        })

}


exports.sinavDuzenleGoruntule = (req, res, next) => {
    const link = req.params.yil
    Sinav.findOne({ sinav: link })
        .then((sinav) => {
            res.render("admin/duzenle", {
                ders: sinav.dersler,
                url: "/admin/kontrol/ders/",
                sinav: link,
                aktif: sinav.isActive

            })

        })
        .catch(err => {
            next(err)
        })

}
exports.sinavDuzenleGoruntuleDers = (req, res, next) => {
    const gelenDeger = (req.params.icerik).split(",");
    const sinav = gelenDeger[0];
    const ders = gelenDeger[1];



    Sinav.findOne({ sinav: sinav })
        .then(bilgi => {

            let valuem = eval(`bilgi.konular[0].ders["${ders}"]`);
            console.log(valuem)
            res.render("admin/duzenle-ders", {
                ders: valuem[0],
                ad: ders,
                sinav: sinav
            })

        })
        .catch(err => {
            next(err)
        })


}



exports.sinavDuzenleKaydet = (req, res, next) => {
    const dgsTest = [{
        matematik: {
            tum: [[["Örnek Konu1", 0, "Bitmedi"], ["Örnek Konu2", 0, "Bitmedi"], ["Örnek Konu3", 0, "Bitmedi"], ["Örnek Konu4", 0, "Bitmedi"]]]
        },
        turkce: {
            tum: [[["Örnek Konu1", 0, "Bitmedi"], ["Örnek Konu2", 0, "Bitmedi"], ["Örnek Konu3", 0, "Bitmedi"], ["Örnek Konu4", 0, "Bitmedi"], ["Örnek Konu5", 0, "Bitmedi"]]]
        }
    }]

    /*
        {
            tum: deger
        }


    */

    // let val =eval(`req.body.matematik-${i}`)
    var gelenDeger = req.body;
    var gelenDers = (req.body.deger).split(":")[1]
    var gelenSinav = (req.body.deger).split(":")[0]

    var gelenDegerArray = Object.keys(gelenDeger)
    var gelenDegerValue = Object.values(gelenDeger)
    var deger = [];



    for (let i = 0; i < gelenDegerArray.length; i++) {
        if (gelenDegerArray[i].includes(gelenDers)) {
            deger.push([gelenDegerValue[i], 0, "Bitmedi"])

        }
    }


    Sinav.findOne({ sinav: gelenSinav, })
        .then(sinav => {
            var val = eval(`sinav.konular[0].ders["${gelenDers}"]`)

            val[0] = deger;
            sinav.markModified("konular")
            return sinav.save();
        })
        .then(sinavim => {
            res.redirect(`/admin/kontrol/ders/${gelenSinav},${gelenDers}`)
        })
        .catch(err => {
            next(err)
        })

}

exports.yeniDersEkle = (req, res, next) => {
    const dgsTest = [{
        matematik: {
            tum: [[["Örnek Konu1", 0, "Bitmedi"], ["Örnek Konu2", 0, "Bitmedi"], ["Örnek Konu3", 0, "Bitmedi"], ["Örnek Konu4", 0, "Bitmedi"]]]
        }
    }]

    var gelenDeger = req.body;
    var gelenDegerArray = Object.keys(gelenDeger)
    var gelenDegerValue = Object.values(gelenDeger);


    var link = req.body.sinav;


    var deger = [];
    var silinecekDeger = [];

    for (let i = 0; i < gelenDegerArray.length; i++) {
        if (gelenDegerArray[i].includes(link)) {
            deger.push(gelenDegerValue[i])

        }
        if (gelenDegerArray[i].includes("tanimsiz")) {
            silinecekDeger.push(gelenDegerValue[i])
        }
    }


    if (deger.length >= 0) {

        Sinav.find({ sinav: link })
            .then(sinav => {
                let kontrolEt = sinav[0].konular[0].ders; // Matematik: Türkçe: Konum:
                let degerler = Object.keys(kontrolEt) // Matematik,Türkçe
                let icindekiler = Object.values(kontrolEt)

                for (let x = 0; x < deger.length; x++) {

                    if (silinecekDeger) {
                        delete kontrolEt[silinecekDeger[x]]
                    }
                    if (kontrolEt[deger[x]]) {
                        

                    }
                    else {
                        // var degerim = 
                        var boslukSilici = deger[x].replace(/\s/g, '')

                        kontrolEt[deger[x]] = kontrolEt[degerler[x]]
                        delete kontrolEt[degerler[x]]

                        kontrolEt[deger[x]] = dgsTest[0].matematik.tum
                    }

                }
                sinav[0].dersler = deger;
                sinav[0].markModified("dersler")
                sinav[0].markModified("konular")
                return sinav[0].save();
            })
            .then(al => {
                res.redirect(`/admin/duzenle/${link}`)
            })
            .catch(err => {
                next(err)
            })
    }
}

exports.sinaviAktiflestir = (req,res,next)=>{
    var value = req.params.sinav;
    Sinav.findOne({sinav:value})
        .then(result=>{
            result.isActive = true;
            return result.save();
        })
        .then(()=>{
            res.redirect(`/admin/duzenle/${value}`)
        })

}


exports.sinaviPasiflestir = (req,res,next)=>{
    var value = req.params.sinav;
    Sinav.findOne({sinav:value})
        .then(result=>{
            result.isActive = false;
            return result.save();
        })
        .then(()=>{
            res.redirect(`/admin/duzenle/${value}`)
        })

}
