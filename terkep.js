console.log(bejelentkezve)
const terkep = document.getElementById("terkep");
const ctxTerkep = terkep.getContext("2d");
const terkepKep = document.createElement("img");
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
    const rect = terkep.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("Mouse clicked at (x:", x, ", y:", y, ")");
    var kordinataDiv = document.getElementById("kordinata");
    if (kordinataDiv) {
        kordinataDiv.innerHTML = "Mouse clicked at (x:"+ x+ ", y:"+ y+ ")";
    }
});

var kerdesektomb = [
    {
      id: "konnyu",
      name: 'Könnyű kérdés'
    },
    {
        id: "konnyu",
        name: 'Könnyű kérdés2'
      },
      {
        id: "konnyu",
        name: 'Könnyű kérdés3'
      },
      {
        id: "konnyu",
        name: 'Könnyű kérdés4'
      },
    {
      id: "kozepes",
      name: 'Közepes kérdés'
    },
    {
      id: "nehez",
      name: 'Nehéz kérdés'
    }
  ]

//
//SHUFFLE
//



function nehezseg(btn) {
    const gombok =document.getElementsByClassName("gombok")
    for (let index = 0; index < gombok.length; index++) {
        gombok[index].innerHTML = "";
        
    }
    if (btn.value == "Könnyű") {
        console.log(btn.value);
        var mondatkerdes = kerdesektomb.find(obj => obj.id == "konnyu");
        for (let index = 0; index < gombok.length; index++) { gombok[index].innerHTML = mondatkerdes.name ; }
    }
    
    else if (btn.value == "Közepes") {
        console.log(btn.value);
        var mondatkerdes  = kerdesektomb.find(obj => obj.id == "kozepes");
        for (let index = 0; index < gombok.length; index++) { gombok[index].innerHTML = mondatkerdes.name ; }
    }
    else if (btn.value == "Nehéz") {
        console.log(btn.value);
        var mondatkerdes  = kerdesektomb.find(obj => obj.id == "nehez");
        for (let index = 0; index < gombok.length; index++) { gombok[index].innerHTML = mondatkerdes.name; }
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

    if (match) {
        const x = parseFloat(match[1]);
        const y = parseFloat(match[2]);
        koordinata = match[1]+";"+match[2];
        console.log(koordinata)
        console.log("x:", x);
        console.log("y:", y);
    } else {
        alert("Nincs megadva koordináta!");
    }
    const selectedOption = document.querySelector('input[name="nehezseg"]:checked')
    let nszint;
    if (selectedOption) {
        nszint = selectedOption.value;

        console.log("Kiválasztott nehézség:", nszint);
      } else {
        console.log("Nincs nehézség kiválasztva");
    }
    const query = "insert into terkep VALUES(NULL, '"+kerdes+"','"+nszint+"','"+koordinata+"')"
    console.log(query)
    const response = LekerdezesEredmenye(query);
    console.log(response)
}