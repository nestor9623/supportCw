"use strict";
app.controller('controladorAsesor', function ($scope, $window, asesorService) {
    $scope.asesor = "";
    $scope.codigoasesor = "";
    $scope.tipodocumento = "";
    $scope.numerodoc = "";
    $scope.nombreAsesor = "";
    $scope.apellidoAsesor = "";
    $scope.emailAsesor = "";
    $scope.passAsesor = "";
    $scope.pass2Asesor = "";

    $scope.listadoAsesores;
    $scope.crearAsesor = function (form) {
        if (form.$valid) {
            asesorService.guardarAsesor($scope.asesor).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.codigo === 1) {
                    $.notify({
                        //titulo
                        title: '<strong>Correcto !</strong>',
                        //icono
                        icon: 'glyphicon glyphicon-star',
                        //mensaje
                        message: "Se creo el asesor correctamente"
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

                    $scope.asesor = "";
                    $scope.codigoasesor = "";
                    $scope.tipodocumento = "";
                    $scope.numerodoc = "";
                    $scope.nombreAsesor = "";
                    $scope.apellidoAsesor = "";
                    $scope.emailAsesor = "";
                    $scope.passAsesor = "";
                    $scope.pass2Asesor = "";
                    $scope.listarAsesores();
                } else {
                     $.notify({
                        //titulo
                        title: '<strong>Algo va mal !</strong>',
                        //icono
                        icon: 'glyphicon glyphicon-star',
                        //mensaje
                        message: "al parecer el asesor ya se encuentra registrado"
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
    $scope.modificarAsesor = function (form) {
        if (form.$valid) {
            asesorService.modificar($scope.asesor).then(function (response) {
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
                    $scope.asesor = "";
                    $scope.codigoasesor = "";
                    $scope.tipodocumento = "";
                    $scope.numerodoc = "";
                    $scope.nombreAsesor = "";
                    $scope.apellidoAsesor = "";
                    $scope.emailAsesor = "";
                    $scope.passAsesor = "";
                    $scope.pass2Asesor = "";
                    $scope.listarAsesores();
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
                message: "debe ingresar toda la informacion"
            }, {
                type: 'danger',
                animate: {
                    enter: 'animated fadeInUp',
                    exit: 'animated fadeOutRight'
                },
                placement: {
                    from: "bottom",
                    align: "top"
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
            proyectosService.buscar($scope.proyecto).then(function (response) {
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
            proyectosService.eliminar($scope.asesor).then(function (response) {
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


    $scope.listarAsesores = function () {
        asesorService.listar().then(function (response) {
            var entrada = [];
            for (var i = 0; i < response.length; i++) {
                entrada.push({id: response[i].id, tipodocumento: response[i].tipodocumento, numerodoc: response[i].numerodoc, nombre: response[i].nombre, apellido: response[i].apellido, email: response[i].email, pass: response[i].pass, repeatpassword: response[i].repeatpassword});
            }
            $scope.listadoAsesores = entrada;
        });
    };


    $scope.getSelectedAsesor = function () {
        $scope.selected = this.obj;
        $scope.asesor = $scope.selected;
        $scope.codigoasesor = $scope.selected.id;
        $scope.tipodocumento = $scope.selected.tipodocumento;
        $scope.numerodoc = $scope.selected.numerodoc;
        $scope.nombreAsesor = $scope.selected.nombre;
        $scope.apellidoAsesor = $scope.selected.apellido;
        $scope.emailAsesor = $scope.selected.email;
        $scope.passAsesor = $scope.selected.pass;
        $scope.pass2Asesor = $scope.selected.repeatpassword;

    };



});







