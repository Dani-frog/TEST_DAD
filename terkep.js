console.log(bejelentkezve)
const terkep = document.getElementById("terkep");
const ctxTerkep = terkep.getContext("2d");
const terkepKep = document.createElement("img");
const bekuldgomb = document.getElementById("kerdesbutton");
var kordvan = false;
var textvan = false;
var nehezsegvan = false;
if (bekuldgomb) {
    bekuldgomb.disabled=true; 
}
terkep.height = 500;
terkep.width = 800;
var nehezseg;
terkepKep.src="Kepek/highqualitybighungary.jpg";

function terkepRajz(img,ctx,canvas,szel,mag) {
    if (bejelentkezve == true) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
    
        const imageX = (canvasWidth - szel)/2; // Center X
        const imageY = (canvasHeight - mag)/2; // Center Y
        ctx.drawImage(img, imageX, imageY,szel,mag);
    }
}

terkepKep.onload = function(){
    console.log("asd")
    terkepRajz(terkepKep,ctxTerkep,terkep,800,500);
}

// Event listener for mouse click on canvas
terkep.addEventListener('click', function(event) {

    terkepRajz(terkepKep,ctxTerkep,terkep,800,500);


    const rect = terkep.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;


    let pin = document.createElement("img");
    pin.src="pin.png";
    pin.onload = function(){
        ctxTerkep.shadowColor = "black";
        ctxTerkep.shadowBlur = 15;
        ctxTerkep.drawImage(pin, x-15, y-30, 25,25);
        keprekurziv(i+1,limit);
    }



    console.log("Mouse clicked at (x:", x, ", y:", y, ")");
    var kordinataDiv = document.getElementById("kordinata");
    if (kordinataDiv) {
        kordinataDiv.innerHTML = "Mouse clicked at (x:"+ x+ ", y:"+ y+ ")";
    }
    kordvan = true;
    buttonendisable(kordvan,textvan,nehezsegvan);
});

async function kerdesektombfeltolt() {
    try {
        const query = "SELECT * FROM terkep;"; // Query to select all rows from the table
        console.log(query);
        
        // Execute the SQL query and await the result
        const tablahossz = await LekerdezesEredmenye(query);

        
        // Assuming the result is an array of objects, assign it to kerdesektomb
        kerdesektomb = tablahossz;

        console.log(kerdesektomb);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
var kerdesektomb = [];// FONTOS ÜZENET: itt kigyűjti a sorokat tömbbe, hogy kitudjuk iratni a kérdéseket!!!!!

//
//SHUFFLE
//

function textchanged() {
    
    if (document.getElementById("kerdesbox").value.length>0) {
        textvan = true;
        buttonendisable(kordvan,textvan,nehezsegvan);
    }
}

function nehezsegchanged() {
    nehezsegvan = true;
        buttonendisable(kordvan,textvan,nehezsegvan);
}

async function nehezseg(btn) {
    
    await kerdesektombfeltolt();
    console.log("itt vok");
    const gombok =document.getElementsByClassName("gombok")
    for (let index = 0; index < gombok.length; index++) {
        gombok[index].innerHTML = "";
        
    }
    if (btn.value == "Könnyű") {
        console.log(btn.value);
        var mondatkerdes = kerdesektomb.find(obj => obj.nehezseg == "Könnyű");
        for (let index = 0; index < gombok.length; index++) { gombok[index].innerHTML = mondatkerdes.kerdes ; }
        
    }
    
    else if (btn.value == "Közepes") {
        console.log(btn.value);
        var mondatkerdes  = kerdesektomb.find(obj => obj.nehezseg == "Közepes");
        for (let index = 0; index < gombok.length; index++) { gombok[index].innerHTML = mondatkerdes.kerdes ; }
    }
    else if (btn.value == "Nehéz") {
        console.log(btn.value);
        var mondatkerdes  = kerdesektomb.find(obj => obj.nehezseg == "Nehéz");
        for (let index = 0; index < gombok.length; index++) { gombok[index].innerHTML = mondatkerdes.kerdes; }
    }
    else{console.log("NEMJÓ");}/*    const selectedQuestion = kerdesektomb.find(obj => obj.name === btn.value);
    if (selectedQuestion) {
        for (let index = 0; index < gombok.length; index++) {
            gombok[index].innerHTML = selectedQuestion.name;
        }
    } else {
        console.log("Nem található kérdés ehhez a nehézséghez!");
    }*/
} 

function kerdesfeltolt() {
    const kerdes = document.getElementById("kerdesbox").value;
    var kordinata = document.getElementById("kordinata");

    const line = kordinata.innerText
    const regex = /(?:\(x:)(\d+\.*\d*)(?:, y:)(\d+\.*\d*)(?:\))/;
    console.log(line);

    const match = line.match(regex);
    console.log(match);

    if (match) {
        const x = parseFloat(match[1]);
        const y = parseFloat(match[2]);
        koordinata = match[1]+";"+match[2];
        console.log(koordinata)
        console.log("x:", x);
        console.log("y:", y);
    } else {
        //alert("Nincs megadva koordináta!");
        console.log("Nincs megadva koordináta!");
        
    }
    const selectedOption = document.querySelector('input[name="nehezseg"]:checked')
    let nszint;

    console.log(selectedOption!=null);
    console.log(koordinata.length>0);
    console.log(kerdes.length>0);
    //if (selectedOption!=null && koordinata.length>0 && kerdes.length>0) {
        
    if (selectedOption!=null && koordinata.length>0 && kerdes.length>0) {
        nszint = selectedOption.value;
        bekuldgomb.disabled = false;
        console.log("Kiválasztott nehézség:", nszint);
      } else {
          bekuldgomb.disabled = true;
        console.log("Nincs nehézség kiválasztva, vagy koordináta vagy kérdés beírva!");
        //alert("Nem minden pont teljesült be! (Koordináta választás,)");
        return
    }
    const query = "insert into terkep VALUES(NULL, '"+kerdes+"','"+nszint+"','"+koordinata+"')"
    console.log(query)
    const response = LekerdezesEredmenye(query);
    console.log(response);
    //alert("Kérdés sikeresen feltöltve!");
    console.log("Kérdés sikeresen feltöltve!");
}

function AdminFeltolt() {
    const adminnev = document.getElementById("admintextbox");
    const rangja = LekerdezesEredmenye("select f.admin from felhasznalo f where f.nev = '"+adminnev.value+"'"); //<-- undefined-dal tér vissza és nem jó, amúgy jó
    rangja.then((segglyuk)=> {
                console.log(adminnev.value);
                console.log("ezaz: "+localStorage.nev);
                if(adminnev.value == localStorage.nev){
                    alert("hiba! Önmagad nem tudod admintalanítani!!!44!!");
                }
                else if(segglyuk[0].admin == 0){
                    const query = "update felhasznalo set admin=1 where nev = '"+adminnev.value+"'"
                    const response = LekerdezesEredmenye(query);
                    console.log(query);
                    console.log(response);
                    alert("Ember sikeresen Adminná téve!");
                }
                else if(segglyuk[0].admin == 1){
                    const query = "update felhasznalo set admin=0 where nev = '"+adminnev.value+"'"
                    const response = LekerdezesEredmenye(query);
                    console.log(query);
                    console.log(response);
                    alert("Ember sikeresen admintalanítva!");
                }
            });
} 
function Emberkitorol(){
    const deletenev = document.getElementById("deletetextbox");
    const pusztulj = LekerdezesEredmenye("delete from felhasznalo where nev='"+deletenev.value+"'"); //<-- undefined-dal tér vissza és nem jó, amúgy jó
    pusztulj.then((segglyuk)=> {
                //alert("megvanfőnők");
                console.log("felhasználó kitörölve!");
            });
}

function buttonendisable(kordvan, textvan, nehezsegvan) {
    if (kordvan && textvan && nehezsegvan) {
        bekuldgomb.disabled=false; 
    }
    else
        bekuldgomb.disabled=true; 
}