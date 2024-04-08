console.log(bejelentkezve)
const terkep = document.getElementById("terkep");
const ctxTerkep = terkep.getContext("2d");
const terkepKep = document.createElement("img");
terkep.height = 500;
terkep.width = 800;
terkepKep.src="Kepek/highqualitybighungary.jpg";

function tortaRajz(img,ctx,canvas,szel,mag) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imageX = (canvasWidth - szel)/2; // Center X
    const imageY = (canvasHeight - mag)/2; // Center Y
    ctx.drawImage(img, imageX, imageY,szel,mag);
}

terkepKep.onload = function(){
    console.log("asd")
    tortaRajz(terkepKep,ctxTerkep,terkep,800,500);
}

// Event listener for mouse click on canvas
terkep.addEventListener('click', function(event) {
    const rect = terkep.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("Mouse clicked at (x:", x, ", y:", y, ")");
});
