var Observable = require("data/observable").Observable;
var fetchModule = require("fetch");
var frameModule = require("ui/frame");
var config = require("../../shared/config");

function createViewModel(info) {
    info = info || {};
    var viewModel = new Observable({
        usuario: info.usuario || ""
    });

    viewModel.consultarProfesorID = function()
    {   console.log("consultar profesor por correo " + viewModel.get("usuario"));
        return fetchModule.fetch( config.apiUrl + "profesores/profesor_correo?profesor-correo=" + viewModel.get("usuario") ) 
        .then(handleErrors)
        .then(function(response) {
             return response.json();
        })
        .then(function(json) {
          return json;
        });        
        
    };
    viewModel.consultarHorario = function(_id)
    {
        console.log("BUSCANDO HORARIOOOO ");
        return fetchModule.fetch( config.apiUrl + "profesores/horarios?profesor-id=" + _id ) 
        //return fetchModule.fetch("http://192.168.1.7:8080/WSUcabsistencia/api.ucabsistencia.com/profesores-correo/horarios?profesor-correo=" + viewModel.get("usuario") )         
        .then(handleErrors)
        .then(function(response) {
            console.log("BUSCANDO HORARIOOOO primer function then " );
             return response.json();
        })
        .then(function(json) {
          console.log("BUSCANDO HORARIOOOO segundo function then retorna el json " + json);
          return json;
        });        
    };
    console.log("Return viewModel iniciosesin-view-modeljs " + viewModel);
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

exports.createViewModel = createViewModel;

