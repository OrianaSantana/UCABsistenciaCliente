var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var ConsultarAsistenciaListViewModel = require("./ConsultarAsistencia-view-model");
var page;
var ls_asistencia = require('local-storage');
var ls_profesor = require('local-storage');
var BasePage = require("../../../shared/Menu-view-model");


var ConsultarAsistenciaPage = function() {};
ConsultarAsistenciaPage.prototype = new BasePage();
ConsultarAsistenciaPage.prototype.constructor = ConsultarAsistenciaPage;


var asistenciaList = new ConsultarAsistenciaListViewModel([]);
var pageData = new observableModule.fromObject({
    asistenciaList: asistenciaList
});

ConsultarAsistenciaPage.prototype.contentLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    
    asistenciaList.vaciarLista();
    asistenciaList.cargarAsistencias();
};	


module.exports = new ConsultarAsistenciaPage();	