console.log(localStorage);
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
    if (!szunet || localStorage.admin == 1) {
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
        }
    
        if (localStorage.admin == 0) {
            terkepreKatt(x,y);
        }
    
    
        console.log("Mouse clicked at (x:", x, ", y:", y, ")");
        var kordinataDiv = document.getElementById("kordinata");
        if (kordinataDiv) {
            kordinataDiv.innerHTML = "Mouse clicked at (x:"+ x+ ", y:"+ y+ ")";
        }
        kordvan = true;
        buttonendisable(kordvan,textvan,nehezsegvan);
    }


});

async function felhtombfeltolt() {
    try {
        const query = "SELECT nev FROM felhasznalo;"; // Query to select all rows from the table
        console.log(query);
        
        // Execute the SQL query and await the result
        const response = await LekerdezesEredmenye(query);

        
        // Assuming the result is an array of objects, assign it to kerdesektomb
        felhtomb = response;

        console.log(kerdesektomb);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function kerdesektombfeltolt() {
    try {
        const query = "SELECT * FROM terkep;"; // Query to select all rows from the table
        console.log(query);
        
        // Execute the SQL query and await the result
        const response = await LekerdezesEredmenye(query);

        
        // Assuming the result is an array of objects, assign it to kerdesektomb
        kerdesektomb = response;

        console.log(kerdesektomb);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    /*const shuffle = (array) => { 
        return array.sort(() => Math.random() - 0.5);}
        kerdesektomb = shuffle(kerdesektomb);*/
}
var kerdesektomb = [];// FONTOS ÜZENET: itt kigyűjti a sorokat tömbbe, hogy kitudjuk iratni a kérdéseket!!!!!

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
    location.reload();
}

function AdminFeltolt() {
    const felhlista = document.getElementById("felhlista");
    const adminnev = felhlista.options[felhlista.selectedIndex].text;
    const rangja = LekerdezesEredmenye("select f.admin from felhasznalo f where f.nev = '"+adminnev+"'"); //<-- undefined-dal tér vissza és nem jó, amúgy jó
    rangja.then((segglyuk)=> {
                console.log(adminnev.value);
                console.log("ezaz: "+localStorage.nev);
                console.log(segglyuk[0]);

                if(adminnev.value == localStorage.nev){
                    alert("hiba! Önmagad nem tudod admintalanítani!!!44!!");
                }
                
                else if(segglyuk[0].admin == 0){

                    const query = "update felhasznalo set admin=1 where nev = '"+adminnev+"'"
                    const response = LekerdezesEredmenye(query);
                    console.log(query);
                    console.log(response);
                    alert("Ember sikeresen Adminná téve!");
                }
                else if(segglyuk[0].admin == 1){
                    const query = "update felhasznalo set admin=0 where nev = '"+adminnev+"'"
                    const response = LekerdezesEredmenye(query);
                    console.log(query);
                    console.log(response);
                    alert("Ember sikeresen admintalanítva!");
                }
            });



} 
function Emberkitorol(){

    const felhlista = document.getElementById("felhlista");
    const deletenev = felhlista.options[felhlista.selectedIndex].text;

    const pusztulj = LekerdezesEredmenye("delete from felhasznalo where nev='"+deletenev+"'"); //<-- undefined-dal tér vissza és nem jó, amúgy jó
    pusztulj.then((segglyuk)=> {
                //alert("megvanfőnők");
                console.log("felhasználó kitörölve!");
            });
    felhasznaloklista();
    felhasznaloklista();
}

async function kerdeseklista() {
    await kerdesektombfeltolt();
    var select = document.getElementById("kerdeseklista");
    // Clear existing options
    select.innerHTML = '';
    
    // Populate options from the array
    await kerdesektomb.forEach(function(sor) {
        var table = document.createElement("table");
        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        var th2 = document.createElement("th");
        var th3 = document.createElement("th");
        th1.innerText ="Kérdés";
        th2.innerText ="Nehézség";
        th3.innerText ="Koordináta";
        tr.appendChild(th1); 
        tr.appendChild(th2); 
        tr.appendChild(th3);
        table.appendChild(tr);


        var option = document.createElement("option");
        option.innerHTML = sor.kerdes +" "+sor.nehezseg +" "+ sor.xy;
        
        select.add(option);

    });
}



var felhtomb = [];

async function felhasznaloklista() {
    await felhtombfeltolt();
    var select = document.getElementById("felhlista");
    // Clear existing options
    select.innerHTML = '';
    
    // Populate options from the array
    await felhtomb.forEach(function(sor) {
        var option = document.createElement("option");
        option.text = sor.nev;
        select.add(option);

    });
}

async function kerdestorles() {
    var select = document.getElementById("kerdeseklista");
    console.log("anyuci");
    const query = "delete FROM terkep where kerdes ='"+select.options[select.selectedIndex].text+"';"; // sortörlésxd select az gyak egy listbox a selec.options[]stb az self explanatory.
    console.log(query);
    const tablahossz = await LekerdezesEredmenye(query);
        
    kerdeseklista();
}


function buttonendisable(kordvan, textvan, nehezsegvan) {
    if (bekuldgomb) {
        if (kordvan && textvan && nehezsegvan) {
        bekuldgomb.disabled=false; 
    }
        else
            bekuldgomb.disabled=true; 
    }
}

if (localStorage.admin == 1) {
    kerdeseklista();
    felhasznaloklista();
}
