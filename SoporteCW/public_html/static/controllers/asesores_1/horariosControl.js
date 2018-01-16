"use strict";
app.controller('controladorHorario', function ($scope, $window, horarioService) {
    $scope.horario = "";
    $scope.codigoHorario = "";
    $scope.asesorHorario = "";
    $scope.fechainicialHorario = "";
    $scope.fechafinalHorario = "";
    $scope.jobsHorario = "";
    $scope.pedidosHorario = "";

    $scope.listadoHorarios;
    $scope.crearHorario = function (form) {
        if (form.$valid) {
            horarioService.guardarHorario($scope.horario).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.codigo === 1) {
                    $.notify({
                        //titulo
                        title: '<strong>Correcto !</strong>',
                        //icono
                        icon: 'glyphicon glyphicon-star',
                        //mensaje
                        message: "Se asigno el horario correctamente"
                    }, {
                        type: 'success',
                        animate: {
                            enter: 'animated fadeInUp',
                            exit: 'animated fadeOutRight'
                        },
                        placement: {
                            from: "bottom",
                            align: "center"
                        },
                        offset: 20,
                        spacing: 5,
                        z_index: 1031,
                    });
                    $scope.listarHorarios();
                } else {
                    $.notify({
                        //titulo
                        title: '<strong>Algo va mal !</strong>',
                        //icono
                        icon: 'glyphicon glyphicon-star',
                        //mensaje
                        message: "al parecer el asesor ya se tiene asignado mas de 1 registro"
                    }, {
                        type: 'warning',
                        animate: {
                            enter: 'animated fadeInUp',
                            exit: 'animated fadeOutRight'
                        },
                        placement: {
                            from: "bottom",
                            align: "center"
                        },
                        offset: 20,
                        spacing: 5,
                        z_index: 1031,
                    });
                }
            });
        } else {
            alert("debe diligenciar toda la informacion");
        }
    };
    $scope.modificarHorario = function (form) {
        console.log(form);
        if (form.$valid) {
            horarioService.modificarHorario($scope.horario).then(function (response) {
                if (response.codigo === 1) {
                    $.notify({
                        //titulo
                        title: '<strong>Correcto !</strong>',
                        //icono
                        icon: 'glyphicon glyphicon-star',
                        //mensaje
                        message: "Se actualizaron los datos del asesor"
                    }, {
                        type: 'success',
                        animate: {
                            enter: 'animated fadeInUp',
                            exit: 'animated fadeOutRight'
                        },
                        placement: {
                            from: "bottom",
                            align: "center"
                        },
                        offset: 20,
                        spacing: 5,
                        z_index: 1031,
                    });
                    $scope.listarHorarios();
                } else {
                    $.notify({
                        //titulo
                        title: '<strong>Algo va mal !</strong>',
                        //icono
                        icon: 'glyphicon glyphicon-star',
                        //mensaje
                        message: "No Se actualizaron los datos del asesor"
                    }, {
                        type: 'warning',
                        animate: {
                            enter: 'animated fadeInUp',
                            exit: 'animated fadeOutRight'
                        },
                        placement: {
                            from: "bottom",
                            align: "center"
                        },
                        offset: 20,
                        spacing: 5,
                        z_index: 1031,
                    });
                }
            });
        } else {
           $.notify({
                        //titulo
                        title: '<strong>Error !</strong>',
                        //icono
                        icon: 'glyphicon glyphicon-star',
                        //mensaje
                        message: "Ingrese los datos completos"
                    }, {
                        type: 'danger',
                        animate: {
                            enter: 'animated fadeInUp',
                            exit: 'animated fadeOutRight'
                        },
                        placement: {
                            from: "bottom",
                            align: "center"
                        },
                        offset: 20,
                        spacing: 5,
                        z_index: 1031,
                    });
        }
    };
    $scope.buscarProyecto = function (form) {
        if (form.$valid) {
            /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
             * el cual esta asociado a los input*/
            horarioService.buscar($scope.proyecto).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.codigo === 1) {

                    var obj = {
                        nombre: response.nombre,
                        inicio: new Date(response.inicio),
                        fin: new Date(response.fin),
                        etapa: response.etapa
                    };


                    $scope.asesor = obj;

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
            horarioService.eliminar($scope.asesor).then(function (response) {
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


    $scope.listarHorarios = function () {
        horarioService.listarHorario().then(function (response) {
            var entrada = [];
            for (var i = 0; i < response.length; i++) {
                entrada.push({id: response[i].id, asesor: response[i].asesor, fechainicial:new Date(response[i].fechainicial).toLocaleString(), fechafinal:new Date(response[i].fechafinal).toLocaleString(), jobs: response[i].jobs, pedidos: response[i].pedidos});
            }
            $scope.listadoHorarios = entrada;
        });
    };


    $scope.getSelectedHorario = function () {
        $scope.selected = this.obj;
        $scope.horario = $scope.selected;
        $scope.codigoHorario = $scope.selected.id;
        $scope.asesorHorario = $scope.selected.asesor;
        $scope.fechainicialHorario = $scope.selected.fechainicial;
        $scope.fechafinalHorario = $scope.selected.fechafinal;
        $scope.jobsHorario = $scope.selected.jobs;
        $scope.pedidosHorario = $scope.selected.pedidos;
    };
});







