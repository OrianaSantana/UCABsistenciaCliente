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
    var prueba = "L1207";

// ls_respuesta.get('respuesta') //DEBE CAMBIARSE PRUEBA POR LA LOCALSTORAGE
if (prueba == "L1207") {
    viewModel.set("ubicacion","res://l1207");
} else if (prueba == "L1208"){
    viewModel.set("ubicacion","res://l1208");
} else if (prueba == "L1209"){
    viewModel.set("ubicacion","res://l1209");
} else if (prueba == "L1210"){
    viewModel.set("ubicacion","res://l1210");
} else if (prueba == "L1211"){
    viewModel.set("ubicacion","res://l1211");
} else if (prueba == "L1212"){
    viewModel.set("ubicacion","res://l1212");
} else if (prueba == "L1213"){
    viewModel.set("ubicacion","res://l1213");
} else if (prueba == "Pasillo"){
    viewModel.set("ubicacion","res://pasillo");
} else if (prueba == "Ninguno"){
     dialogsModule.alert({
        message: "Ud. no se encuentra ni en el pasillo ni en un salón",
        okButtonText: "OK"
    });
}

    return viewModel;
}

exports.createViewModel = createViewModel;
