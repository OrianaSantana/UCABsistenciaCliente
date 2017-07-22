var observable = require("data/observable");
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var config = require("../shared/config");
var topmost = require("ui/frame").topmost;
var ls_asistencia = require('local-storage');
console.log("LLAMADO VIEWMODELJS 1");
var condicional = false;
var horarioValidator = [];
var horaAndroid = java.lang.System.currentTimeMillis();
var fechaAndroidReal = new Date(horaAndroid);
var dia = fechaAndroidReal.getDate();
var mes = fechaAndroidReal.getMonth();
var a_o = fechaAndroidReal.getFullYear();

function formatTime(time) {
    var hour = time.getHours();
    var min = time.getMinutes() + "";
    return (hour <= 12 ? hour : hour - 12) + ":" + (min.length === 1 ? '0' + min : min) + (hour < 12 ? " AM" : " PM");
}

function formatDate(time) {
    var day = time.getDate();
    //console.log(" Formatdate  "+day);
    var month = time.getMonth();
    var year = time.getFullYear();
    return (day) + "/" + (month) + "/" + (year);
}

function handleErrors(response) {
    if (!response.ok) {
        console.log("HANDLE ERROR");
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

      function Asistencias(idHorario){
    console.log("Buscar asistencias view-model");
    return fetchModule.fetch( config.apiUrl + "asistencias/horarios?horario-id=" + idHorario) 
        .then(handleErrors)
        .then(function(response) {
             console.log("BUSCANDO asistencias primer function then retorna el json ");
             return response.json();
        })
        .then(function(json) {
          console.log("BUSCANDO asistencias segundo function then retorna el json " + json);
          return json;
        });    
}

var Session = (function (_super) {
    __extends(Session, _super);
    function Session(title, start, end, room, dia, id, isFavourite, cssClass) {
    //function Session(title, dia, room, isFavourite, cssClass) {        
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.start = start;
        _this.end = end;
        _this.dia= dia;
        _this.room = room;
        _this.id = id;
        return _this;
    }
    Object.defineProperty(Session.prototype, "range", {
        get: function () {
            return formatDate(this.start) + "  " + "  " + "  " + formatTime(this.start) + " - " + formatTime(this.end);
        },
        enumerable: true,
        configurable: true
    });
    return Session;
}(observable.Observable));
exports.Session = Session;

var ConferenceViewModel = (function (_super) {
    __extends(ConferenceViewModel, _super);
    function ConferenceViewModel() {
        var _this = _super.call(this) || this;
        _this.selectedDay = 0;
        return _this;
    }
    Object.defineProperty(ConferenceViewModel.prototype, "selectedDay", {
        get: function () {
            //console.log("GET "+ this._selectedDay);
            return this._selectedDay;
        },
        set: function (value) {
            //console.log("SET " + value);
            if (this._selectedDay !== value) {
                this._selectedDay = value;
                //console.log("if horario-view-model " + value);
                if (condicional)
                {
                    console.log("entro al if del condicional " + horarioValidator); 
                    this.filter(horarioValidator);                
                }
            }
        },
        enumerable: true,
        configurable: true
    });  
    ConferenceViewModel.prototype.horarios = function (horario) {       
        var catedra = horario[0].hor_id + " " + horario[0].hor_dia + " " + horario[0].hor_catedra + " " + horario[0].hor_seccion_catedra;
        console.log("CATEDRA " + catedra);
        var allSessions = [];
        var contador= 0;
        var hora_inicio = 0;
        var min_hora_inicio = 0;
        var hora_fin = 0;
        var min_hora_fin = 0;        
        for (i=0; i< horario.length; i++){ 
              hora_inicio = horario[i].hor_hora_inicio.substr(11,2);
              min_hora_inicio = horario[i].hor_hora_inicio.substr(14,2);
              hora_fin = horario[i].hor_hora_fin.substr(11,2);
              min_hora_fin = horario[i].hor_hora_fin.substr(14,2);

              allSessions.push(new Session(horario[i].hor_catedra, new Date(a_o, mes, dia, hora_inicio, min_hora_inicio), new Date(a_o, mes, dia, hora_fin, min_hora_fin), horario[i].hor_salon ,horario[i].hor_dia, horario[i].hor_id));            
        };
        horarioValidator = allSessions ;
        condicional = true;
        this.filter(allSessions);  
            
    };  

    ConferenceViewModel.prototype.filter = function (horarios) {
        var day = this.selectedDay + 3;
        var textFilter = this.search ? this.search.toLocaleLowerCase() : this.search;
        var filteredSessions = horarios.filter(function (session) {  
            var _dia ;
            if (day === 3){
                _dia = "Lunes";
                console.log("Lunes");
            }else if(day === 4){
                _dia = "Martes";
                console.log("Martes");
            }else if(day === 5){
                _dia = "Miercoles";
                console.log("Miercoles");
            }else if(day === 6){
                _dia = "Jueves";
                console.log("Jueves");
            }else if(day === 7){
                _dia = "Viernes";
                console.log("Viernes");
            }            
                     
            var include = //(session.start.getDate() === day) &&
                (session.dia === _dia) &&
                (!textFilter || session.title.toLocaleLowerCase().indexOf(textFilter) >= 0);
                //console.log(" Session get date  "+ session.start.getDate());
                //console.log(" day  "+ day);
            if (include) {
                session.cssClass = "session-favorite";
            }
            return include;
        });
        this.set("sessions", filteredSessions);        

    };
    ConferenceViewModel.prototype.reportarAsistencia = function(index) {            
        var idHorario = index;
        console.log("id de la catedra " + idHorario);
        //opcion 1. guardar en una local y hacer directo el topmost
        //ls_id('horario-id', idHorario);  
       // topmost().navigate("views/Menu/reportar asistencia/reportar asistencia");
        //opcion 2. hacer navigationOptions y enviar por alli la variable id        
             var navigationOptions= {
                            moduleName:'views/Menu/reportar asistencia/reportar asistencia',
                            context:{ 
                                horarioId: idHorario,                             
                            }
                        }                                           
                        frameModule.topmost().navigate(navigationOptions); 
        //};
        }; 

        ConferenceViewModel.prototype.consultarAsistencias = function(index) {
            var horarioID = index;
            console.log("id de la catedra " + horarioID);

            Asistencias(horarioID)
        .catch(function(error) {  
              console.log("CAtch de la funtion consultar asistencias");        
              dialogsModule.alert({
                    message: "No se pudo encontrar la lista de asistencias que busca",
                    okButtonText: "OK"
              });
              console.log("No consiguio las asistencias asistenciajs");
              return Promise.reject();
        })
        .then(function(respuesta1) {   
              ls_asistencia('asistencias', respuesta1);     
              console.log(ls_asistencia.get('asistencias'));    
              console.log("IF RESPUESTA "); 
                                                     
            topmost().navigate("views/ConsultarAsistencia/ConsultarAsistencia");

         });                                           
                       
        };   

    return ConferenceViewModel;
}(observable.Observable));

exports.ConferenceViewModel = ConferenceViewModel;
exports.instance = new ConferenceViewModel();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmVyZW5jZS12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmVyZW5jZS12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLDRDQUErQztBQUcvQyxvQkFBb0IsSUFBVTtJQUMxQixJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN6QyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFBO0FBQ3JILENBQUM7QUFFRCxvQkFBb0IsSUFBVTtJQUMxQixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBR0Q7SUFBNkIsMkJBQXFCO0lBQzlDLGlCQUNXLEtBQWEsRUFDYixLQUFXLEVBQ1gsR0FBUyxFQUNULElBQVksRUFDWixXQUFvQixFQUNwQixRQUFpQjtRQU41QixZQU9JLGlCQUFPLFNBRVY7UUFSVSxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsV0FBSyxHQUFMLEtBQUssQ0FBTTtRQUNY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QkFBdUIsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDOUcsU0FBUztJQUNULElBQUksT0FBTyxDQUFDLG9DQUFvQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztJQUN2SCxJQUFJLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7SUFDNUcsSUFBSSxPQUFPLENBQUMsNENBQTRDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0lBQ2xJLElBQUksT0FBTyxDQUFDLHVDQUF1QyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENB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