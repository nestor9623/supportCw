/*global __dirname*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
var formidable = require('formidable');
var db = require('./static/dao/db');
var login = require('./static/dao/daoLogin');
var empresa = require('./static/dao/daoEmpresas');
var asesores = require('./static/dao/daoAsesores');
var horario = require('./static/dao/daoHorario');
var server;



function configurarServidor() {
    
    app.use(express.static(__dirname+'/static'));
    server=app.listen(9999,function(){
       console.log("servidor web iniciado!"); 
    });
    
}

app.post('/login',function(entrada,respuesta){
    login.validar(entrada,respuesta);
});
app.post('/registrousuario',function(entrada,respuesta){
    login.registrarUsuario(entrada,respuesta);
});
app.post('/listadoEmpresas',function(entrada,respuesta){
    empresa.listadoEmpresas(entrada,respuesta);
});
app.post('/listadoAsesores',function(entrada,respuesta){
    asesores.listadoAsesores(entrada,respuesta);
});
app.post('/modificarAsesores',function(entrada,respuesta){
    asesores.modificarAsesor(entrada,respuesta);
});

app.post('/crearAsesor',function(entrada,respuesta){
    asesores.crearAsesor(entrada,respuesta);
});

app.post('/listadoHorarios',function(entrada,respuesta){
    horario.listadoHorarios(entrada,respuesta);
});
app.post('/modificarHorario',function(entrada,respuesta){
    horario.modificarHorario(entrada,respuesta);
});
app.post('/crearHorario',function(entrada,respuesta){
    horario.crearHorario(entrada,respuesta);
});


exports.configurarServidor = configurarServidor;

