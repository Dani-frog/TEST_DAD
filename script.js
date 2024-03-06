const AdatbazisEleres = ()=>{
    fetch("http://127.0.0.1:3000")
    .then(function (response) {
        if (!response.ok) {
            alert("Nem jó válasz érekezett az adatbázisból");
            return Promise.reject("Nem jó válasz érekezett az adatbázisból");
        }
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
                alert(response.Error);
                console.log(response.Error);
        } else {
            alert("Az adatbázis kapcsolat él, az adatokat eléri.");
            console.log("Táblák");
            response.forEach(element => {
                console.log(element);
            });
        }
    });
}

AdatbazisEleres();



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
                    // document.getElementById("bejelentkezesmodal").hide()
                    let fnS=document.getElementById("fnShow");
                    localStorage.setItem("nev",response[0].nev);
                    localStorage.setItem("admin",response[0].admin);
                    // location.reload();
                    fnS.innerHTML="Felhasznló: "+localStorage.getItem("nev");
                    if (response[0].jog==1) {
                        fnS.innerHTML+=" (admin)";
                    }
                    
                } else {
                    console.log("Több vagy kevesebb, mint egy 1 értékkel tért vissza!");
                }
            });
    
        }); 
    } else {
        console.log("Hibás karaktereket tartalmaz a felhasználónév vagy a jelszó!")
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
function erosAJelszo(pw,fn){

    const kisbetu = /[a-z]/
    const nagybetu = /[A-Z]/
    const szam = /[0-9]/
    const speci = /\.\_/
    if (kisbetu.test(pw)
        && nagybetu.test(pw)
        && szam.test(pw)
        && speci.test(pw) 
        && !pw.includes(fn)) {
        console.log("nem jó")
        return false;
    }

    for (let i = 0; i < pw.length-2; i++) {
        if (pw[i].charCodeAt()+1 == pw[i +1].charCodeAt()&&
            pw[i+1].charCodeAt()+1 == pw[i +2].charCodeAt()) {
            return false;
        }
    }

    return true;
}
function infoHozzaad(uzi, info, regBtn) {
    info.innerHTML+=uzi;
    regBtn.disabled=false;    
}

function fnEllenoriz(fn) {
    if (!fn.checkValidity()) {
        return [false, "A felhasználónév nem helyes!"];
    } else {
        console.log("select count(*) as darab from felhasznalo where nev='"+fn.value+"'");
        LekerdezesEredmenye(
            "select count(*) as darab from felhasznalo where nev='"+fn.value+"'"
        ).then((response)=> {
            if (response[0].darab!=0) {
                return [false, " Már regisztráltak ilyen fn-nel!"];
            }
        });   
    }
    return [true,""];
}

async function emailEllenoriz(email) {      
    console.log(email.checkValidity(), email);  
    if (!email.checkValidity()) {
        return [false, "Az emailcím nem helyes!"];
    } else {
        console.log("select count(*) as darab from felhasznalo where email='" + email.value + "'");
        
        try {
            const response = await LekerdezesEredmenye("select count(*) as darab from felhasznalo where email='" + email.value + "'");
            console.log(response);
            console.log(response[0].darab);
            console.log(response[0].darab != 0);
            if (response[0].darab != 0) {
                console.log("bent vagy?");
                return [false, "Már regisztráltak ilyen emaillel!"];
            }
        } catch (error) {
            console.error(error);
            return [false, "Hiba történt az adatbázis lekérdezése során."];
        }
    }
    return [true, ""];
}

function pwEllenoriz(pw,pwre) {
    if (pw.value!=pwre.value) {
        return [false," A két jelszó nem egyezik!"];
    }
    if (!pw.checkValidity() && !erosAJelszo(pw.value, fn.value)) {
        return [false," A jelszó túl gyenge!"];
    }
    return [true,""];
}

function regisztracio() {
    const regBtn=document.getElementById("regBtn");
    const fn=document.getElementById("regfn");
    const info=document.getElementById("info");
    const email=document.getElementById("regemail");
    const pw=document.getElementById("regpw");
    const pwre=document.getElementById("regpwre");
    regBtn.disabled=true;
    info.innerHTML="";

    const fnEll=fnEllenoriz(fn);
    infoHozzaad(fnEll[1],info,regBtn);
    let joe=fnEll[0];

    const emailEll=emailEllenoriz(email);
    console.log(emailEll)
    infoHozzaad(emailEll[1],info,regBtn);
    joe=emailEll[0]&& joe;

    const pwEll=pwEllenoriz(pw,pwre);
    infoHozzaad(pwEll[1],info,regBtn);
    joe=pwEll[0]&& joe;

    if (joe) {
        hash(pw.value).then((hex) => {
            LekerdezesEredmenye(
                "INSERT INTO felhasznalo VALUES (NULL, '"+fn.value+"', '"+hex+"', '"+email.value+"',  '0');"
            ).then((response)=> {
                console.log("feltöltve");
            });  
        });
    }

}