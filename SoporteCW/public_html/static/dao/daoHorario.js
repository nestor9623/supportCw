var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var db = require('./db');
function crearHorario(entrada, respuesta) {
    var registro = {
        id: entrada.body.id,
        asesor: entrada.body.asesor,
        fechainicial: entrada.body.fechainicial,
        fechafinal: entrada.body.fechafinal,
        jobs: entrada.body.jobs,
        pedidos: entrada.body.pedidos
    };

    var sql = "insert into horarios set ?";
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

function modificarHorario(entrada, respuesta) {
    var registro = {
        id: entrada.body.id,
        asesor: entrada.body.asesor,
        fechainicial: entrada.body.fechainicial,
        fechafinal: entrada.body.fechafinal,
        jobs: entrada.body.jobs,
        pedidos: entrada.body.pedidos
    };
    var codigo = 1;
    var condicion = {id: entrada.body.id};
    var sql = "update horarios set ? where ?";
    db.query(sql, [registro, condicion], function (error, resp) {
        console.log(registro);
        if (error) {
            codigo = -1;
        }
        var object = {codigo: codigo};
        object = JSON.stringify(object);
        respuesta.writeHead(200, {'Content-Type': 'application/json'});
        respuesta.end(object);
    });
}


function listadoHorarios(entrada, respuesta) {
    var sql = 'select id,asesor,fechainicial,fechafinal,jobs,pedidos from horarios';
    db.query(sql, function (error, filas) {        
        if (error) {
            console.log('error en el listado');
            return;
        }
        var arreglo = [];
        for (var f = 0; f < filas.length; f++) {
            arreglo.push({id: filas[f].id, asesor: filas[f].asesor, fechainicial: filas[f].fechainicial, fechafinal: filas[f].fechafinal, jobs: filas[f].jobs, pedidos: filas[f].pedidos});
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


exports.crearHorario = crearHorario;
exports.modificarHorario = modificarHorario;
exports.listadoHorarios = listadoHorarios;
exports.buscarProyecto = buscarProyecto;
exports.eliminarProyecto = eliminarProyecto;