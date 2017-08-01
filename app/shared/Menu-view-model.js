var topmost = require("ui/frame").topmost;
var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var dialogsModule = require("ui/dialogs");
var config = require("./config");
var services = require("../service-helper");

var ls_profesor = require('local-storage');
var ls_correo = require('local-storage');
var ls_preferencias = require('local-storage');
var ls_notificaciones = require('local-storage');
var ls_asistencia = require('local-storage');
var ls_horario = require('local-storage');
var ls_l1207 = require('local-storage');
var ls_l1208 = require('local-storage');
var ls_l1209 = require('local-storage');
var ls_l1210 = require('local-storage');
var ls_l1211 = require('local-storage');
var ls_l1212 = require('local-storage');
var ls_l1213 = require('local-storage');
var ls_pasillo = require('local-storage');
var ls_ninguno = require('local-storage');
var ls_idHorario = require('local-storage');
var ls_minutosClase = require('local-storage');
var ls_salon = require('local-storage');
var ls_lugar = require('local-storage');
var ls_horaInicio = require('local-storage');
var ls_horaFin = require('local-storage');
var ls_magnetometro = require('local-storage');
var appViewModel = new Observable();
//var ls_validator = require('local-storage');

appViewModel.selectedPage = "home";

function BasePage(){}

BasePage.prototype.viewModel = appViewModel

BasePage.prototype.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = appViewModel; 
   appViewModel.set("isLoading", false);  
  console.log("MENU NOMBRE 1"); 

  try {
    appViewModel.set("profesor", ls_profesor.get('profesor'));
    appViewModel.set("correo", ls_correo.get('correo')); 

    console.log('LOCALSTORAGE', ls_profesor.get('profesor'), ls_correo.get('correo'));
    console.log('VIEWMODEL',  appViewModel.get('profesor'), appViewModel.get('correo'));
  } catch (err) {
    console.log(err);
  }
}
BasePage.prototype.toggleDrawer = function() {
  var page = topmost().currentPage;  
  page.getViewById("drawer").toggleDrawerState();  
  console.log("MENU NOMBRE 2");   
}

/*function horarios()
{
  //console.log("Buscar horarios en menu-view-model");
    return fetchModule.fetch( "http://192.168.0.109:8080/WSUcabsistencia/api.ucabsistencia.com/profesores/horarios?profesor-id=" + "1" ) 
        .then(handleErrors)
        .then(function(response) {
             return response.json();
        })
        .then(function(json) {
          return json;
        });  
}*/
function preferencias()
{    
    console.log("Buscar preferencias en menu-view-model");
    return fetchModule.fetch( config.apiUrl + "preferencias/profesores?profesor-id=" + ls_profesor.get('id')) 
        .then(handleErrors)
        .then(function(response) {
          console.log("preferencias response.json ");
             return response.json();
        })
        .then(function(json) {
          console.log("preferencias json " + json[0].pre_id);
          return json;
        });
}

function notificaciones()
{    
    console.log("Buscar notificaciones en menu-view-model");
    return fetchModule.fetch( config.apiUrl + "profesores/notificaciones?profesor-id=" + ls_profesor.get('id')) 
        .then(handleErrors)
        .then(function(response) {  
          console.log("notificaciones js");                 
             return response.json();
        })
        .then(function(json) {
          console.log("notificaciones json ");
          return json;
        });
}

function cerrarSesion(_id)
{
        console.log("modificar id del profesor " + _id);
        return fetchModule.fetch( config.apiUrl + "profesor/cerrar/conexion", {  //colocar uri
        method: "PUT",
        body: JSON.stringify({
            Usu_foto:'off', 
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

BasePage.prototype.navigate = function(args) {
  var pageName = args.view.text.toLowerCase(); 
  console.log("PAGE navigate " + pageName );
  appViewModel.set("selectedPage", pageName);  
  //if(pageName == "home"){
 /* horarios()
          .catch(function(error) {

            dialogsModule.alert({
                message: "No se pudo encontrar el horario del profesor que busca",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function(respuesta1) {            
           console.log("Menu navigate  "+ respuesta1[0].hor_catedra + " " + respuesta1[1].hor_catedra + " " + respuesta1[2].hor_catedra + " " + respuesta1[3].hor_catedra + " " + respuesta1[4].hor_catedra +
          " "+ respuesta1[5].hor_catedra);
           var navigationOptions= {
               moduleName:'views/Menu/' + pageName + '/' + pageName,
               context:{ 
                        horario: respuesta1
               }
           }
            frameModule.topmost().navigate(navigationOptions);                         
        }); */
        //ls_horario.get('horario_profesor')
  //}else{
    //console.log("ELSE PAGENAME "+ pageName);
    if (pageName == "preferencias" /*&& ls_validator.get('validar')== 0*/){
     // ls_validator('validar', 1);
      //console.log("validator "+ ls_validator.get('validar'));
      appViewModel.set("isLoading", true);
      preferencias()
                    .catch(function(error) {  
                        console.log("CAtch de la funtion consultar preferencias");        
                        dialogsModule.alert({
                            message: "No se pudo encontrar la lista de preferencias que busca",
                            okButtonText: "OK"
                        });
                        console.log("No consiguio las prefrencias preferenciasjs");
                        return Promise.reject();
                    })
                    .then(function(respuesta1) {   
                    ls_preferencias('preferencias', respuesta1);         
                    console.log(" IF RESPUESTA  "+ respuesta1[0].pre_nombre + " " + respuesta1[1].pre_status); 
                    topmost().navigate("views/Menu/" + pageName + "/" + pageName);     
                      appViewModel.set("isLoading", false);                            
                    });   
          
    } else if(pageName == "notificaciones" /*&& ls_validator.get('validar')== 0*/){
     // ls_validator('validar', 1);
      //console.log("validator "+ ls_validator.get('validar'));
    appViewModel.set("isLoading", true);  
      notificaciones()
                    .catch(function(error) {  //entra aqui no pasa a respuesta
                        console.log("CAtch de la funtion consultar notificaciones "+ error);        
                        dialogsModule.alert({
                            message: "No se pudo encontrar la lista de notificaciones que busca",
                            okButtonText: "OK"
                        });
                        console.log("No consiguieron las notificaciones notificacionesjs");
                        return Promise.reject();
                    })
                    .then(function(respuestaNot) {   
                    ls_notificaciones('notificaciones', respuestaNot);         
                    console.log(" IF RESPUESTA  "+ respuestaNot[0].not_id + " " + respuestaNot[0].not_mensaje); 
                    topmost().navigate("views/Menu/" + pageName + "/" + pageName);
                    appViewModel.set("isLoading", false);                                   
                    });   
          
    } else if (pageName == "cerrar sesion"){
         appViewModel.set("isLoading", true);  
         cerrarSesion(ls_profesor.get('id'))
                      .catch(function(error) {
                          console.log(error);
                          dialogsModule.alert({
                          message: "No se pudo actualizar su status",
                          okButtonText: "OK"
                          });
                          console.log("No PUDO ACTUALIZAR STATUS");
                          return Promise.reject();
                      })
                      .then(function() {
                          console.log("status ACTUALIZADO");                                    
                        });  
            ls_profesor('profesor',null);
            ls_profesor('id',null);
            ls_correo('correo',null);
            ls_preferencias('preferencias',null);
            ls_notificaciones('notificaciones',null);
            ls_horario('horario_profesor',null);
            ls_asistencia('asistencias',null);
            ls_salon('salon',null);
            ls_lugar('lugar',null);
            ls_l1207('l1207',null) ;
            ls_l1208('l1208',null) ;
            ls_l1209('l1209',null) ;
            ls_l1210('l1210',null) ;
            ls_l1211('l1211',null) ;
            ls_l1212('l1212',null) ;
            ls_l1213('l1213',null) ;
            ls_pasillo('pasillo',null) ;
            ls_ninguno('ninguno',null) ;
            ls_magnetometro('magnetometro',null);
            ls_horaInicio('inicio',null);
            ls_horaFin('fin',null);
            ls_minutosClase('clase',null);             
            console.log("local profesor" + " " + ls_profesor.get('profesor'));
            console.log("local id" + " " + ls_profesor.get('id'));
            console.log("local correo" + " " + ls_correo.get('correo'));
            console.log("local horario" + " " + ls_horario.get('horario_profesor'));
            console.log("local preferencias" + " " + ls_preferencias.get('preferencias'));
            console.log("local notificaciones" + " " + ls_notificaciones.get('notificaciones'));
            console.log("local asistencias" + " " + ls_asistencia.get('asistencias'));
            appViewModel.set("isLoading", false);  
            topmost().navigate("views/InicioSesion/InicioSesion");
            services.stopAlarm();
    }
    else {
         appViewModel.set("isLoading", true);  
      topmost().navigate("views/Menu/" + pageName + "/" + pageName);
       appViewModel.set("isLoading", false);  
    }
    } 
   // else{
     // topmost().navigate("views/Menu/" + pageName + "/" + pageName);
    //}
  //}

function handleErrors(response) {
    if (!response.ok) {
      console.log("Handle errors");
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
module.exports = BasePage;