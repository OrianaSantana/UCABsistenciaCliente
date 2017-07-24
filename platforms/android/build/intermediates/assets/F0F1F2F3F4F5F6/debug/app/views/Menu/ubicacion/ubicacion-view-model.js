var Observable = require("data/observable").Observable;
var magnetometer = require("nativescript-accelerometer");
var file_system_1 = require("file-system");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var ls_profesor = require('local-storage');
var fetchModule = require("fetch");
var config = require("../../../shared/config");

var miObjeto = function (vx, vy, vz) {
    this.vx = vx || '';
    this.vy = vy || '';
    this.vz = vz || '';
    this.pro_id =  ls_profesor.get('id') || '';
};
var objeto;
var intervalo;
var intervalo1;
var intervalo2;
var intervalo3;
var data1;
var x;
var y;
var z;
var Gfecha;
var Gsalon;
var Gedificio;
var Formatear;   
var counter;
var ArregloGuardar = []; 
var ArregloNuevo = []; 
var edificio;
var activarUpdate = false;

function createViewModel() { 
    var viewModel = new Observable();    
    this._validarBoton = false; 
  
    viewModel.onTap3 = function () {
        if(!activarUpdate){
            counter = 500;
            activarUpdate = true;    
        }    
    };

    viewModel.insert = function() {
        if(activarUpdate){
            if (!this._validarBoton) {
                this._validarBoton = true;
            }
            else if (this._validarBoton == true) {
                this._validarBoton = false;
                activarUpdate=false;
            }
            //this.SeleccionarLugar();
            this.activarMagnetometro();
        }else if(!activarUpdate){
            dialogs.action("Debe indicar el intervalo de tiempo para tomar medidas"); 
        }
        
    }

    Object.defineProperty(viewModel, "messageview", {
        get: function () {
            return this._mensajeview;
        },
        set: function (value) {
            if (this._mensajeview !== value) {
                this._mensajeview = value;
                this.notifyPropertyChange('messageview', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    
  
    viewModel.activarMagnetometro = function () {
        if (this._validarBoton) {
            var pro_id = ls_profesor.get('id');
            magnetometer.startMagnetometerUpdates(function (data) {
                data1 = data;
                objeto = new miObjeto(data.x, data.y, data.z, pro_id);    
            }
            );
        }
        else if (!this._validarBoton) {
            magnetometer.stopMagnetometerUpdates();
        }
        this.updateTextView();
        
    };

    viewModel.select = function() {    
            var SDCard = android.os.Environment.getExternalStorageState();
            console.log("Estado de la memoria es:"+ " "+SDCard);
            var tempFilePath = file_system_1.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString());
            var folder = file_system_1.Folder.fromPath(tempFilePath);
            var nombreArchivo = "ArchivoArreglo";
            var testFile = folder.getFile(Gfecha+Gedificio+"-"+Gsalon+".txt")        
            console.log("Este es el arreglo:" + " "+ ArregloGuardar);
            testFile.writeText(JSON.stringify(ArregloGuardar));        
            testFile.readText()
                    .then(function (content) {
                    console.log("Contenido del archivo"+ content);
                    console.log("se guardo");
                }, function (error) {
                    console.log("Error " + error);
                });
    }

    viewModel.limpiar = function(){
        var _this = this;
        _this.messageview = "";
        ArregloGuardar = [];

    }               

    viewModel.updateTextView = function () {
        //if (activarUpdate){
            var _this = this;
            if (this._validarBoton) {
                intervalo1 = setInterval(function () {_this.messageview = "x: " + objeto.vx + " " + "y: " + objeto.vy + " " + "z: " + objeto.vz;}, counter);
                intervalo = setInterval(function () { console.log(" " + " x: " + " " + data1.x + " " + " y: " + " " + data1.y + " " + " z: " + " " + data1.z); }, counter);            
               // intervalo2 = setInterval(function(){ArregloGuardar.push(JSON.stringify(objeto))},counter);
                intervalo3 = setInterval(function(){ArregloNuevo.push(objeto)},counter);
            }else if (!this._validarBoton) {
                //this.select();            
                clearInterval(intervalo);
                clearInterval(intervalo1);
               // clearInterval(intervalo2);
                clearInterval(intervalo3);
            console.log("Arreglo nuevo data1" + " " + JSON.stringify(ArregloNuevo));  

             ubicacion()
           .catch(function(error) {
            console.log("catch post ubicacion");
            /*dialogsModule.alert({
                message: "No se pudo reportar la asistencia",
                okButtonText: "OK"
            });*/
            console.log("No se pudo localizar");
            return Promise.reject();
        })
        .then(function(respuesta1) {
            console.log("Respuesta1" + " " + respuesta1._bodyInit);
            console.dir(respuesta1);
             //console.log(JSON.stringify(respuesta1));
            /* dialogsModule.alert({
                message: "Asistencia reportada exitosamente.",
                okButtonText: "OK"
            });*/
            ArregloNuevo = [];
            _this.messageview = "";
            frameModule.topmost().navigate("views/Menu/home/home");
        });
            
        }
        //}else if(!activarUpdate){
           // dialogs.action("Debe indicar el intervalo de tiempo para tomar medidas"); 
        //}
        //activarUpdate = false;
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
function ubicacion()
{    
    console.log("POST de ubicacion ENTRO");

    return fetch(config.apiUrl + "ubicacion" , { 
        method: "POST",
        body: JSON.stringify(
            ArregloNuevo 
        ),
        headers: {
            // "Authorization": "Bearer " + config.token,
            "Content-Type": "application/json"
        }
    })
    .then(handleErrors)
     .then(function(response) {          
        return response;
        });
        
}
exports.createViewModel = createViewModel;
