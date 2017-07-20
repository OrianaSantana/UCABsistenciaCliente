var createViewModel = require("./InicioSesion-view-model").createViewModel;
var frameModule = require("ui/frame");

var ls_correo = require('local-storage');
var ls_profesor = require('local-storage');
//var ls_idprofesor = require('local-storage');
var ls_horario = require('local-storage');
var dialogsModule = require("ui/dialogs");
var ls_validator = require('local-storage');

var user;

exports.loaded = function(args) {
    var count = 1;
    if (count>0)
    {
        console.log("UCABsistencia Inicio");
        var page = args.object;
        user = createViewModel();  
        page.bindingContext = user;
        ls_validator('validar', 0);
    }
};
exports.IniciarSesion = function() {
   //console.log(ls.get('foo'));

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
           ls_profesor('profesor', respuesta1.pro_primer_nombre);
           ls_profesor('id', respuesta1.pro_id);
           ls_correo('correo',respuesta1.pro_correo_nombre_usuario);
           
           var id =  respuesta1.pro_id;

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
                    });           
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