const AdatbazisEleres = ()=>{
    fetch("http://127.0.0.1:3000")
    .then(function (response) {
        if (!response.ok) {
            //alert("Nem jó válasz érekezett az adatbázisból");
            console.log("Nem jó válasz érekezett az adatbázisból");
            return Promise.reject("Nem jó válasz érekezett az adatbázisból");
        }
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
                //alert(response.Error);
                console.log(response.Error);
        } else {
            //alert("Az adatbázis kapcsolat él, az adatokat eléri."); 
            console.log("Az adatbázis kapcsolat él, az adatokat eléri.");
            console.log("Táblák");
            response.forEach(element => {
                console.log(element);
            });
        }
    });
}

AdatbazisEleres();

var bejelentkezve = false;

async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
}

function login() {
    const fn=document.getElementById("fn").value;
    const pw=document.getElementById("pw").value;

    const regExp=/[a-zA-Z0-9\.\_]{3,16}$/;
    if (regExp.test(fn) && regExp.test(pw)) {       
        hash(pw).then((hex) => {
            console.log(hex);
            console.log("select * from felhasznalo where nev='"+fn+"' and jelszo='"+hex+"'");
            LekerdezesEredmenye(
                "select * from felhasznalo where nev='"+fn+"' and jelszo='"+hex+"'"
            ).then((response)=> {
                console.log(response)
                if (response.length==1) {
                    let fnS=document.getElementById("fnShow");
                    localStorage.setItem("nev",response[0].nev);
                    console.log(response)
                    localStorage.setItem("admin",response[0].admin);
                    location.reload();
                    
                } else {
                    const uzenet = document.getElementById("loginhibauzenet");
                    uzenet.innerHTML = "Hibás karaktereket tartalmaz a felhasználónév vagy a jelszó!";
                    console.log("Több vagy kevesebb, mint egy 1 értékkel tért vissza!");
                }
            });
    
        }); 
    } else {
        const uzenet = document.getElementById("loginhibauzenet");
        uzenet.innerHTML = "Hibás karaktereket tartalmaz a felhasználónév vagy a jelszó!";
        console.log("Hibás a felhasználónév vagy a jelszó!")
    }
}


const LekerdezesEredmenye = (lekerdezes) => {
    const data = { lekerdezes: lekerdezes };
    return fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {
            // alert("Nem jó válasz érekezett az adatbázisból");
            return Promise.reject("Nem jó válasz érekezett az adatbázisból");
        }
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            // alert(response.Error);
            return response.Error;
        } else {
            return response;
        }
    });
}
function erosAJelszo(pw, fn) {
    const kisbetu = /[a-z]/
    const nagybetu = /[A-Z]/
    const szam = /[0-9]/
    const speci = /[^a-zA-Z0-9]/ // Matches any special character
    if (!(kisbetu.test(pw) && nagybetu.test(pw) && szam.test(pw) && speci.test(pw) && !pw.includes(fn))) {
        console.log("nem jó")
        return false;
    }

    for (let i = 0; i < pw.length - 2; i++) {
        if (pw.charCodeAt(i) + 1 === pw.charCodeAt(i + 1) && pw.charCodeAt(i + 1) + 1 === pw.charCodeAt(i + 2)) {
            console.log("nem jó")
            return false;
        }
    }

    console.log("jó")
    return true;
}

// Test
erosAJelszo("Abc123.", "John"); // Output: true

function infoHozzaad(uzi, info, regBtn) {
    if (uzi!="") {
        info.innerHTML+="<p>"+uzi+"</p>";
        regBtn.disabled=false;  
    }
}

async function fnEllenoriz(fn) {
    if (!fn.checkValidity()) {
        return [false, "A felhasználónév nem helyes!"];
    } else {
        console.log("select count(*) as darab from felhasznalo where nev='"+fn.value+"'");
        const response = await LekerdezesEredmenye(
            "select count(*) as darab from felhasznalo where nev='"+fn.value+"'"
        );
        if (response[0].darab !== 0) {
            return [false, "Már regisztráltak ilyen fn-nel!"];
        }
    }
    return [true, ""];
}
function logout(){
    localStorage.clear();
    location.reload();
}

async function emailEllenoriz(email) {      
    console.log(email.checkValidity(), email);  
    if (!email.checkValidity()) {
        return [false, "Az emailcím nem helyes!"];
    } else {
        console.log("select count(*) as darab from felhasznalo where email='" + email.value + "'");
        
        try {
            const response = await LekerdezesEredmenye("select count(*) as darab from felhasznalo where email='" + email.value + "'");
            if (response[0].darab != 0) {
                return [false, "Már regisztráltak ilyen emaillel!"];
            }
        } catch (error) {
            console.error(error);
            return [false, "Hiba történt az adatbázis lekérdezése során."];
        }
    }
    return [true, ""];
}

async function pwEllenoriz(pw,pwre) {
    if (pw.value!=pwre.value) {
        return [false," A két jelszó nem egyezik!"];
    }
    if (!pw.checkValidity() && !erosAJelszo(pw.value, fn.value)) {
        return [false," A jelszó túl gyenge!"];
    }
    return [true,""];
}

async function regisztracio() {
    const regBtn = document.getElementById("regBtn");
    const fn = document.getElementById("regfn");
    const info = document.getElementById("regInfo");
    const email = document.getElementById("regemail");
    const pw = document.getElementById("regpw");
    const pwre = document.getElementById("regpwre");
    regBtn.disabled = true;
    info.innerHTML = "";
    let joe = true;

    const pwEll = await pwEllenoriz(pw, pwre);
    infoHozzaad(pwEll[1], info, regBtn);
    joe = pwEll[0] && joe;

    const fnEll = await fnEllenoriz(fn);
    infoHozzaad(fnEll[1], info, regBtn);
    joe = fnEll[0] && joe;

    const emailEll = await emailEllenoriz(email);
    infoHozzaad(emailEll[1], info, regBtn);
    joe = emailEll[0] && joe;

    if (joe) {
        const hex = await hash(pw.value);
        const response = await LekerdezesEredmenye(
            "INSERT INTO felhasznalo VALUES (NULL, '"+fn.value+"', '"+hex+"', '"+email.value+"',  '0');"
        );
        localStorage.nev = fn.value;
        localStorage.admin = 0;
        console.log("feltöltve");
        location.reload();
    }
}

function marBevanEJelentkezve(){
    // localStorage.clear();
    if(localStorage.length == 0){
        document.getElementById("login").style.display = "block";
        document.getElementById("admin").innerHTML = "";
        document.getElementById("normal").innerHTML = "";

        bejelentkezve = false;
        
    }
    else if(localStorage.admin == 1){
        document.getElementById("admin").style.display = "block";
        document.getElementById("normal").innerHTML = "";
        document.getElementById("login").innerHTML = "";
        bejelentkezve = true;

    }
    else{
        document.getElementById("normal").style.display = "block";
        document.getElementById("login").innerHTML = "";
        document.getElementById("admin").innerHTML = "";
        bejelentkezve = true;

    }
}
marBevanEJelentkezve();