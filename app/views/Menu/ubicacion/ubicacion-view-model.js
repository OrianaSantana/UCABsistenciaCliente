var Observable = require("data/observable").Observable;
var magnetometer = require("nativescript-accelerometer");
var file_system_1 = require("file-system");
var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var ls_profesor = require('local-storage');
var fetchModule = require("fetch");
var config = require("../../../shared/config");
var ls_respuesta = require('local-storage');
var imageSource = require("image-source");
var prueba = "l1208";
var fileName = prueba+".png"; // ls_respuesta.get('respuesta')+".png"

function createViewModel() { 
    var viewModel = new Observable();    
      
      if(ls_respuesta.get('respuesta') == "l1207" || ls_respuesta.get('respuesta') == "l1208" || ls_respuesta.get('respuesta') == "l1209" ||
      ls_respuesta.get('respuesta') == "l1210" || ls_respuesta.get('respuesta') == "l1211" || ls_respuesta.get('respuesta') == "l1212" ||
      ls_respuesta.get('respuesta') == "l1213") {
        imageSource.fromUrl(config.planoUrl+fileName)
                    .then(function (res) {
                        console.log("Image successfully loaded");
                        viewModel.set("ubicacion",res);  
                         
                        }, function (error) {
                                console.log("Error loading image: " + error);
                            });                                         
        
      } else if (ls_respuesta.get('respuesta') == "ninguno"){
        dialogsModule.alert({
            message: "Ud. no se encuentra ni en el pasillo ni en un salón",
            okButtonText: "OK"
        });
    }                 
     
    return viewModel;
}

exports.createViewModel = createViewModel;
