var BasePage = require("../../../shared/Menu-view-model");
var topmost = require("ui/frame").topmost;
var fetchModule = require("fetch");
var dialogsModule = require("ui/dialogs");
var config = require("../../../shared/config");

var color_1 = require("color");
var platform = require("platform");
var linearGradient = require("../../../common/linear-gradient");
var conferenceViewModel = require("../../../view-models/horario-view-model");

var ls_horario = require('local-storage');
var ls_justificacion = require('local-storage');
var ls_id = require('local-storage');
var ls_asistencia = require('local-storage');

var HomePage = function() {};
HomePage.prototype = new BasePage();
HomePage.prototype.constructor = HomePage;
console.log("LLAMADO HOMEJS 1");
var user = conferenceViewModel.instance;
// Place any code you want to run when the home page loads here.
HomePage.prototype.contentLoaded = function(args) {
  var page = args.object;
  console.log("ENTRO  "+ ls_horario.get('horario_profesor'));
  //var gotData = page.navigationContext;
  //console.log(" GOTDATA   "+gotData);
  //console.log(" home.js   "+gotData.horario[0].hor_catedra);

 // var user = conferenceViewModel.instance;

  //page.bindingContext = conferenceViewModel.instance;
  page.bindingContext = user;
  user.horarios(ls_horario.get('horario_profesor'));
  console.log("LLAMADO HOMEJS 3 content");
}
console.log("LLAMADO HOMEJS 2");

/*HomePage.prototype.pageLoaded = function(args,respuesta1) {
  var page = args.object;
  var gotData = page.navigationContext; 
  console.log(" home.js   "+gotData.horario[0].hor_catedra);
  var user = conferenceViewModel.instance;
  //page.bindingContext = conferenceViewModel.instance;
  page.bindingContext = user;
  user.horarios(gotData.horario);
  console.log("LLAMADO HOMEJS 3");
}*/
HomePage.prototype.onBackgroundLoaded = function(args){
    var background = args.object;    
    var colors = new Array(new color_1.Color("#67749b"), new color_1.Color("#5b677b"));
    var orientation = linearGradient.Orientation.Top_Bottom;
    switch (platform.device.os) {
        case platform.platformNames.android:
            linearGradient.drawBackground(background, colors, orientation);
            break;
        case platform.platformNames.ios:
            // The iOS view has to be sized in order to apply a background
            setTimeout(function () {
                linearGradient.drawBackground(background, colors, orientation);
            });
            var search = background.getViewById("search");
            search.ios.backgroundImage = UIImage.alloc().init();
            break;
    }   
}
HomePage.prototype.changeCellBackground = function(args) {
    if (args.ios) {
        var cell = args.ios;
        cell.backgroundColor = UIColor.clearColor();
    }
}

function Justificacion(){
    console.log("Buscar justificacion en menu-view-model");
    return fetchModule.fetch( config.apiUrl + "justificaciones") 
        .then(handleErrors)
        .then(function(response) {
             console.log("BUSCANDO Justificacion primer function then retorna el json ");
             return response.json();
        })
        .then(function(json) {
          console.log("BUSCANDO Justificacion segundo function then retorna el json " + json);
          return json;
        });    
}


HomePage.prototype.reportarAsistencia = function(args) {
    console.log("Metodo reportar asistencia ");
    var item = args.view.bindingContext;	
	console.log("item room" + " " + item.get("room"));	
	console.log("item titulo" + " " + item.get("title"));	
	var id = item.get("id");
    ls_id('horario-id', id);
    console.log("item id " + " " + id);		
    Justificacion(id)
        .catch(function(error) {  
              console.log("CAtch de la funtion consultar justificaciones");        
              dialogsModule.alert({
                    message: "No se pudo encontrar la lista de justificaciones que busca",
                    okButtonText: "OK"
              });
              console.log("No consiguio las justificaciones justificacionjs");
              return Promise.reject();
        })
        .then(function(respuesta1) {   
              ls_justificacion('justificacion', respuesta1);         
              console.log(" IF RESPUESTA  "+ respuesta1[0].jus_nombre + " " + respuesta1[0].jus_id); 
              user.reportarAsistencia(id);                                                    
         });           
}

HomePage.prototype.consultarAsistencias = function(args) {
    console.log("Metodo consultar asistencia " + " " + args );
    var item = args.view.bindingContext;	
	console.log("item room" + " " + item.get("room"));	
	console.log("item titulo" + " " + item.get("title"));	
	var id = item.get("id");
    ls_id('horario-id', id);
    console.log("item id " + " " + id);		
     user.consultarAsistencias(id);         
}

function handleErrors(response) {
    if (!response.ok) {
        console.log("HANDLE ERROR");
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
module.exports = new HomePage();
