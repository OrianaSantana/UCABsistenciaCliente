///var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var config = require("../../../shared/config");

var ls_preferencias = require('local-storage');
var ls_profesor = require('local-storage');

function PrefrenceListViewModel(items) {
    var viewModel = new ObservableArray(items);

   viewModel.cargarPreferencias = function(){
        var preferencias = ls_preferencias.get('preferencias');       
        var status = true;
        for (i=0; i< preferencias.length; i++){ 
            console.log("Preferencias nombre "+preferencias[i].pre_status);
            //console.log("Preferencias nombre "+preferencias[i].pre_status);
            if(preferencias[i].pre_status == "false"){
                console.log("Preferencias status "+preferencias[i].pre_status);
                status = false;
            }
            if (preferencias[i].pre_status == "true"){
                console.log("Preferencias status "+preferencias[i].pre_status);
                status=true;
            }

              viewModel.push({
                  nombre: preferencias[i].pre_nombre,
                  valorCambia: status});                              
        }; 

        // ls_preferencias('preferencias', viewModel.get("preferenciasList"));    
         console.log(viewModel.get("preferenciasList"));    
    };

    viewModel.vaciarLista = function () {
        while (viewModel.length) {
        viewModel.pop();
          } 
    };

    viewModel.editarPreferencias = function(){
        console.log('EDITANDO PREFERENCIAS');
        //var preferencias = ls_preferencias.get('preferencias');
        //console.log('EDITANDO PREFERENCIAS');    
        var lista = ls_preferencias.get('preferencias');        
        //console.log("lista de preferencias view model "+ lista[0].nombre);

        return fetch(config.apiUrl + "preferencias/modificar" , {  //colocar uri
        method: "PUT",
        body: JSON.stringify([{
            pre_id: 1, 
            pre_nombre: lista[0].nombre,
            pre_status: lista[0].valorCambia, // no se si guardando en el js la lista, tiene el valor en el pre_status, verificar
            usu_id: ls_profesor.get('id')
            },
        {
            pre_id: 2,
            pre_nombre: lista[1].nombre,
            pre_status: lista[1].valorCambia,
            usu_id: ls_profesor.get('id')
        },
        {
            pre_id: 3,
            pre_nombre: lista[2].nombre,
            pre_status: lista[2].valorCambia,
            usu_id: ls_profesor.get('id')
        },
        {
            pre_id: 4,
            pre_nombre: lista[3].nombre,
            pre_status: lista[3].valorCambia,
            usu_id: ls_profesor.get('id')
        }]),
        headers: {
            // "Authorization": "Bearer " + config.token,
            "Content-Type": "application/json"
        }
    })
    .then(handleErrors)
    .then(function(response) {
        return response.json();
    })
    };

    return viewModel;
}
function handleErrors(response) {
    if (!response.ok) {
        console.log("HANDLE ERROR");
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}


module.exports = PrefrenceListViewModel;