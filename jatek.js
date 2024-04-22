var szunet = true;
var x;
var y;


async function nehezseg(btn) {

    szunet = false;
    await kerdesektombfeltolt();
    shuffle(kerdesektomb)
    console.log(kerdesektomb);
    console.log("itt vok");
    const gombok = document.getElementsByClassName("gombok")
    for (let index = 0; index < gombok.length; index++) {
        gombok[index].innerHTML = "";
    }
    if (btn.value == "Könnyű") {
        console.log(btn.value);
        var mondatkerdes = kerdesektomb.find(obj => obj.nehezseg == "Könnyű");
        for (let index = 0; index < gombok.length; index++) 
        {
            gombok[index].innerHTML = mondatkerdes.kerdes; 
            gombok[index].id = "kerdesjelen"; 
        }
    }
    
    else if (btn.value == "Közepes") {
        console.log(btn.value);
        var mondatkerdes  = kerdesektomb.find(obj => obj.nehezseg == "Közepes");
        for (let index = 0; index < gombok.length; index++)
        {
            gombok[index].innerHTML = mondatkerdes.kerdes;
            gombok[index].id = "kerdesjelen"; 
        }
    }
    else if (btn.value == "Nehéz") {
        console.log(btn.value);
        var mondatkerdes  = kerdesektomb.find(obj => obj.nehezseg == "Nehéz");
        for (let index = 0; index < gombok.length; index++) 
        { 
            gombok[index].innerHTML = mondatkerdes.kerdes; 
            gombok[index].id = "kerdesjelen"; 
        }
    }
    else{
        console.log("NEMJÓ");
    }
    let gomb = document.createElement("input")
    gomb.type = "button";
    gomb.value = "Tovább"
    gomb.id ="tovabbgomb"
    document.getElementsByClassName("gombok")[0].appendChild(gomb);
} 

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function terkepreKatt(xKord,yKord){
    x = xKord;
    y = yKord;
}