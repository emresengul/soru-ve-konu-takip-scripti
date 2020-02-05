



const ekleButonu = document.getElementsByClassName("ekle")[0];

var konularAlani = document.getElementsByClassName("konular")[0]
const sonEleman = konularAlani.lastChild.id.split("-");
var sonElemanAd = sonEleman[0];



ekleButonu.addEventListener("click", ekle)

function ekle() {
    var konularAlani = document.getElementsByClassName("konular")[0]

    var sinavTuru = document.getElementsByName("sinav")[0]
    var rastgeleSayi = Math.floor(Math.random() * 999) + 1;
    if(sinavTuru){
        var sinavTuru = document.getElementsByName("sinav")[0].value
        console.log(sinavTuru.value)
        konularAlani.innerHTML += `
        <input type="text" name="${sinavTuru}-${rastgeleSayi}" value="Yeni Ders"  class="mt-2">
        <a class="btn btn-danger"  style="border-radius: 50%; margin-left:-1.2rem;" id="${sinavTuru}-${rastgeleSayi}" onclick="sil(this)"> - </a>
        `
    }
    else{
        var sonElemanAd = document.getElementsByName("deger")[0].value.split(":")[1]
        konularAlani.innerHTML += `
        <input type="text" name="${sonElemanAd}-${rastgeleSayi}" value="Yeni Konu"  class="mt-2">
        <a class="btn btn-danger"  style="border-radius: 50%; margin-left:-1.2rem;" id="${sonElemanAd}-${rastgeleSayi}" onclick="sil(this)"> - </a>
        `
    }

    // konularAlani.innerHTML += `
    // <input type="text" name="${sonElemanAd}-${rastgeleSayi}" value="Yeni Konu"  class="mt-2">
    // <a class="btn btn-danger"  style="border-radius: 50%; margin-left:-1.2rem;" id="${sonElemanAd}-${rastgeleSayi}" onclick="sil(this)"> - </a>
    // `








    // e.preventDefault();
}
function kaydet(obje,deger){
    // let gelenDegerim = obje.value;
    // console.log("Gelen=",obje)
    // // let eleman = document.getElementsByName(obje.name)[0];
    // // console.log(eleman)
    // obje.value =  "6"
    // console.log("Giden=",obje)

    // return obje;

}

function sil(obje) {
    var silinecekObje = document.getElementsByName(obje.id)[0]
    console.log(obje)
    obje.style.display = "none"


    silinecekObje.name = "tanimsiz";
    silinecekObje.type = "hidden";
}


