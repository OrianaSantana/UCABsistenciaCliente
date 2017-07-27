var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var NotificacionesListViewModel = require("./notificaciones-view-model");
var frameModule = require("ui/frame");
var page;
var ls_notificaciones = require('local-storage');
var ls_profesor = require('local-storage');
var BasePage = require("../../../shared/Menu-view-model");


var NotificacionesPage = function() {};
NotificacionesPage.prototype = new BasePage();
NotificacionesPage.prototype.constructor = NotificacionesPage;


var notificacionesList = new NotificacionesListViewModel([]);
var pageData = new observableModule.fromObject({
    notificacionesList: notificacionesList
});

NotificacionesPage.prototype.contentLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    proId = ls_profesor.get('id');
    notificacionesList.vaciarLista();
    notificacionesList.cargarNotificaciones();

//FUNCION DE INSERTAR NOTIFICACIONES AUTOMATICAS CUANDO LLEGUE EL ALERTA AL TELEFONO
   /* var proId = ls_profesor.get('id');

  notificacionesList.InsertarNotificacion(proId /*,mensaje)*/
   /* .catch(function(error) {
            console.log(error);          
            console.log("No PUDO insertar notificacion");
            return Promise.reject();
        })
        .then(function() {
            frameModule.topmost().navigate("views/Menu/home/home");
        });  */

};	


module.exports = new NotificacionesPage();	