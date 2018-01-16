"use strict";
app.controller('controladorEmpresas', function ($scope, $window, empresasService) {

    $scope.proyecto = "";
    $scope.etapas = [
        {opcion: "0%-25%"},
        {opcion: "25%-50%"},
        {opcion: "50%-75%"},
        {opcion: "75%-100%"}
    ];
    $scope.listadoEmpresas;
    $scope.crearProyecto = function (form) {

        if (form.$valid) {

            proyectosService.guardar($scope.proyecto).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.codigo === 1) {
                    alert("PROYECTO REGISTRADO!");

                    $scope.proyecto = "";
                    $scope.listarProyectos();
                } else {
                    alert("EL PROYECTO YA SE ENCUENTRA REGISTRADO!");
                }


            });
        } else {
            alert("debe diligenciar toda la informacion");
        }



    };
    $scope.modificarProyecto = function (form) {



        if (form.$valid) {

            /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
             * el cual esta asociado a los input*/
            proyectosService.modificar($scope.proyecto).then(function (response) {
                if (response.codigo === 1) {
                    alert("DATOS MODIFICADOS CON EXITO!");
                    $scope.proyecto = "";
                    $scope.listarProyectos();

                } else {
                    alert("ERROR AL MODIFICAR LOS DATOS");
                }
            });
        } else {
            alert("debe diligenciar toda la informacion!");
        }
    };
    $scope.buscarProyecto = function (form) {



        if (form.$valid) {
            /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
             * el cual esta asociado a los input*/
            proyectosService.buscar($scope.proyecto).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.codigo === 1) {

                    var obj = {
                        nombre: response.nombre,
                        inicio: new Date(response.inicio),
                        fin: new Date(response.fin),
                        etapa: response.etapa
                    };


                    $scope.proyecto = obj;

                } else {
                    alert("NO DATA FOUND!");
                }


            });
        } else {
            alert("debe ingresar un nombre a buscar");
        }
    };
    $scope.eliminarProyecto = function (form) {



        if (form.$valid) {
            /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
             * el cual esta asociado a los input*/
            proyectosService.eliminar($scope.proyecto).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.codigo === 1) {
                    alert("EXITO");

                    $scope.listarProyectos();

                } else {
                    alert("ERROR!");
                }

            });
        } else {
            alert("debe ingresar un nombre a buscar!");
        }
    };


    $scope.listarEmpresas = function () {
        empresasService.listar().then(function (response) {
            var entrada = [];
            for (var i = 0; i < response.length; i++) {
                entrada.push({id: response[i].id,nombre: response[i].nombre, servidor: response[i].servidor, basedatos: response[i].basedatos, etapa: response[i].etapa});
            }
            $scope.listadoEmpresas = entrada;

        });
    };


    $scope.getSelectedRow = function () {
        $scope.selected = this.obj;
        $scope.proyecto = $scope.selected;
        $scope.proyecto.nombreBuscar = $scope.selected.nombre;
    };



});







