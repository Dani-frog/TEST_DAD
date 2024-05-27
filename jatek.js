var szunet = true;
var x;
var y;
var jelenlegiKerdes = -1;
var joKerdesek;
var kerdesDiv;
var oszespont = 0;


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
    alert("Jatek vege");
    alert("Atlagos pontod: "+ atlagosPont());

    let ujratoltgomb = document.createElement("input");
    ujratoltgomb.type ="button";
    ujratoltgomb.value = "Új játék";
    ujratoltgomb.className +="basicGomb";
    ujratoltgomb.setAttribute("onclick","location.reload()");
    gombok[0].appendChild(ujratoltgomb);
}

function atlagosPont(){
    if (joKerdesek.length < 10) {
        return Math.round(oszespont/joKerdesek.length);
    }
    else{
        return Math.round(oszespont/10);
    }

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
        //pontozas rendesen

        szunet = true;
        let helyesx = joKerdesek[jelenlegiKerdes].xy.split(";")[0]
        let helyesy = joKerdesek[jelenlegiKerdes].xy.split(";")[1]
    
        console.log(helyesx*2 - x,helyesy*2 -y)
    
        const deltaX = helyesx - x;
        const deltaY = helyesy - y;
    
        var pont = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        pont = Math.round(pont)
        pont = 1000-pont
        console.log(pont)
        oszespont += pont
        document.getElementById("kerdesjelen").innerHTML = "Az elért pontod: "+pont;
    }
}

