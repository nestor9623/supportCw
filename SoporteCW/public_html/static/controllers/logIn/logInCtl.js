"use strict";

/*El use strict hace que se deba codificar de manera correcta, siendo estricto
 * a la hora de compilar el codigo ejemplo: 
 * x = 3.14; // This will cause an error (x is not defined)*/


/* global app */

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlLogIn', function ($scope, $window, logInService) {
    $scope.identificacion = "";
    $scope.logIn = function (form) {
        if (form) {
            logInService.logIn($scope.identificacion).then(function (response) {

                if (response.codigo === 1 && response.type == "Administrador") {
                    console.log(response);
                    sessionStorage.setItem("session", response.type);
                    sessionStorage.setItem("nombre", response.nombre);
                    $window.location.href = 'http://localhost:9999/views/principal.html';
                } else if (response.codigo === 1 && response.type == "Integrante") {
                    console.log(response);
                    sessionStorage.setItem("session", response.type);
                    sessionStorage.setItem("nombre", response.nombre);
                    $window.location.href = 'http://localhost:9999/views/PrincipalIntegrante.html';
                } else {
                    $.notify({
                        //titulo
                        title: '<strong>Error !</strong>',
                        //icono
                        icon: 'glyphicon glyphicon-star',
                        //mensaje
                        message: "Verifique sus credenciales o pongase en contacto con su jefe inmediato!"
                    }, {
                        type: 'danger',
                        animate: {
                            enter: 'animated fadeInUp',
                            exit: 'animated fadeOutRight'
                        },
                        placement: {
                            from: "top",
                            align: "right"
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
                title: '<strong>Verifique</strong>',
                //icono
                icon: 'glyphicon glyphicon-plane',
                //mensaje
                message: "Sus datos de acceso!"
            }, {
                type: 'info',
                animate: {
                    enter: 'animated fadeInUp',
                    exit: 'animated fadeOutRight'
                },
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 5,
                z_index: 1031,
            });
        }
    };

    $scope.registrarUsuarios = function (form) {
        if (form) {
            if ($scope.identificacion.password === $scope.identificacion.repeatpassword) {
                logInService.crearUsuario($scope.identificacion).then(function (response) {

                    if (response.codigo === 1) {
                        alert("El usuario se ha creado con exito");
                        $scope.identificacion = "";
                        $window.location.href = "http://localhost:9999";
                    } else {
                        alert("No se pudo crear el registro");
                        $scope.identificacion = "";
                    }
                });
            } else {
                alert("las password no coinciden!");
            }


        } else {
            alert("Verifique los datos ingresados");
        }
    };

    $(function () {
        $("#boton").on("click", function () {
            $.notify({
                title: '<strong>ASD</strong>',
                icon: 'glyphicon glyphicon-star',
                message: "ASDASD!"
            }, {
                type: 'info',
                animate: {
                    enter: 'animated fadeInUp',
                    exit: 'animated fadeOutRight'
                },
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 5,
                z_index: 1031,
            });
        });
    });


    /*Se define una funcion para agregar*/
    $scope.logOut = function () {
        /*Se eliminan las variables de sesion*/
        sessionStorage.clear();
        /*Redirecciona*/
        $window.location.href = 'http://localhost:9999';
    };
});






