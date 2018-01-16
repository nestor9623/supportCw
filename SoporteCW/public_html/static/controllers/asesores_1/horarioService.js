"use strict";
app.service('horarioService', function ($http, $httpParamSerializerJQLike) {
    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
     var usuarioId=sessionStorage.getItem("usuarioId");
    
    this.guardarHorario = function (horario) {        
        var promise = $http({
            method: "post",
            url: "/crearHorario",
            data: $httpParamSerializerJQLike({
                id: horario.id,
                asesor: horario.asesor,
                fechainicial: new Date(horario.fechainicial),
                fechafinal: horario.fechafinal,
                jobs: horario.jobs,
                pedidos: horario.pedidos
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            console.log(promise);
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
             console.log(promise);
        });

        /*Luego se retorna la promesa*/
        return promise;
         console.log(promise);
    };
    
    this.modificarHorario = function (horario) {
        var promise = $http({
            method: "post",
            url: "/modificarHorario",
            data: $httpParamSerializerJQLike({
                id: horario.id,
                asesor: horario.asesor,
                fechainicial: horario.fechainicial,
                fechafinal: horario.fechafinal,
                jobs: horario.jobs,
                pedidos: horario.pedidos
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
    this.listarHorario=function(){
        var promise = $http({
            method: "post",
            url: "/listadoHorarios",
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