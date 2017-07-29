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
var diaHorario;
var horaAndroid = java.lang.System.currentTimeMillis();
var fechaAndroidReal = new Date(horaAndroid);
var diaSemana = fechaAndroidReal.getDay();
var horaFormato;
var minutoFormato;

/*if (fechaAndroidReal.getHours() == 1 || fechaAndroidReal.getHours() == 2 || fechaAndroidReal.getHours() == 3 
|| fechaAndroidReal.getHours() == 4 || fechaAndroidReal.getHours() == 5 || fechaAndroidReal.getHours() == 6 
|| fechaAndroidReal.getHours() == 7 || fechaAndroidReal.getHours() == 8 || fechaAndroidReal.getHours() == 9) {
  
  horaFormato = "0" + fechaAndroidReal.getHours();
} else {
    horaFormato = fechaAndroidReal.getHours();
}

if (fechaAndroidReal.getMinutes() == 1 || fechaAndroidReal.getMinutes() == 2 || fechaAndroidReal.getMinutes() == 3 
|| fechaAndroidReal.getMinutes() == 4 || fechaAndroidReal.getMinutes() == 5 || fechaAndroidReal.getMinutes() == 6 
|| fechaAndroidReal.getMinutes() == 7 || fechaAndroidReal.getMinutes() == 8 || fechaAndroidReal.getMinutes() == 9) {
  
  minutoFormato = "0" + fechaAndroidReal.getMinutes();
} else {
    minutoFormato = fechaAndroidReal.getMinutes();
}

var horaActual = horaFormato + ":" + minutoFormato;
var hora_inicio = 0;
var min_hora_inicio = 0;
var horaClase;*/

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
 
  page.bindingContext = user;
  user.horarios(ls_horario.get('horario_profesor'));
  console.log("LLAMADO HOMEJS 3 content");


/*if (diaSemana == 1) {
    dia = 'Lunes';
     console.log("El dia de la semana es:" + " " + dia);
} else if (diaSemana == 2) {
    dia = 'Martes';
     console.log("El dia de la semana es:" + " " + dia);
} else if (diaSemana == 3) {
    dia = 'Miercoles';
     console.log("El dia de la semana es:" + " " + dia);
} else if (diaSemana == 4) {
    dia = 'Jueves';
    console.log("El dia de la semana es:" + " " + dia);
} else if (diaSemana == 5) {
    dia = 'Viernes';
     console.log("El dia de la semana es:" + " " + dia);
}
        console.log("Hora REAL ANDROID" + " " + horaActual);
        console.log("fecha y dia de hora android" + " " + diaSemana + " " + fechaAndroidReal.getDate() + "/" + 
        ((fechaAndroidReal.getMonth()) + 1) + "/" + fechaAndroidReal.getFullYear());*/
        
//Esta comparacion en el servicio debe hacerse cada minuto/Cada hora
  /*for (i=0; i< horario.length; i++){ 
         diaHorario = horario[i].hor_dia;
         hora_inicio = horario[i].hor_hora_inicio.substr(11,2);
         min_hora_inicio = horario[i].hor_hora_inicio.substr(14,2);

        if (diaHorario == dia) {
            horaClase = hora_inicio + ":" + min_hora_inicio;
                    if (horaActual == horaClase) {
                      salonClase = horario[i].hor_salon;
                    console.log("Su clase es en el salon:" + " " + salonClase);
                    dialogsModule.alert({
                       message: "Su clase es en el salon:" + " " + salonClase,
                       okButtonText: "OK"
                       });
                    } else {
                        console.log("Las horas no son iguales");
                    }
              
        } else {
            console.log("Los dias no son iguales");
        }

        };*/

}
console.log("LLAMADO HOMEJS 2");

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
