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

function nehezseg(btn) {
    const gombok =document.getElementsByClassName("gombok")
    for (let index = 0; index < gombok.length; index++) {
        gombok[index].innerHTML = "";
        
    }
    if (btn.value == "Könnyű") {
        console.log(btn.value);
    }
    
    else if (btn.value == "Közepes") {
        console.log(btn.value);
    }
    else if (btn.value == "Nehéz") {
        console.log(btn.value);
    }
    else{console.log("NEMJÓ");}
}