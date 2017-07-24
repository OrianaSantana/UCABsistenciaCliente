var Observable = require("data/observable").Observable;
var fetchModule = require("fetch");
var frameModule = require("ui/frame");
var config = require("../../shared/config");
var dialogs = require("ui/dialogs");
//var LocalNotifications = require("nativescript-local-notifications");

function createViewModel(info) {
    info = info || {};
    var viewModel = new Observable({
        usuario: info.usuario || ""
    });
 
    //llamado a notificacion prueba  
    /*doAddOnMessageReceivedCallback(); 
    function doAddOnMessageReceivedCallback() {
        console.log("do add");
        console.log("do add " + LocalNotifications.addOnMessageReceivedCallback);
        LocalNotifications.addOnMessageReceivedCallback(
                function(notificationData) {
                    console.log("message recived callback ");
                    dialogs.alert({
                        title: "Notification received",
                        message: "ID: " + "notificationData.id" +
                        "\nTitle: " + "notificationData.title" +
                        "\nBody: " + "notificationData.body",
                        okButtonText: "Excellent!"
                    });
                }
            )
        }   
    
    schedule();
    
    function schedule(){
            console.log("function schedule");
            LocalNotifications.schedule([{
            id: 1,
            title: 'The title',
            body: 'Recurs every minute until cancelled',
            ticker: 'The ticker',
            //badge: 1,
            //groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
            //groupSummary:"Summary of the grouped messages above", //android only
            //ongoing: true, // makes the notification ongoing (Android only)
            //smallIcon: 'res://heart',
            //interval: 'minute',
           // sound: require("application").ios ? "customsound-ios.wav" : "customsound-android", // can be also `null`, "default"
            at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now                
            }]).then(
                function() {
                dialogs.alert({
                    title: "scheduled",
                    message: 'notificacion ',
                    okButtonText: "OK!"
                });
                },
                function(error) {
                console.log("doScheduleEveryMinute error: " + error);
                }
            );        
    };*/

    viewModel.consultarProfesorID = function()
    {   console.log("consultar profesor por correo " + viewModel.get("usuario"));
       // viewModel.set("isLoading", true);
        //return fetchModule.fetch("http://192.168.1.6:8080/WSUcabsistencia/api.ucabsistencia.com/profesores/profesor_correo?profesor-correo=" + viewModel.get("usuario") ) 
        return fetchModule.fetch( config.apiUrl + "profesores/profesor_correo?profesor-correo=" + viewModel.get("usuario") ) 
        .then(handleErrors)
        .then(function(response) {
             return response.json();
        })
        .then(function(json) {
          return json;
        });        
        
    };

    viewModel.validarSesion = function(_id)
    {
        console.log("modificar id del profesor " + _id);
        //return fetch("http://192.168.1.6:8080/WSUcabsistencia/api.ucabsistencia.com/profesor/estatus/conexion"
        return fetchModule.fetch( config.apiUrl + "profesor/estatus/conexion", {  //colocar uri
        method: "PUT",
        body: JSON.stringify({
            Usu_foto:'on', 
            Usu_id: _id,
            }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(handleErrors)
    .then(function(response) {
        console.log("response " + response);
        return response.json();   
    })        

    };
    
    viewModel.consultarHorario = function(_id)
    {
        console.log("BUSCANDO HORARIOOOO ");
        //return fetchModule.fetch("http://192.168.1.6:8080/WSUcabsistencia/api.ucabsistencia.com/profesores/horarios?profesor-id=" + _id ) 
        return fetchModule.fetch( config.apiUrl + "profesores/horarios?profesor-id=" + _id ) 
        .then(handleErrors)
        .then(function(response) {
            console.log("BUSCANDO HORARIOOOO primer function then " );
             return response.json();
        })
        .then(function(json) {
          console.log("BUSCANDO HORARIOOOO segundo function then retorna el json " + json);
          //viewModel.set("isLoading", false);
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