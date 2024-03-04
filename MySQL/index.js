const express = require('express');
const app = express();

const cors = require("cors");
const bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(cors());

var getConnection = ()=>{
    return mysql.createConnection({
        host     : "localhost",
        user     : "root",
        password : "",
        database : "filmek"
    })
};

app.get('/', function(req, res){
    const connection = getConnection();
    let joe = true;
    connection.connect((err)=>{
        if(err) {
            res.send({"Error": "Nem jött létre a kapcsolat az adatbázissal."});
            joe = false;
        }
    });
    if(joe) {
        connection.query('show tables', function (error, results, fields) {
            res.send(results);
        });              
    }
    connection.end();        
});

app.post("/lekerdezes", bodyParser.json(), function(req,res){
    var connection = getConnection();
    connection.connect();
    const lekerdezes = req.body.lekerdezes;

    connection.query(lekerdezes, function(err, result,fields){
        if(!err){
            res.send(result);
        }else{
            res.send({"Error": 'A lekérdezés nem hozott eredményt!'});
        }
    })
    connection.end();
});

app.listen(3000);


/*
CREATE TABLE felhasznalo (
	id int not null AUTO_INCREMENT,
	nev varchar(50) not null,
	password varchar(100) not null,
    CONSTRAINT pk_felhasznalo PRIMARY KEY(id)
);

INSERT into felhasznalo VALUES(null, "szab.eman","alma");

alter TABLE foglalas add COLUMN felhasznaloid int not null;

update foglalas set felhasznaloid = 1 WHERE felhasznaloid = 0;



alter table foglalas add column id int not null ;
update foglalas set id = 1 where oszlop=5;
update foglalas set id = 2 where oszlop=6;
alter table foglalas add constraint pk_foglalas primary key(id);
alter table foglalas modify id int not null auto_increment;

alter table foglalas add constraint fk_foglals_film foreign key (filmid) references film(id);

alter table foglalas add constraint fk_foglals_felhasznalo foreign key (felhasznaloid) references felhasznalo(id);
*/