function kontrolEt(val,deger){
    console.log(val.className)
    if(val.value == "ekle"){
        const element = document.getElementsByClassName(`${val.className}`)[3]

        element.innerHTML = `
        <input type="number" name="soru" class="sorular" onchange="this.form.submit()"  >
        `
    }
    if (val.value == "esitle"){
        const element = document.getElementsByClassName(`${val.className}`)[3]

        element.innerHTML = `
        <input type="number" name="soru" class="sorular" onchange="this.form.submit()">
        `

    }
            // input#soru(type="text" onchange="kontrolEt(this)" name="soru")
    
    // var deger = va;
    // var tum = document.getElementsByClassName(`${deger.className}`)
    // if(tum[0].checked){
    //     va.form.submit();
    // }
    // if (tum[1].checked){
    //     va.form.submit();
    // }

}