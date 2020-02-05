const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")
const locals = require("../middleware/locals");
const authentication = require("../middleware/authentication");




router.get("/",locals,userController.getIndex);
router.get("/istatistik/:ders",authentication,locals,userController.getPrivateStats)
router.get("/istatistikler/",locals,authentication,userController.getStats)
router.get("/konular/",locals,authentication,userController.getKonular)
router.get("/sorular",locals,authentication,userController.getSorular)
router.post("/konu-guncelle",authentication,locals,userController.konuGuncelle)
router.post("/soru-guncelle",authentication,locals,userController.soruGuncelle)






module.exports = router;