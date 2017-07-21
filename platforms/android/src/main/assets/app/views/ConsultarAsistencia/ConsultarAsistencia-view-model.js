var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

var ls_asistencia = require('local-storage');
var ls_profesor = require('local-storage');

function ConsultarAsistenciaListViewModel(items) {
    var viewModel = new ObservableArray(items);

   viewModel.cargarAsistencias = function(){
        var asistencias = ls_asistencia.get('asistencias');       
        for (i=0; i< asistencias.length; i++){    

              console.log("Asistencias"+ asistencias[i].hist_asis_id);        
              console.log("Asistencias"+ asistencias[i].hist_asis_justificacion);        
             
              viewModel.push({
                  fecha: "Fecha de la Clase:" + " " + asistencias[i].hist_asis_fecha,
                  tipo: "Tipo de Asistencia:" + " " + asistencias[i].hist_asis_tipo,
                  justificacion: "Justificativo:"+  " " + asistencias[i].hist_asis_justificacion
                  });                              
        }; 

         console.log(viewModel.get("asistenciaList"));    
    };

    viewModel.vaciarLista = function () {
        while (viewModel.length) {
        viewModel.pop();
          } 
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


module.exports = ConsultarAsistenciaListViewModel;
