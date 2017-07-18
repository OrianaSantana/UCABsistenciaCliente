var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

var ls_notificaciones = require('local-storage');
var ls_profesor = require('local-storage');

function NotificacionesListViewModel(items) {
    var viewModel = new ObservableArray(items);

   viewModel.cargarNotificaciones = function(){
        var notificaciones = ls_notificaciones.get('notificaciones');       
        for (i=0; i< notificaciones.length; i++){    

              console.log("notificaciones mensaje "+notificaciones[i].not_mensaje);        
            
              viewModel.push({
                  mensaje: notificaciones[i].not_mensaje, 
                  });                              
        }; 

        // ls_preferencias('preferencias', viewModel.get("preferenciasList"));    
         console.log(viewModel.get("notificacionesList"));    
    };

    viewModel.vaciarLista = function () {
        while (viewModel.length) {
        viewModel.pop();
          } 
    };

  viewModel.InsertarNotificacion = function (idPro/*,mensajito*/) {
        console.log("id del profesor" + idPro);
		
        return fetch(config.apiUrl + "notificaciones" , { 
        method: "POST",
        body: JSON.stringify({
            usu_id: idPro,
			mensaje: "Mensaje de Prueba"
				
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


module.exports = NotificacionesListViewModel;
