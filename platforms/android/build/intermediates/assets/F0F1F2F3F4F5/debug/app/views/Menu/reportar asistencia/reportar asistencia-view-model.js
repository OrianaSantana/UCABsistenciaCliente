var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var ls_justificacion = require('local-storage');
var frameModule = require("ui/frame");
var config = require("../../../shared/config");
var idJus;
var day = new Date().getDate();
var fechaActual = day + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();

function createViewModel() { 
    var info = info || {}; //no se si esto deba existir

    var viewModel = new Observable({
        messageJustificacion: info.massageJustificacion || "", 
         //Analizar con grafos ya que creo que si se puede guardar cualquier cosa en vdd, sin necesidad del id
        JustificacionEscrita: info.JustificacionEscrita || "",
        observacion: info.observacion || ""
       
    });   // no se si hace falta esto, las variables pues

        console.log("Reportar VM JS");
        console.log("fechaActual" + " "+ fechaActual);
        Object.defineProperty(viewModel, "messageJustificacion", {
        get: function () {
            return this._mensajejustificacion;
        },
        set: function (value) {
            if (this._mensajejustificacion !== value) {
                this._mensajejustificacion = value;
                this.notifyPropertyChange('messageJustificacion', value);
            }
        },
        enumerable: true,
        configurable: true
    });

      viewModel.tapJustificacion = function() {
       var _this = this;        
       try{
                //var listjustificacion;
                listjustificacion = ls_justificacion.get('justificacion');
                /*for(i=0; i< listjustificacion; i++){
                    console.log(listjustificacion[i].jus_nombre);
                }*/
                dialogs.action("Seleccione su Justificación", "Cancelar", [listjustificacion[0].jus_nombre, listjustificacion[1].jus_nombre, "Otra..."]).then(function (result) {
                        if (result){
                            alert("La Justificación seleccionada fue:" + result);                              
                            _this.messageJustificacion = result.toString();                                                        
                        }        
                });
            }                
        catch(execption){
        }
    };

    viewModel.ReportarAsistenciaManual = function (idHor) {
        console.log("asistencia manual" + idHor);
      if (viewModel.get("messageJustificacion") == 'Cambio de salón por falla de infraestructura.'){
             idJus = 1;
             console.log("idJus" + idJus);
        } else if (viewModel.get("messageJustificacion") == 'Clase terminada antes del tiempo establecido.'){
            idJus = 2;
            console.log("idJus" + idJus);
        } else {
            idJus = 6;
            console.log("idJus" + idJus);
        }

        return fetch(config.apiUrl + "asistencias" , { 
        method: "POST",
        body: JSON.stringify({
            fecha: fechaActual,
            estado: true,
            tipo: "Manual",
            hor_id: idHor,
            jus_id: idJus,
            observacion: viewModel.get("observacion") 
        }),
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

    viewModel.asistenciaAutomatica = function (idHor) {
        console.log("asistencia automatica" + idHor);
       /*if (viewModel.get("messageJustificacion") == 'Cambio de salón por falla de infraestructura'){
             idJus = 1;
             console.log("idJus" + idJus)
        } else if (viewModel.get("messageJustificacion") == 'Clase terminada antes del tiempo establecido'){
            idJus = 2;
        } else if (viewModel.get("JustificacionEscrita") != ""){
            idJus = 6;
        }*/

        return fetch(config.apiUrl + "asistencias" , { 
        method: "POST",
        body: JSON.stringify({
            fecha: fechaActual,
            estado: true,
            tipo: "Automática",
            hor_id: idHor,
            jus_id: 0,
            observacion: viewModel.get("observacion") 
        }),
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

    viewModel.inasistencia = function (idHor) {
        console.log("inasistencia" + idHor);
       /*if (viewModel.get("messageJustificacion") == 'Cambio de salón por falla de infraestructura'){
             idJus = 1;
             console.log("idJus" + idJus)
        } else if (viewModel.get("messageJustificacion") == 'Clase terminada antes del tiempo establecido'){
            idJus = 2;
        } else if (viewModel.get("JustificacionEscrita") != ""){
            idJus = 6;
        }*/

        return fetch(config.apiUrl + "asistencias" , { 
        method: "POST",
        body: JSON.stringify({
            fecha: fechaActual,
            estado: false,
            tipo: "Inasistencia",
            hor_id: idHor,
            jus_id: 0,
            observacion: viewModel.get("observacion") 
        }),
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

exports.createViewModel = createViewModel;

