var ctx = document.getElementById('myChart').getContext('2d');



function veriDuzenle() {
    var derslerim = [];
    var degerlerim = [];
    var konuDegerMat = [];
    var konuDegerTurkce = [];
    var hepsi = document.getElementById("butun").value.split(",");
    var konular = document.getElementById("konular").value.split(",");

    // Toplam Çözülen Soruyu Oluşturuyor
    for (let i = 0; i < hepsi.length; ){
        derslerim.push(hepsi[i]);
        degerlerim.push(hepsi[i+1]);
        i = i +2
    }


    // Her ders için ayrı tamamlanma oranı kartı oluşturuyor
    for (let a = 0; a < konular.length;){
        kartOlusturucu(konular[a],["Biten","Bitmeyen"],[konular[a+1],konular[a+2]])
        a = a + 3
    }


    function kartOlusturucu(kartadi,labels,data){
        var inner = document.getElementsByClassName("row")[0];
        var toplam = Number(data[0]) + Number(data[1]);
        var gelenDeger = Number(data[0])
        var sonuc = (gelenDeger / toplam) * 100
        
        var obj = document.createElement("div");
        // obj = kartadi
        obj.className = "col-md-12 cards"
        obj.innerHTML = `
        <h1 class="text-center mt-5 mb-2"> ${kartadi} Konular </h1>
        <h6 class="text-center text-danger"> %${sonuc.toFixed(2)} Tamamlandı  </h6>
        <hr>
        <canvas id=${kartadi}>Merhaba</canvas>`
        inner.appendChild(obj);
        var myStats = document.getElementById(`${kartadi}`).getContext('2d')
        var myChart = new Chart(myStats, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
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
    


    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: derslerim,
            datasets: [{
                label: '# of Votes',
                data: degerlerim,
                backgroundColor: [
                    "red",
                    "blue",
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