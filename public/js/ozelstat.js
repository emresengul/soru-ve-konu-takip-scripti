var konuBasliklari = document.getElementById("basliklar").value.split(",");
var soruAdetleri = document.getElementById("sorular").value.split(",");
var dersAdi = document.getElementById("dersadi").value;

function veriDuzenle() {
    

    var konular = document.getElementById("konular").value.split(",");


    for (let a = 0; a < konular.length; a++){
        if(konular[a] == dersAdi){

            var dersAdim = dersAdi + "-konu"

            kartOlusturucu(dersAdim,konuBasliklari,soruAdetleri,"bar")
            kartOlusturucu(dersAdi,["Biten","Bitmeyen"],[konular[a+1],konular[a+2]],"pie")

        }


    }
    function kartOlusturucu(kartadi,labels,data,type){
        var inner = document.getElementsByClassName("row")[0];
        if (data.length == 2){
            var toplam = Number(data[0]) + Number(data[1]);
            var gelenDeger = Number(data[0])
            var sonuc = (gelenDeger / toplam) * 100
        }
        else{
            var sonuc = "yok";
        }

        var obj = document.createElement("div");
 
        obj.className = "col-md-12 cards"
        if (kartadi.includes("konu")){
            obj.innerHTML = `<h1 class="text-center mt-5 mb-2"> ${kartadi.split("-")[0]} Konu Oranları </h1>`
        }
        else{
            obj.innerHTML = `<h1 class="text-center mt-5 mb-2"> ${kartadi} Konuları </h1>`
        }
        if(sonuc == "yok"){

        }
        else{
            obj.innerHTML += `<h6 class="text-center text-danger"> %${sonuc.toFixed(2)} Tamamlandı  </h6>`
        }
        obj.innerHTML += `<hr>`
        obj.innerHTML += `<canvas id=${kartadi}></canvas>`
        inner.appendChild(obj);
        var myStats = document.getElementById(`${kartadi}`).getContext('2d')
        var myChart = new Chart(myStats, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: ' Soru Adeti',
                    data: data,
                    backgroundColor: [
                        "green",
                        "gray",
                        "orange",
                        "purple",
                        "blue",
                        "gray"
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    }
}