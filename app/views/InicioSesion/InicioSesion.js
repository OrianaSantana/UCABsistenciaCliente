var createViewModel = require("./InicioSesion-view-model").createViewModel;
var frameModule = require("ui/frame");
var application = require("application");
var utils = require("utils/utils");
var services = require("../../service-helper");
var tnsOAuthModule = require('nativescript-oauth');

var ls_correo = require('local-storage');
var ls_profesor = require('local-storage');
//var ls_idprofesor = require('local-storage');
var ls_horario = require('local-storage');
var dialogsModule = require("ui/dialogs");
var ls_validator = require('local-storage');
//var LocalNotifications = require("nativescript-local-notifications");

var user;

exports.loaded = function(args) {
    var count = 1;
    if (count>0)
    {
        console.log("UCABsistencia Inicio");
        var page = args.object;
        //LocalNotifications.requestPermission().then((granted) => {
            //if(granted) {
                    user = createViewModel();  
                    page.bindingContext = user;
                    user.set("isLoading", false); 
                    ls_validator('validar', 0);        
            //}
        //})
     }

  /*var hardwareDisponible;
  var magnetometer;
  var gps;
  var packageManager = application.android.context.getPackageManager();

  hardwareDisponible = packageManager.getSystemAvailableFeatures();
    

    for (i=0; i< hardwareDisponible.length; i++){ 

        if (hardwareDisponible[i].name == 'android.hardware.sensor.compass') {
            magnetometer = true;
            console.log("Su dispositivo tiene magnetometro?:" + " " + magnetometer);

        } else {
            magnetometer = false;
        }
        
        if (hardwareDisponible[i].name == 'android.hardware.location.gps') {
            gps = true;
            console.log("Su dispositivo tiene gps?:" + " " + gps);
        } else {
            gps = false;
        }
    }*/

};

exports.IniciarSesion = function() {
   //console.log(ls.get('foo'));

user.set("isLoading", true);

/*tnsOAuthModule.login()
      .catch(function(error) {
            console.log(error);
            console.log("Error en el token");
            return Promise.reject();
        })
        .then(function() {
         console.dir("accessToken " + tnsOAuthModule.accessToken());
        }); */

   user.consultarProfesorID()
        .catch(function(error) {            
            dialogsModule.alert({
                message: "No se pudo encontrar el profesor que busca",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function(respuesta1) {          
           console.log("RESPUESTA profesor " + respuesta1.pro_id);
           console.log("Status conexion " + respuesta1.pro_foto); 
           ls_profesor('profesor', respuesta1.pro_primer_nombre);
           ls_profesor('id', respuesta1.pro_id);
           ls_correo('correo',respuesta1.pro_correo_nombre_usuario);
           
           var id =  respuesta1.pro_id;
           if (respuesta1.pro_foto == "off"){
               user.validarSesion(respuesta1.pro_id)
                    .catch(function(error) {
                            console.log(error);
                            dialogsModule.alert({
                                message: "No se pudo actualizar su status",
                                okButtonText: "OK"
                            });
                            console.log("No PUDO ACTUALIZAR STATUS");
                            return Promise.reject();
                        })
                        .then(function() {
                            console.log("status ACTUALIZADO");                                   
                            user.consultarHorario(respuesta1.pro_id)
                                .catch(function(error) {  
                                    console.log("CAtch de la funtion consultar horario");        
                                    dialogsModule.alert({
                                        message: "No se pudo encontrar el horario del profesor que busca",
                                        okButtonText: "OK"
                                    });
                                    console.log("No condiguio horario iniciosesionjs");
                                    return Promise.reject();
                                })
                                .then(function(respuesta1) {            
                                /*console.log("RESPUESTA  "+ respuesta1[0].hor_catedra + " " + respuesta1[1].hor_catedra + " " + respuesta1[2].hor_catedra + " " + respuesta1[3].hor_catedra + " " + respuesta1[4].hor_catedra +
                                " "+ respuesta1[5].hor_catedra);*/
                            ls_horario('horario_profesor', respuesta1); 
                                var navigationOptions= {
                                    moduleName:'views/Menu/home/home',
                                    context:{ 
                                                horario: respuesta1, 
                                                profesor: id 
                                    }
                                }                                       
                                    frameModule.topmost().navigate(navigationOptions);   
                                  services.setupAlarm(utils.ad.getApplicationContext());
                                   user.set("isLoading", false);                                  
                                });
                    });  
           }else if(respuesta1.pro_foto == "on"){
                    dialogsModule.alert({
                    message: "Usted tiene una sesión abierta",
                    okButtonText: "OK"
                  });
           }         
        });
    /*user.consultarHorario()
        .catch(function(error) {
            console.log("CAtch de la funtion consultar horario");            
            dialogsModule.alert({
                message: "No se pudo encontrar el horario del profesor que busca",
                okButtonText: "OK"
            });
             console.log("CAtch de la funtion consultar horario");
            return Promise.reject();
        })
        .then(function(respuesta1) {            
          /* console.log("RESPUESTA  "+ respuesta1[0].hor_catedra + " " + respuesta1[1].hor_catedra + " " + respuesta1[2].hor_catedra + " " + respuesta1[3].hor_catedra + " " + respuesta1[4].hor_catedra +
          " "+ respuesta1[5].hor_catedra);*/
          ///console.log("RESPUESTA  "+ respuesta1[0].hor_catedra + " " + respuesta1[1].hor_catedra + " " + respuesta1[2].hor_catedra);
           /*var navigationOptions= {
               moduleName:'views/Menu/home/home',
               context:{ 
                        horario: respuesta1
               }
           }
            frameModule.topmost().navigate(navigationOptions);   
             console.log("TOPMOST");         
        }); */

};