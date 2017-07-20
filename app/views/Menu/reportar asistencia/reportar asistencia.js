var BasePage = require("../../../shared/Menu-view-model");
var createViewModel = require("./reportar asistencia-view-model").createViewModel;
var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var ls_id = require('local-storage');
var horId;
//var LocalNotifications = require("nativescript-local-notifications");

var ReportePage = function() {};
ReportePage.prototype = new BasePage();
ReportePage.prototype.constructor = ReportePage;
// Place any code you want to run when the Agregar rol page loads here.
ReportePage.prototype.contentLoaded = function(args) {
       // LocalNotifications.requestPermission().then((granted) => {
           // if(granted) {
                    //console.log("Permission granted? " + granted);
                    console.log("Content reportar asistencia");
	                var page = args.object;
                    reporte = createViewModel();
                    page.bindingContext = reporte;
           // }
       // })   
   // var prueba = false;

   //CODIGO ASISTENCIA E INASISTENCIA AUTOMATICA - NO BORRAR

  /* if (prueba == true) {
        var id = 33;
        reporte.asistenciaAutomatica(id)
      .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "No se pudo reportar la asistencia automatica",
                okButtonText: "OK"
            });
            console.log("No PUDO REPORTAR ASISTENCIA automatica");
            return Promise.reject();
        })
        .then(function() {
            dialogsModule.alert({
                message: "Asistencia Automática reportada exitosamente.",
                okButtonText: "OK"
            });
        });
        
    } else if (prueba == false) {
        var id = 33;
        reporte.inasistencia(id)
      .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "No se pudo reportar la inasistencia",
                okButtonText: "OK"
            });
            console.log("No PUDO REPORTAR ASISTENCIA inasistencia");
            return Promise.reject();
        })
        .then(function() {
            dialogsModule.alert({
                message: "Inasistencia reportada exitosamente.",
                okButtonText: "OK"
            });
        });

    }
    */
 
}

ReportePage.prototype.ReportarAsistenciaTap = function() {
    //opcion 1
    console.log("reportar asistencia tap");
    horId = ls_id.get('horario-id');
    console.log("horID "+horId);
   //reporte.ReportarAsistenciaManual (page.get('messageJustificacion'),page.get('JustificacionEscrita'),page.get('observacion'),horId)
   //validar si se hace page.get o page.getViewById("id").text en cada variable que se quiere obtener
   //en vez de horId podemos pasar directamente la local storage
   //no tengo claro si a la funcion se le pasa algo o no, ya que deberia no pasarsele nada y el solito hacer el get en el viewModel
   //creo que puede ir sin pasarsele absolutamente nada, solo habria que pasarle el id del horario que es lo unico que no existe en la pagina

   //opcion 2   
   reporte.ReportarAsistenciaManual(horId)   
     .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "No se pudo reportar la asistencia",
                okButtonText: "OK"
            });
            console.log("No PUDO REPORTAR ASISTENCIA");
            return Promise.reject();
        })
        .then(function() {
            /* dialogsModule.alert({
                message: "Asistencia reportada exitosamente.",
                okButtonText: "OK"
            });*/
            frameModule.topmost().navigate("views/Menu/home/home");
        });
}

ReportePage.prototype.CancelarReporte = function() {
    frameModule.topmost().navigate("views/Menu/home/home");
}



module.exports = new ReportePage();