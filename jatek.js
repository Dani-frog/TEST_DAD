var szunet = true;
var x;
var y;
var jelenlegiKerdes = -1;
var joKerdesek;
var kerdesDiv;
var oszespont = 0;
var korokszama = 0;


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
    kerdesDiv.id = "kerdesjelen";
    gombok[0].appendChild(kerdesDiv);

    kerdesKiiras();

    let gomb = document.createElement("input")
    gomb.type = "button";
    gomb.value = "Tovább";
    gomb.id = "tovabbgomb"
    gomb.setAttribute("onclick","pontozas()")

    gombok[0].appendChild(gomb);
    document.getElementById("cimamitpontszamracserelunk").innerText = ("Jelenlegi átlagos pontszámod: " + atlagosPont());
} 

function kerdesKiiras(){
    jelenlegiKerdes++;
    if (jelenlegiKerdes == 10 || joKerdesek.length == jelenlegiKerdes) {
        gameOver();
    }
    else{
        kerdesDiv.innerHTML = joKerdesek[jelenlegiKerdes].kerdes;
    }
}

function gameOver(){
    jQuery("document").ready(function($){ var flakes = '', randomColor; for(var i = 0, len = 400; i < len; i++) { randomColor = Math.floor(Math.random()*16777215).toString(16); flakes += '<div class="ball" style="background: #'+randomColor; flakes += '; animation-duration: '+(Math.random() * 9 + 2)+'s; animation-delay: '; flakes += (Math.random() * 2 + 0)+'s;"></div>'; } document.getElementById('confetti').innerHTML = flakes;});
    const gombok = document.getElementsByClassName("gombok");
    const confetto = document.getElementById("confetti");
    document.getElementById("tovabbgomb").style.display="none";
    confetto.style.display="flex";

    document.getElementById("cimamitpontszamracserelunk").innerHTML = "A játék vége, elért pontszám: "+atlagosPont();
    let ujratoltgomb = document.createElement("input");
    ujratoltgomb.type ="button";
    ujratoltgomb.value = "Új játék";
    ujratoltgomb.className +="basicGomb";
    ujratoltgomb.setAttribute("onclick","location.reload()");
    gombok[0].appendChild(ujratoltgomb);
    korokszama = 0;
}

function atlagosPont(){
    if (joKerdesek.length < 10) {
        var pont = Math.round(oszespont/korokszama);
    }
    else{
        var pont = Math.round(oszespont/10)
    }
    if (isNaN(parseFloat(pont))) {
        return 0;
    }
    return pont
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
    if (szunet == true) {
        //tovabblepes

        szunet = false;
        terkepRajz(terkepKep,ctxTerkep,terkep,800,500);
        kerdesKiiras();
    }
    else if(szunet == false){
        korokszama ++;
        //pontozas rendesen

        szunet = true;
        let helyesx = joKerdesek[jelenlegiKerdes].xy.split(";")[0]
        let helyesy = joKerdesek[jelenlegiKerdes].xy.split(";")[1]

        let pin = document.createElement("img");
        pin.src="helyesPin.png";
        pin.onload = function(){
            ctxTerkep.shadowColor = "black";
            ctxTerkep.shadowBlur = 15;
            ctxTerkep.drawImage(pin, helyesx-15, helyesy-30, 25,25);
        }
    
    
        console.log(helyesx*2 - x,helyesy*2 -y)
    
        const deltaX = helyesx - x;
        const deltaY = helyesy - y;
    
        var pont = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        pont = Math.round(pont)
        pont = 1000-pont
        console.log(pont)
        oszespont += pont
        document.getElementById("kerdesjelen").innerHTML = "Az elért pontod: "+pont;
        document.getElementById("cimamitpontszamracserelunk").innerText = ("Jelenlegi átlagos pontszámod: " + atlagosPont());
    }
}

