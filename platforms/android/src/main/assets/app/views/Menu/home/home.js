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
var dia;
var horario = ls_horario.get('horario_profesor')
var diaSemana = new Date().getDay();
var diaHorario;
var horaActual = new Date().getHours() + ":" + new Date().getMinutes();
var horaMillis = new Date().getTime();
var horaAndroid = java.lang.System.currentTimeMillis();
var fechaAndroidReal = new Date(horaAndroid);
var dateAndroid = fechaAndroidReal.getHours() + ":" + fechaAndroidReal.getMinutes() + ":" + fechaAndroidReal.getSeconds();
var hora_inicio = 0;
var min_hora_inicio = 0;
var horaClase;
var compuString = horaMillis.toString();
var androidString = horaAndroid.toString();
var recortandoCompu = "";
var recortandoAndroid = "";
//var formato = java.text.SimpleDateFormat("MMM dd,yyyy HH:mm");
//var fechaFormato = java.util.Date(horaAndroid);
//var finalAndroid = formato.format(fechaFormato);


var HomePage = function() {};
HomePage.prototype = new BasePage();
HomePage.prototype.constructor = HomePage;
console.log("LLAMADO HOMEJS 1");
var user = conferenceViewModel.instance;
// Place any code you want to run when the home page loads here.
HomePage.prototype.contentLoaded = function(args) {
  var page = args.object;
  console.log("ENTRO  "+ ls_horario.get('horario_profesor'));
  console.dir(ls_horario.get('horario_profesor'));
  //var gotData = page.navigationContext;
  //console.log(" GOTDATA   "+gotData);
  //console.log(" home.js   "+gotData.horario[0].hor_catedra);

 // var user = conferenceViewModel.instance;
  //page.bindingContext = conferenceViewModel.instance;
  page.bindingContext = user;
  user.horarios(ls_horario.get('horario_profesor'));
  console.log("LLAMADO HOMEJS 3 content");


if (diaSemana == 2) {
    dia = 'Lunes';
     console.log("El dia de la semana es:" + " " + dia);
} else if (diaSemana == 3) {
    dia = 'Martes';
     console.log("El dia de la semana es:" + " " + dia);
} else if (diaSemana == 4) {
    dia = 'Miercoles';
     console.log("El dia de la semana es:" + " " + dia);
} else if (diaSemana == 5) {
    dia = 'Jueves';
    console.log("El dia de la semana es:" + " " + dia);
} else if (diaSemana == 6) {
    dia = 'Viernes';
     console.log("El dia de la semana es:" + " " + dia);
}
        console.log("Hora REAL ANDROID" + " " + dateAndroid);
        console.log("fecha y dia de hora android" + " " + fechaAndroidReal.getDay() + " " + fechaAndroidReal.getDate() + "/" + 
        fechaAndroidReal.getMonth() + "/" + fechaAndroidReal.getFullYear());
         console.log("Hora millis compu" + " " + compuString);
         console.log("HoraAndroid millis" + " " + androidString);



for (i=0; i< compuString.length - 2; i++) {

    recortandoCompu = recortandoCompu + compuString[i];
}

for (i=0; i< androidString.length - 2; i++) {

    recortandoAndroid = recortandoAndroid + androidString[i];
}

console.log("String compu actualizado" + " " + recortandoCompu);
console.log("String android actualizado" + " " + recortandoAndroid);


  for (i=0; i< horario.length; i++){ 
         diaHorario = horario[i].hor_dia;
         hora_inicio = horario[i].hor_hora_inicio.substr(11,2);
         min_hora_inicio = horario[i].hor_hora_inicio.substr(14,2);

        if (diaHorario == dia) {
            horaClase = hora_inicio + ":" + min_hora_inicio;
               if (recortandoCompu == recortandoAndroid) {
                    if (horaActual == horaClase) {
                      salonClase = horario[i].hor_salon;
                    console.log("Su clase es en el salon:" + " " + salonClase);
                    dialogsModule.alert({
                       message: "Su clase es en el salon:" + " " + salonClase,
                       okButtonText: "OK"
                       });
                    }
               } else {
                   console.log("Las horas no son iguales");
               }
        } else {
            console.log("Los dias no son iguales");
        }

        };

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
    user.set("isLoading", true);
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
              user.set("isLoading", false);                                                    
         });           
}

HomePage.prototype.consultarAsistencias = function(args) {
    user.set("isLoading", true);
    console.log("Metodo consultar asistencia " + " " + args );
    var item = args.view.bindingContext;	
	console.log("item room" + " " + item.get("room"));	
	console.log("item titulo" + " " + item.get("title"));	
	var id = item.get("id");
    ls_id('horario-id', id);
    console.log("item id " + " " + id);		
     user.consultarAsistencias(id);
     user.set("isLoading", false);
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
