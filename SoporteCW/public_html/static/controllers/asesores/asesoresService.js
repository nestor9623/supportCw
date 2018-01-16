"use strict";
app.service('asesorService', function ($http, $httpParamSerializerJQLike) {
    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
     var usuarioId=sessionStorage.getItem("usuarioId");
    
    this.guardarAsesor = function (asesor) {        
        var promise = $http({
            method: "post",
            url: "/crearAsesor",
            data: $httpParamSerializerJQLike({
                id: asesor.id,
                tipodocumento: asesor.tipodocumento,
                numerodoc: asesor.numerodoc,
                nombre: asesor.nombre,
                apellido: asesor.apellido,
                email: asesor.email,                
                pass: asesor.pass,
                repeatpassword: asesor.repeatpassword
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };
    
    this.modificar = function (asesor) {
        var promise = $http({
            method: "post",
            url: "/modificarAsesores",
            data: $httpParamSerializerJQLike({
                id: asesor.id,
                tipodocumento: asesor.tipodocumento,
                numerodoc: asesor.numerodoc,
                nombre: asesor.nombre,
                apellido: asesor.apellido,
                email: asesor.email,                
                pass: asesor.pass,
                repeatpassword: asesor.repeatpassword
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };
    this.eliminar = function (proyecto) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        
        
        
        var promise = $http({
            method: "post",
            url: "/eliminarProyecto",
            data: $httpParamSerializerJQLike({
                
                nombreBuscar: proyecto.nombreBuscar,
                usuarioId:usuarioId}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };
    this.buscar = function (proyecto) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        
        
        
        
        var promise = $http({
            method: "post",
            url: "/buscarProyecto",
            data: $httpParamSerializerJQLike({
                
                nombreBuscar: proyecto.nombreBuscar,
                usuarioId:usuarioId
               }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };
    this.listar=function(){
        var promise = $http({
            method: "post",
            url: "/listadoAsesores",
            data: $httpParamSerializerJQLike({
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };
});