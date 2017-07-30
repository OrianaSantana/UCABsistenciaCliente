var Observable = require("data/observable").Observable;
var magnetometer = require("nativescript-accelerometer");
var file_system_1 = require("file-system");
var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var ls_profesor = require('local-storage');
var fetchModule = require("fetch");
var config = require("../../../shared/config");
var ls_respuesta = require('local-storage');


function createViewModel() { 
    var viewModel = new Observable();       

// ls_respuesta.get('respuesta') //DEBE CAMBIARSE PRUEBA POR LA LOCALSTORAGE
if (ls_respuesta.get('respuesta') == "L1207") {
    viewModel.set("ubicacion","res://l1207");
} else if (ls_respuesta.get('respuesta') == "L1208"){
    viewModel.set("ubicacion","res://l1208");
} else if (ls_respuesta.get('respuesta') == "L1209"){
    viewModel.set("ubicacion","res://l1209");
} else if (ls_respuesta.get('respuesta') == "L1210"){
    viewModel.set("ubicacion","res://l1210");
} else if (ls_respuesta.get('respuesta') == "L1211"){
    viewModel.set("ubicacion","res://l1211");
} else if (ls_respuesta.get('respuesta') == "L1212"){
    viewModel.set("ubicacion","res://l1212");
} else if (ls_respuesta.get('respuesta') == "L1213"){
    viewModel.set("ubicacion","res://l1213");
} else if (ls_respuesta.get('respuesta') == "Pasillo"){
    viewModel.set("ubicacion","res://pasillo");
} else if (ls_respuesta.get('respuesta') == "Ninguno"){
     dialogsModule.alert({
        message: "Ud. no se encuentra ni en el pasillo ni en un salón",
        okButtonText: "OK"
    });
}

    return viewModel;
}

exports.createViewModel = createViewModel;
