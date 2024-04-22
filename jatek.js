var szunet = true;
var x;
var y;
var jelenlegiKerdes = -1;
var joKerdesek;
var kerdesDiv;


async function nehezseg(btn) {
    szunet = false;
    
    await kerdesektombfeltolt();
    shuffle(kerdesektomb)

    const gombok = document.getElementsByClassName("gombok")
    for (let index = 0; index < gombok.length; index++) {
        gombok[index].innerHTML = "";
    }

    joKerdesek  = kerdesektomb.filter(obj => obj.nehezseg == btn.value);

    kerdesDiv = document.createElement("div");
    gombok[0].appendChild(kerdesDiv);

    kerdesKiiras();

    let gomb = document.createElement("input")
    gomb.type = "button";
    gomb.value = "Tovább";
    gomb.setAttribute("onclick","pontozas()")

    gombok[0].appendChild(gomb);
} 

function kerdesKiiras(){
    jelenlegiKerdes++;
    kerdesDiv.innerHTML = joKerdesek[jelenlegiKerdes].kerdes;
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

function pontozas(){
    let helyesx = joKerdesek[jelenlegiKerdes].xy.split(";")[0]
    let helyesy = joKerdesek[jelenlegiKerdes].xy.split(";")[1]

    console.log(helyesx*2 - x,helyesy*2 -y)

    const deltaX = helyesx - x;
    const deltaY = helyesy - y;

    var temp = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    console.log(temp1)

}