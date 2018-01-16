var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var db = require('./db');
function crearAsesor(entrada, respuesta) {
    var registro = {
        id: entrada.body.id,
        tipodocumento: entrada.body.tipodocumento,
        numerodoc: entrada.body.numerodoc,
        nombre: entrada.body.nombre,
        apellido: entrada.body.apellido,
        email: entrada.body.email,
        pass: entrada.body.pass,
        repeatpassword: entrada.body.repeatpassword
    };

    var sql = "insert into asesores set ?";
    var codigo = 1;
    
    db.query(sql, registro, function (error, resp) {
        if (error) {
            codigo = -1;
        }
        var object = {codigo: codigo};
        object = JSON.stringify(object);
        respuesta.writeHead(200, {'Content-Type': 'application/json'});
        respuesta.end(object);

    });
}

function modificarAsesor(entrada, respuesta) {
    var registro = {
        id: entrada.body.id,
        tipodocumento: entrada.body.tipodocumento,
        numerodoc: entrada.body.numerodoc,
        nombre: entrada.body.nombre,
        apellido: entrada.body.apellido,
        email: entrada.body.email,
        pass: entrada.body.pass,
        repeatpassword: entrada.body.repeatpassword
    };
    var codigo = 1;
    var condicion = {id: entrada.body.id};
    var sql = "update asesores set ? where ?";
    db.query(sql, [registro, condicion], function (error, resp) {
        if (error) {
            codigo = -1;
        }
        var object = {codigo: codigo};
        object = JSON.stringify(object);
        respuesta.writeHead(200, {'Content-Type': 'application/json'});
        respuesta.end(object);
    });
}


function listadoAsesores(entrada, respuesta) {
    var sql = 'select id,tipodocumento,numerodoc,nombre,apellido,email,pass,repeatpassword from asesores';
    db.query(sql, function (error, filas) {
        if (error) {
            console.log('error en el listado');
            return;
        }
        var arreglo = [];
        for (var f = 0; f < filas.length; f++) {
            arreglo.push({id: filas[f].id, tipodocumento: filas[f].tipodocumento, numerodoc: filas[f].numerodoc, nombre: filas[f].nombre, apellido: filas[f].apellido, email: filas[f].email, pass: filas[f].pass, repeatpassword: filas[f].repeatpassword});

        }
        arreglo = JSON.stringify(arreglo);
        respuesta.writeHead(200, {'Content-Type': 'application/json'});
        respuesta.end(arreglo);
    });
}


function buscarProyecto(entrada, respuesta) {

    var nombreBuscar = [entrada.body.nombreBuscar];
    console.log(nombreBuscar);
    //Se manda el codigo en la busqueda

    var sql = 'select nombre,inicio,fin,etapa from proyecto where nombre=? AND usuarioId=?';
    db.query(sql, [nombreBuscar, entrada.body.usuarioId], function (error, filas) {
        if (error) {
            console.log(error);
            return;
        }
        if (filas.length > 0) {
            var object = {codigo: 1, nombre: filas[0].nombre, inicio: filas[0].inicio, fin: filas[0].fin, etapa: filas[0].etapa};
            object = JSON.stringify(object);
            respuesta.writeHead(200, {'Content-Type': 'application/json'});
            respuesta.end(object);
        } else {
            var object = {codigo: -1};
            object = JSON.stringify(object);
            respuesta.writeHead(200, {'Content-Type': 'application/json'});
            respuesta.end(object);
        }



    });
}

function eliminarProyecto(pedido, respuesta) {

    var nombre = pedido.body.nombreBuscar;
    var sql = 'delete from proyecto where nombre=? AND usuarioId=?';
    var codigo = 1;
    db.query(sql, [nombre, pedido.body.usuarioId], function (error, response) {
        if (error) {
            codigo = -1;
        }
        var object = {codigo: codigo};
        object = JSON.stringify(object);
        respuesta.writeHead(200, {'Content-Type': 'application/json'});
        respuesta.end(object);
    });
}


exports.crearAsesor = crearAsesor;
exports.modificarAsesor = modificarAsesor;
exports.listadoAsesores = listadoAsesores;
exports.buscarProyecto = buscarProyecto;
exports.eliminarProyecto = eliminarProyecto;