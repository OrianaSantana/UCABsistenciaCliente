var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var PreferenciasListViewModel = require("./preferencias-view-model");
var page;
var ls_preferencias = require('local-storage');
var BasePage = require("../../../shared/Menu-view-model");


var PreferenciasPage = function() {};
PreferenciasPage.prototype = new BasePage();
PreferenciasPage.prototype.constructor = PreferenciasPage;


var preferenciasList = new PreferenciasListViewModel([]);
var pageData = new observableModule.fromObject({
    preferenciasList: preferenciasList
});

PreferenciasPage.prototype.contentLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    
    preferenciasList.vaciarLista();
    preferenciasList.cargarPreferencias();
};

PreferenciasPage.prototype.onCheckChange = function(args) {
    console.log("check");
    //ls_preferencias('preferencias', page.get('preferenciasList'));     
    //se obtiene la lista, verificar que asi se obtiene y que el valorCambia tiene el valor que esta cambiando
    //si asi no se obtiene hacer un for, y almacenar en una lista
    //la idea es actualizar la local storage

    //preferenciasList.editarPreferencias(ls_preferencias.get('preferencias'))

    //console.log(ls_preferencias.get('preferencias'));
    console.log(pageData.get("preferenciasList"));


    var lista = pageData.get("preferenciasList");
    var lista_preferencias = [];
    /*console.log(lista.length);

    console.log(lista.getItem(0).nombre, lista.getItem(0).valorCambia);
    console.log(lista.getItem(1).nombre, lista.getItem(1).valorCambia);
    console.log(lista.getItem(2).nombre, lista.getItem(2).valorCambia);*/
    //ls_preferencias('preferencias', lista);        
    for (i=0; i< lista.length; i++){ 
            console.log("Preferencias nombre "+lista.getItem(i).nombre);
              lista_preferencias.push({
                  nombre: lista.getItem(i).nombre,
                  valorCambia: lista.getItem(i).valorCambia});                              
    }; 
    ls_preferencias('preferencias', lista_preferencias);

    preferenciasList.editarPreferencias()
      .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "No se pudo actualizar su lista de preferencias",
                okButtonText: "OK"
            });
            console.log("No PUDO ACTUALIZAR PREFERENCIAS");
            return Promise.reject();
        })
        .then(function() {
            dialogsModule.alert({
                message: "Preferencias actualizadas correctamente",
                okButtonText: "OK"
            });
          console.log("PREFERENCIAS ACTUALIZADAS");
        });

    //preferenciasList.vaciarLista(); //no se si se deba hacer 
    //preferenciasList.cargarPreferencias(ls_preferencias.get('preferencias')); //no se si se deba hacer*/

};

    
module.exports = new PreferenciasPage();