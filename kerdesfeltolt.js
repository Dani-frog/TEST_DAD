async function executeInsertQuery(query) {
    const data = { query: query };
    return fetch("http://127.0.0.1:3000/insert", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {
            return Promise.reject("Failed to execute INSERT query");
        }
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            return Promise.reject(response.Error);
        } else {
            return response;
        }
    })
    .catch(function (error) {
        console.error("Error executing INSERT query:", error);
        return Promise.reject(error);
    });
}



async function kerdesfeltolt() {
    const kerdes = document.getElementById("kerdesbox").value;
    var kordinata = document.getElementById("kordinata").textContent;
    //kordinata=parseInt(String(kordinata.value));//ennek a számokkal kéne returnölni eddig annyit tud ez a function h kiírja a nehézséget meg a "koordinátákat" ami most null.
    kordinata = kordinata.replace(/\D/g, " ").trim();
    console.log(kordinata);
    const selectedOption = document.querySelector('input[name="nehezseg"]:checked');
    //console.log(kerdes.length>0,kordinata.length>0,selectedOption.value!=null);
    if (selectedOption!=null && kordinata.length>0 && kerdes.length>0) {
        if (selectedOption) {
            const nszint = selectedOption.value;
            
            console.log("Kiválasztott nehézség:", nszint);
          } else {
            console.log("Nincs nehézség kiválasztva");
            const response = await executeInsertQuery(
                 "INSERT INTO terkep VALUES (NULL, '"+kerdes+"', '"+nszint+"', '"+kordinata+"')"
                );
          }
    }
    else{
        console.log("Nem minden lett megfelelően kitöltve, kiválasztva!")
    }
    
    //INSERT INTO table_name (column1, column2, column3, ...)
    //VALUES (value1, value2, value3, ...);
}