const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin")
const locals = require("../middleware/locals");
const isAdmin = require("../middleware/isAdmin");




router.get("/admin",locals,isAdmin,adminController.getIndex);
router.get("/admin/:sinav",locals,isAdmin,adminController.getSinav);
// router.get("/admin/kpss",locals,isAdmin,adminController.getDGS);




router.get("/admin/kontrol/:yil",locals,isAdmin,adminController.sinaviKontrolEt);
router.get("/admin/kontrol/ders/:icerik",locals,isAdmin,adminController.sinavDuzenleGoruntuleDers);
router.get("/admin/duzenle/:yil",locals,isAdmin,adminController.sinavDuzenleGoruntule);
router.post("/admin/duzenle",locals,isAdmin,adminController.sinavDuzenleKaydet);
router.post("/admin/ders-ekle",locals,isAdmin,adminController.yeniDersEkle);
router.post("/admin/aktif/:sinav",locals,isAdmin,adminController.sinaviAktiflestir);
router.post("/admin/pasif/:sinav",locals,isAdmin,adminController.sinaviPasiflestir);












module.exports = router;