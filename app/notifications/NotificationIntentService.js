com.pip3r4o.android.app.IntentService.extend("com.tns.notifications.NotificationIntentService", {
    onHandleIntent: function (intent) {
        var action = intent.getAction();
        if ("ACTION_START" == action) {
            processStartNotification();
        }

        android.support.v4.content.WakefulBroadcastReceiver.completeWakefulIntent(intent);
    }
});

  var ls_horario = require('local-storage');
  var horario = ls_horario.get('horario_profesor');
  
function processStartNotification() {
        var ls_profesor = require('local-storage');
        var ls_salon = require('local-storage');
        var ls_lugar = require('local-storage');
        var ls_gps = require('local-storage');
        var ls_horaInicio = require('local-storage');
        var ls_horaFin = require('local-storage');
        var ls_magnetometro = require('local-storage');
        var geolocation = require("nativescript-geolocation");
        var ls_i = require('local-storage');
        var magnetometer = require("nativescript-accelerometer");
        var services = require("../service-helper");
        var utils = require("utils/utils");
        var dia;
        var diaHorario;
        var horaAndroid = java.lang.System.currentTimeMillis();
        var fechaAndroidReal = new Date(horaAndroid);
        var diaSemana = fechaAndroidReal.getDay();
        var horaFormato;
        var minutoFormato;
        //var magnetometer;
        var gps;
        var d;
        var lugar;
        var counter = 500;
        var pro_id = ls_profesor.get('id');
        var miObjeto = function (vx, vy, vz) {
            this.vx = vx || '';
            this.vy = vy || '';
            this.vz = vz || '';
            this.pro_id =  ls_profesor.get('id') || '';
        };
        var objeto;
        var intervalo;
        var intervalo1;
        var ArregloNuevo = []; 
        var data1;
        var counter1 = 60000;
        var ls_l1207 = require('local-storage');
        var ls_l1208 = require('local-storage');
        var ls_l1209 = require('local-storage');
        var ls_l1210 = require('local-storage');
        var ls_l1211 = require('local-storage');
        var ls_l1212 = require('local-storage');
        var ls_l1213 = require('local-storage');
        var ls_pasillo = require('local-storage');
        var ls_ninguno = require('local-storage');
        var idHorario;
        var ls_idHorario = require('local-storage');
        var mensaje;
        var mensajeTitulo;
        var resultadoFinal;
        var ls_preferencias = require('local-storage');
        var preferencias = ls_preferencias.get('preferencias');  
        var ls_minutosClase = require('local-storage'); 
        var minutosParaClase;   
        var minutoArreglado;       

        if (fechaAndroidReal.getHours() == 1 || fechaAndroidReal.getHours() == 2 || fechaAndroidReal.getHours() == 3 
        || fechaAndroidReal.getHours() == 4 || fechaAndroidReal.getHours() == 5 || fechaAndroidReal.getHours() == 6 
        || fechaAndroidReal.getHours() == 7 || fechaAndroidReal.getHours() == 8 || fechaAndroidReal.getHours() == 9 || fechaAndroidReal.getHours() == 0) {
        
        horaFormato = "0" + fechaAndroidReal.getHours();
        } else {
            horaFormato = fechaAndroidReal.getHours();
        }

        if (fechaAndroidReal.getMinutes() == 1 || fechaAndroidReal.getMinutes() == 2 || fechaAndroidReal.getMinutes() == 3 
        || fechaAndroidReal.getMinutes() == 4 || fechaAndroidReal.getMinutes() == 5 || fechaAndroidReal.getMinutes() == 6 
        || fechaAndroidReal.getMinutes() == 7 || fechaAndroidReal.getMinutes() == 8 || fechaAndroidReal.getMinutes() == 9 || fechaAndroidReal.getMinutes() == 0) {
        
        minutoFormato = "0" + fechaAndroidReal.getMinutes();
        } else {
            minutoFormato = fechaAndroidReal.getMinutes();
        }

        var horaActual = horaFormato + ":" + minutoFormato;
        var hora_inicio = 0;
        var min_hora_inicio = 0;
        var hora_fin = 0;
        var min_hora_fin = 0;   
        var horaClase;
        var horaFin;

            // AQUI SE COMPARA HORARIO
        if (diaSemana == 1) {
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
        } else if (diaSemana == 0) {
            dia = 'Domingo';
            console.log("El dia de la semana es:" + " " + dia);
        }
        console.log("Hora REAL ANDROID" + " " + horaActual);
        console.log("fecha y dia de hora android" + " " + diaSemana + " " + fechaAndroidReal.getDate() + "/" + 
        ((fechaAndroidReal.getMonth()) + 1) + "/" + fechaAndroidReal.getFullYear());                
        //Se comparan las horas
        if (ls_lugar.get('lugar') == null) {
               /*if (horaFormato >= 15 && minutoFormato >=30) {
                        services.stopAlarm();
                    }*/
        for (i=0; i< horario.length; i++){ 
             /*  if (horaFormato >= 15 && minutoFormato >=30) {
                        services.stopAlarm();
                    }*/
                console.log("Vamos por la i" + ":" + i);    
                diaHorario = horario[i].hor_dia;
                hora_inicio = horario[i].hor_hora_inicio.substr(11,2);
                min_hora_inicio = horario[i].hor_hora_inicio.substr(14,2);
                hora_fin = horario[i].hor_hora_fin.substr(11,2);
                min_hora_fin = horario[i].hor_hora_fin.substr(14,2);
                idHorario = horario[i].hor_id;
                console.log(horario[i].hor_dia + " i " + i);
                if (diaHorario == dia) {
                horaClase = hora_inicio + ":" + min_hora_inicio;
                horaFin = hora_fin + ":" + min_hora_fin;
              //  if (hora_inicio - fechaAndroidReal.getHours() == 1 ){ //DESCOMENTAR AL FINAL
                  if (min_hora_inicio == 00) {
                    console.log("entro minutos 00");
                    minutoArreglado = 60;
                    minutosParaClase = Math.abs(minutoArreglado - fechaAndroidReal.getMinutes());
                    console.log("minutos para la clase localstorage" + " " + ls_minutosClase.get('clase'));
                    if (ls_minutosClase.get('clase') == null) {
                        console.log("local minutos null");
                        if (minutosParaClase > 0 && minutosParaClase <= 15){
                        console.log("minutos para la clase" + " " + minutosParaClase);
                         for (i=0; i< preferencias.length; i++){
                            console.log("nombre "+preferencias[i].pre_nombre + " Status " + preferencias[i].pre_status );
                                    if (preferencias[i].pre_nombre == "15 min antes de clase" && preferencias[i].pre_status == true) {
                                    mensajeTitulo = "Notificacion de Clase"
                                    mensaje = "Clase empieza en 15 min";
                                    sendNotification(mensajeTitulo, mensaje, utils);
                                    //POST DE LA NOTIFICACION                                
                                    insertarNotificacion(pro_id,mensaje)
                                    .catch(function(error) {
                                        console.log(error);          
                                        console.log("No PUDO insertar notificacion");
                                        return Promise.reject();
                                    })
                                    .then(function() {
                                        console.log("Se inserto correctamente la notificacion");                               
                                    });   
                                    }
                                } 
                        ls_minutosClase('clase',true);
                        }
                    }
                    } else {
                        console.log("entro minutos no 00");
                  //  minutoArreglado = 60 + min_hora_inicio;
                    minutosParaClase = Math.abs(min_hora_inicio - fechaAndroidReal.getMinutes()); // cambiar por minutoArreglado cuando la resta de hrs es = 1
                    console.log("minutos para la clase localstorage" + " " + ls_minutosClase.get('clase'));
                    if (ls_minutosClase.get('clase') == null) {
                     console.log("local minutos null");
                        if (minutosParaClase > 0 && minutosParaClase <= 15){
                        console.log("minutos para la clase" + " " + minutosParaClase);
                        /* for (i=0; i< preferencias.length; i++){
                            console.log("nombre "+preferencias[i].pre_nombre + " Status " + preferencias[i].pre_status );
                                    if (preferencias[i].pre_nombre == "15 min antes de clase" && preferencias[i].pre_status == true) {
                                    mensajeTitulo = "Notificacion de Clase"
                                    mensaje = "Clase empieza en 15 min";
                                    sendNotification(mensajeTitulo, mensaje, utils);
                                    //POST DE LA NOTIFICACION                                
                                    insertarNotificacion(pro_id,mensaje)
                                    .catch(function(error) {
                                        console.log(error);          
                                        console.log("No PUDO insertar notificacion");
                                        return Promise.reject();
                                    })
                                    .then(function() {
                                        console.log("Se inserto correctamente la notificacion");                               
                                    });   
                                    }
                                } */ // solo falta probar preferencias para q las notificaciones se envíen
                        ls_minutosClase('clase',true);
                        }
                    }

                    }
              // }
             
                /*  if (horaFormato >= 15 && minutoFormato >=30) {
                                        services.stopAlarm();
                                    }*/
                if (horaActual >= horaClase) {
                    /*if (horaFormato >= 15 && minutoFormato >=30) {
                        services.stopAlarm();
                    }*/
                    salonClase = horario[i].hor_salon;
                    ls_salon('salon',salonClase);
                    ls_horaInicio('inicio',horaClase);
                    ls_horaFin('fin',horaFin);
                    ls_idHorario('idHorario',idHorario);
                    console.log("Su clase es en el salon:" + " " + salonClase);
                    console.log("salon" + " " + ls_salon.get('salon'));
                    console.log("inicio" + " " + ls_horaInicio.get('inicio'));
                    console.log("fin" + " " + ls_horaFin.get('fin'));
                    ls_l1207('l1207',0) ;
                    ls_l1208('l1208',0) ;
                    ls_l1209('l1209',0) ;
                    ls_l1210('l1210',0) ;
                    ls_l1211('l1211',0) ;
                    ls_l1212('l1212',0) ;
                    ls_l1213('l1213',0) ;
                    ls_pasillo('pasillo',0) ;
                    ls_ninguno('ninguno',0) ;   
                    ls_i('i',i);  
                    console.log("local storage de i" + " " + ls_i.get('i'));          
                    //Se consulta si el tlf tiene gps
                    if (ls_gps.get('gps') == null) {
                        //gps = hasSystemFeature1('android.hardware.location.gps');
                        gps = hasSystemFeature1('l_gps');
                        console.log("Su dispositivo tiene gps?:" + " " + gps);
                        ls_gps('gps',gps);
                    } 
                    if (ls_gps.get('gps') == true) {
                        //Se enciende el gps
                        if (!geolocation.isEnabled() || (geolocation.isEnabled())) {
                            if(!geolocation.isEnabled()){
                                    geolocation.enableLocationRequest();
                                    console.log("habilitando gps");
                            }
                            console.log("El gps esta encendido");
                            //Aqui se hace automatico el llamado a las coordenadas del GPS  
                            var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
                            then(function(loc) {
                                if (loc) {
                                    d = getCoordenadasGPS(loc);                                    
                                    console.log("Esta es la distancia del radio" + " " + d);
                                    //Se compara la distancia obtenida con la tolerancia en mts
                                    if (d <= 100) {
                                        ValidarClase(ls_magnetometro,horaActual,ls_horaInicio,ls_horaFin,ls_lugar,ls_salon, magnetometer,data1,objeto,intervalo,intervalo1,ArregloNuevo,ls_pasillo,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_ninguno,counter1,counter,miObjeto,pro_id,ls_i);
                                        console.log("Jesus Lugar en " + " " + ls_lugar.get('lugar'));
                                        console.log("Jesus Magnetometro " + " " + ls_magnetometro.get('magnetometro'));
                                    } else{
                                        console.log("No esta en la UCAB/CASA");
                                        if (horaActual >= ls_horaInicio.get('inicio') && horaActual < ls_horaFin.get('fin')){
                                        console.log("La clase no se ha terminado 2");
                                        //Se debe esperar a que termine la clase
                                        } else{
                                                console.log("La clase se termino, se marca inasistencia 2");
                                                LimpiarLocalStorage(ls_salon,ls_lugar,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_pasillo,ls_ninguno,ls_magnetometro,ls_horaInicio,ls_horaFin,ls_minutosClase,ls_idHorario,diaHorario,hora_inicio,min_hora_inicio,hora_fin,min_hora_fin,idHorario,horaClase,horaFin);   
                                                horario.splice(ls_i.get('i'),1);     
                                                console.dir(horario);                                                                                             
                                        //Aqui se debe hacer el post de inasistencia
                                           inasistencia(ls_idHorario.get('idHorario'),fechaAndroidReal)
                                            .catch(function(error) {
                                                    console.log(error);                                        
                                                    console.log("No PUDO REPORTAR ASISTENCIA inasistencia");
                                                    return Promise.reject();
                                                })
                                                .then(function() {
                                                    console.log("Inasistencia reportada exitosamente");
                                                });
                                                }
                                    }   
                                }                                
                            }, function(e){
                                console.log("Error: " + e.message);
                                });                
                        } 
                    }else{
                        console.log("Su dispositivo no tiene GPS");
                        //SE DEBE PREGUNTAR POR LA HORA Y DAR LA NOTIFICACION AL FINALIZAR
                        if (horaActual >= ls_horaInicio.get('inicio') && horaActual < ls_horaFin.get('fin')){
                            console.log("La clase no se ha terminado 5");
                        } else{
                                console.log("La clase ya termino, se envia notificacion al profesor por no tener gps 5");    
                                LimpiarLocalStorage(ls_salon,ls_lugar,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_pasillo,ls_ninguno,ls_magnetometro,ls_horaInicio,ls_horaFin,ls_minutosClase,ls_idHorario,diaHorario,hora_inicio,min_hora_inicio,hora_fin,min_hora_fin,idHorario,horaClase,horaFin);                                                   
                                console.log("Su dispositivo no tiene gps");
                                horario.splice(ls_i.get('i'),1);     
                                 console.dir(horario); 
                                //AQUI SE ENVIA NOTIFICACION 
                            for (i=0; i< preferencias.length; i++){ 
                                console.log("nombre "+preferencias[i].pre_nombre + " Status " + preferencias[i].pre_status );
                                if (preferencias[i].pre_nombre == "Firma en escuela" && preferencias[i].pre_status == true) {
                                   console.log("falla de hardware");
                                    mensajeTitulo = "Falla de hardware"
                                    mensaje = "Firme Asistencia en escuela";
                                    sendNotification(mensajeTitulo, mensaje, utils);

                                    //POST DE LA NOTIFICACION                                
                                    insertarNotificacion(pro_id,mensaje)
                                    .catch(function(error) {
                                        console.log(error);          
                                        console.log("No PUDO insertar notificacion");
                                        return Promise.reject();
                                    })
                                    .then(function() {
                                        console.log("Se inserto correctamente la notificacion");                               
                                    });   
                                }
                             }  
                             }                        
                    }                            
                } else {
                    console.log("Las horas no son iguales");
                     /* if (horaFormato >= 15 && minutoFormato >=30) {
                        services.stopAlarm();
                    }*/
                }              
                } else {
                    console.log("Los dias no son iguales");
                     /* if (horaFormato >= 15 && minutoFormato >=30) {
                        services.stopAlarm();
                    }*/
                }
        };
         /* if (horaFormato >= 15 && minutoFormato >=30) {
                        services.stopAlarm();
                    }*/
       } else if (ls_salon.get('salon') != null && ls_lugar.get('lugar') == "UCAB" && ls_magnetometro.get('magnetometro') != null) {
            console.log("ELSE DE LUGAR");
            //Aqui se deberia preguntar por la hora final de la clase para terminar el proceso
            if (horaActual >= ls_horaInicio.get('inicio') && horaActual < ls_horaFin.get('fin')){
                console.log("La clase no se ha terminado 6");
                //Los calculos de localizacion deben seguirse haciendo
                if (ls_magnetometro.get('magnetometro') == true) {
                    console.log("Su dispositivo tiene magnetometro else salon,lugar true");
                    //Aqui se toman las mediciones
                        MedirMagnetometro(magnetometer,data1,objeto,intervalo,intervalo1,ArregloNuevo,ls_pasillo,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_ninguno,counter1,counter,miObjeto,pro_id,ls_magnetometro);
                }   
            } else{
                console.log("Se termino la clase 6");                 
                if (ls_magnetometro.get('magnetometro') == false) {                            
                    console.log("Su dispositivo no tiene magnetometro");
                     LimpiarLocalStorage(ls_salon,ls_lugar,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_pasillo,ls_ninguno,ls_magnetometro,ls_horaInicio,ls_horaFin,ls_minutosClase,ls_idHorario,diaHorario,hora_inicio,min_hora_inicio,hora_fin,min_hora_fin,idHorario,horaClase,horaFin); 
                     horario.splice(ls_i.get('i'),1);     
                     console.dir(horario);                    
                    //AQUI SE ENVIA NOTIFICACION //FALTA EL POST
                     for (i=0; i< preferencias.length; i++){ 
                          console.log("nombre "+preferencias[i].pre_nombre + " Status " + preferencias[i].pre_status );
                         if (preferencias[i].pre_nombre == "Reporte Manual" && preferencias[i].pre_status == true) {
                            mensajeTitulo = "Falla de hardware"
                            mensaje = "Reporte Asistencia Manual";
                            sendNotification(mensajeTitulo, mensaje, utils);                                            
                          //POST DE LA NOTIFICACION
                          //Hay que validar si el profesor quiere que se reporte manual o se firme en escuela sin magnetometro                                
                                insertarNotificacion(pro_id,mensaje)
                                .catch(function(error) {
                                    console.log(error);          
                                    console.log("No PUDO insertar notificacion");
                                    return Promise.reject();
                                })
                                .then(function() {
                                    console.log("Se inserto correctamente la notificacion");                               
                                });  
                         }
                     }                   
                } else{
                    console.log("La clase se termino y deben sacarse porcentajes de localizacion 5");
                    //Deben sacarse porcentajes de localizacion y dar respuesta
                    resultadoFinal = GetLocation(ls_pasillo,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_ninguno);
                            //Debe compararse el resultado final con el salon donde debe estar
                            console.log("resultadoFinal " + resultadoFinal + " " + " ls_salon "+ ls_salon.get('salon'));
                            if(resultadoFinal == ls_salon.get('salon')){
                                //Se hace el post de asistencia automatica
                                asistenciaAutomatica(ls_idHorario.get('idHorario'),fechaAndroidReal)
                                .catch(function(error) {
                                    console.log(error);                       
                                    console.log("No PUDO REPORTAR ASISTENCIA automatica");
                                    //Se envia notificacion al profesor para que reporte manual en caso de falla
                                 for (i=0; i< preferencias.length; i++){ 
                                    console.log("nombre "+preferencias[i].pre_nombre + " Status " + preferencias[i].pre_status );
                                   if (preferencias[i].pre_nombre == "Reporte Manual" && preferencias[i].pre_status == true) {
                                       console.log("if de preferencias");
                                    mensajeTitulo = "Reporte de Asistencia"
                                    mensaje = "Reporte Asistencia Manual";
                                    sendNotification(mensajeTitulo, mensaje, utils);                                                                                      
                                        //POST DE LA NOTIFICACION
                                                        insertarNotificacion(pro_id,mensaje)
                                                        .catch(function(error) {
                                                            console.log(error);          
                                                            console.log("No PUDO insertar notificacion");
                                                            return Promise.reject();
                                                        })
                                                        .then(function() {
                                                            console.log("Se inserto correctamente la notificacion");                               
                                                        }); 
                                   }
                                 }
                                    return Promise.reject();
                                })
                                .then(function() {
                                    console.log("Asistencia automatica reportada exitosamente");
                                     //Se envia notificacion al profesor de reporte exitoso
                                     mensajeTitulo = "Asistencia Automática"
                                     mensaje = "Se reportó su asistencia con éxito";
                                     sendNotification(mensajeTitulo, mensaje, utils);                                          
                                        //POST DE LA NOTIFICACION
                                                        insertarNotificacion(pro_id,mensaje)
                                                        .catch(function(error) {
                                                            console.log(error);          
                                                            console.log("No PUDO insertar notificacion");
                                                            return Promise.reject();
                                                        })
                                                        .then(function() {
                                                            console.log("Se inserto correctamente la notificacion");                               
                                                        }); 
                                });
                                 LimpiarLocalStorage(ls_salon,ls_lugar,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_pasillo,ls_ninguno,ls_magnetometro,ls_horaInicio,ls_horaFin,ls_minutosClase,ls_idHorario,diaHorario,hora_inicio,min_hora_inicio,hora_fin,min_hora_fin,idHorario,horaClase,horaFin);   
                                 horario.splice(ls_i.get('i'),1);     
                                 console.dir(horario);                                
                            } else {
                                //Se notifica al profesor que no esta en el salon y se hace post de notificacion
                              for (i=0; i< preferencias.length; i++){ 
                                 console.log("nombre "+preferencias[i].pre_nombre + " Status " + preferencias[i].pre_status );
                                 if (preferencias[i].pre_nombre == "Reporte Manual" && preferencias[i].pre_status == true) {
                                 mensajeTitulo = "No está en el salón"
                                 mensaje = "Reporte Asistencia Manual";
                                 sendNotification(mensajeTitulo, mensaje, utils);                                                                                 
                                    //POST DE LA NOTIFICACION
                                                    insertarNotificacion(pro_id,mensaje)
                                                    .catch(function(error) {
                                                        console.log(error);          
                                                        console.log("No PUDO insertar notificacion");
                                                        return Promise.reject();
                                                    })
                                                    .then(function() {
                                                        console.log("Se inserto correctamente la notificacion");                               
                                                    });  
                                 }
                              }
                                        LimpiarLocalStorage(ls_salon,ls_lugar,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_pasillo,ls_ninguno,ls_magnetometro,ls_horaInicio,ls_horaFin,ls_minutosClase,ls_idHorario,diaHorario,hora_inicio,min_hora_inicio,hora_fin,min_hora_fin,idHorario,horaClase,horaFin);  
                                        horario.splice(ls_i.get('i'),1);     
                                        console.dir(horario);                                       
                            }
                }
            }
        }             
}
function getCoordenadasGPS(loc){
    console.log("tus coordenadas" + loc.latitude + " " + loc.longitude );
    var lat1 = loc.latitude;
    var lon1 = (loc.longitude);
    var lat2 = 10.464803656000619; //Oriana 
    var lon2 = (-66.86167079430855); // Oriana
    //var lat2 = 10.517192;           //Jesus
    //var lon2 = (-66.903673);        //Jesus
        /////////////DISTANCIA RADIAL
    var R = 6371e3; // metres                  
    var e = (lat1) * (Math.PI/180); //var φ1 = lat1.toRadians();                   
    var f = (lat2) * (Math.PI/180); //var φ2 = lat2.toRadians();                 
    var g = (lat2-lat1) * (Math.PI/180); //(lat2-lat1).toRadians();               
    var h = (lon2-lon1) * (Math.PI/180); //(lon2-lon1).toRadians();                 
            //var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            //Math.cos(φ1) * Math.cos(φ2) *
            // Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var a = (Math.sin(g/2)) * (Math.sin(g/2)) + 
            (Math.cos(e)) * (Math.cos(f)) *
            (Math.sin(h/2)) * (Math.sin(h/2));                                    
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));                                
    var d = R * c;

    return d;
}
function ValidarClase(ls_magnetometro,horaActual,ls_horaInicio,ls_horaFin,ls_lugar,ls_salon,magnetometer,data1,objeto,intervalo,intervalo1,ArregloNuevo,ls_pasillo,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_ninguno,counter1,counter,miObjeto,pro_id,ls_i){
    var ls_profesor = require('local-storage');
    var ls_salon = require('local-storage');
    var ls_idHorario = require('local-storage');
    var magnetometer1;
    var services = require("../service-helper");
    var utils = require("utils/utils");
    var horaAndroid = java.lang.System.currentTimeMillis();
    var fechaAndroidReal = new Date(horaAndroid);
    var counter = 500;
    var mensaje;
    var mensajeTitulo;
    var resultadoFinal;
    console.log("Esta en la UCAB/CASA");
    lugar = "UCAB";
    ls_lugar('lugar',lugar);
    console.log("Lugar" + " " + ls_lugar.get('lugar'));
    //Se consulta si el tlf tiene magnetometro
    if (ls_magnetometro.get('magnetometro') == null) {
        //magnetometer = hasSystemFeature1('android.hardware.sensor.compass');                               
        magnetometer1 = hasSystemFeature1('l_magnetometro');
        console.log("Su dispositivo tiene magnetometro?:" + " " + magnetometer1);
        ls_magnetometro('magnetometro',magnetometer1);
    } 
    if (horaActual >= ls_horaInicio.get('inicio') && horaActual < ls_horaFin.get('fin')){
        console.log("La clase no se ha terminado 1");                        
        //Se deben hacer calculos de localizacion
        if (ls_magnetometro.get('magnetometro') == true) {
            console.log("Su dispositivo tiene magnetometro funcion gps encendido primera vez");
            //Aqui se toman las mediciones 
                 MedirMagnetometro(magnetometer,data1,objeto,intervalo,intervalo1,ArregloNuevo,ls_pasillo,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_ninguno,counter1,counter,miObjeto,pro_id,ls_magnetometro);
        }                             
    } else{
        console.log("La clase se termino 1");    
        if (ls_magnetometro.get('magnetometro') == false) {                            
            console.log("Su dispositivo no tiene magnetometro");  
            LimpiarLocalStorage(ls_salon,ls_lugar,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_pasillo,ls_ninguno,ls_magnetometro,ls_horaInicio,ls_horaFin,ls_minutosClase,ls_idHorario,diaHorario,hora_inicio,min_hora_inicio,hora_fin,min_hora_fin,idHorario,horaClase,horaFin);     horario.splice(ls_i.get('i'),1);     
            console.dir(horario); 
            //AQUI SE ENVIA NOTIFICACION //FALTA EL POST
             for (i=0; i< preferencias.length; i++){ 
                console.log("nombre "+preferencias[i].pre_nombre + " Status " + preferencias[i].pre_status );
                if (preferencias[i].pre_nombre == "Reporte Manual" && preferencias[i].pre_status == true) {
                    mensajeTitulo = "Falla de hardware"
                    mensaje = "Reporte Asistencia Manual";
                    sendNotification(mensajeTitulo, mensaje, utils);                                                                                                         
                    //POST DE LA NOTIFICACION
                                insertarNotificacion(pro_id,mensaje)
                                .catch(function(error) {
                                    console.log(error);          
                                    console.log("No PUDO insertar notificacion");
                                    return Promise.reject();
                                })
                                .then(function() {
                                    console.log("Se inserto correctamente la notificacion");                               
                                }); 
                }
             }                               
        } else{
                console.log("La clase se termino y deben sacarse porcentajes de localizacion 1");
                        //Deben sacarse porcentajes de localizacion y dar respuesta      
               resultadoFinal = GetLocation(ls_pasillo,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_ninguno);
                //Debe compararse el resultado final con el salon donde debe estar
                if(resultadoFinal == ls_salon.get('salon')){
                    //Se hace el post de asistencia automatica
                    asistenciaAutomatica(ls_idHorario.get('idHorario'),fechaAndroidReal)
                     .catch(function(error) {
                        console.log(error);                       
                        console.log("No PUDO REPORTAR ASISTENCIA automatica");
                         //Se envia notificacion al profesor para que reporte manual en caso de falla
                          for (i=0; i< preferencias.length; i++){ 
                            console.log("nombre "+preferencias[i].pre_nombre + " Status " + preferencias[i].pre_status );
                            if (preferencias[i].pre_nombre == "Reporte Manual" && preferencias[i].pre_status == true) {
                                    mensajeTitulo = "Reporte de Asistencia"
                                    mensaje = "Reporte Asistencia Manual";
                                    sendNotification(mensajeTitulo, mensaje, utils);                               
                            //POST DE LA NOTIFICACION
                                            insertarNotificacion(pro_id,mensaje)
                                            .catch(function(error) {
                                                console.log(error);          
                                                console.log("No PUDO insertar notificacion");
                                                return Promise.reject();
                                            })
                                            .then(function() {
                                                console.log("Se inserto correctamente la notificacion");                               
                                            });
                            }
                          }  
                        return Promise.reject();
                    })
                    .then(function() {
                        console.log("Asistencia automatica reportada exitosamente");
                        //Se envia notificacion al profesor de reporte exitoso
                        mensajeTitulo = "Asistencia Automática"
                        mensaje = "Se reportó su asistencia con éxito";
                        sendNotification(mensajeTitulo, mensaje, utils);                              
                            //POST DE LA NOTIFICACION
                                            insertarNotificacion(pro_id,mensaje)
                                            .catch(function(error) {
                                                console.log(error);          
                                                console.log("No PUDO insertar notificacion");
                                                return Promise.reject();
                                            })
                                            .then(function() {
                                                console.log("Se inserto correctamente la notificacion");                               
                                            });  

                    });
                    LimpiarLocalStorage(ls_salon,ls_lugar,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_pasillo,ls_ninguno,ls_magnetometro,ls_horaInicio,ls_horaFin,ls_minutosClase,ls_idHorario,diaHorario,hora_inicio,min_hora_inicio,hora_fin,min_hora_fin,idHorario,horaClase,horaFin);      
                    horario.splice(ls_i.get('i'),1);     
                    console.dir(horario);               
                } else {
                    //Se notifica al profesor que no esta en el salon y se hace post de notificacion
                     for (i=0; i< preferencias.length; i++){ 
                        console.log("nombre "+preferencias[i].pre_nombre + " Status " + preferencias[i].pre_status );
                        if (preferencias[i].pre_nombre == "Reporte Manual" && preferencias[i].pre_status == true) {
                            mensajeTitulo = "No está en el salón"
                            mensaje = "Reporte Asistencia Manual";
                            sendNotification(mensajeTitulo, mensaje, utils);                         
                        //POST DE LA NOTIFICACION
                                        insertarNotificacion(pro_id,mensaje)
                                        .catch(function(error) {
                                            console.log(error);          
                                            console.log("No PUDO insertar notificacion");
                                            return Promise.reject();
                                        })
                                        .then(function() {
                                            console.log("Se inserto correctamente la notificacion");                               
                                        });  
                        }
                     }
                                        LimpiarLocalStorage(ls_salon,ls_lugar,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_pasillo,ls_ninguno,ls_magnetometro,ls_horaInicio,ls_horaFin,ls_minutosClase,ls_idHorario,diaHorario,hora_inicio,min_hora_inicio,hora_fin,min_hora_fin,idHorario,horaClase,horaFin);   
                                        horario.splice(ls_i.get('i'),1);     
                                        console.dir(horario);                                       
                }                    
         }                               
    }    
}
function MedirMagnetometro(magnetometer,data1,objeto,intervalo,intervalo1,ArregloNuevo,ls_pasillo,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_ninguno,counter1,counter,miObjeto,pro_id,ls_magnetometro){                 
    console.log("medir magnetometro");
    console.log( " Medir magnetometer "+ magnetometer + " data1 " + data1 + " objeto "+objeto + " intervalo " + intervalo + " intervalo1 " + intervalo1 + " arreglo nuevo " +ArregloNuevo + " pasillo "+ ls_pasillo.get('pasillo') + " l1207 " + ls_l1207.get('l1207') + " l1208 " + ls_l1208.get('l1208') + " l1209 "+ ls_l1209.get('l1209') + " 1210 "+ ls_l1210.get('l1210') + " 1211 " + ls_l1211.get('l1211') + " 1212 " + ls_l1212.get('l1212') + " 1213 " + ls_l1213.get('l1213') + " ninguno " + ls_ninguno.get('ninguno') + " counter1 " + counter1 + " counter " + counter + " miobjeto " + miObjeto + " pro_id " + pro_id);
    magnetometer.startMagnetometerUpdates(function (data) {
        data1 = data;
        objeto = new miObjeto(data.x, data.y, data.z, pro_id);    
    });    
    setTimeout(function() {
        console.log("Entre a la funcion setTimeout");
        magnetometer.stopMagnetometerUpdates();
        clearInterval(intervalo);
        clearInterval(intervalo1);
        console.log("Arreglo nuevo data1" + " " + JSON.stringify(ArregloNuevo)); 
        ubicacion(ArregloNuevo)
    .catch(function(error) {
            console.log("catch post ubicacion");
            console.log("No se pudo localizar");
            return Promise.reject();
    }) 
    .then(function(respuesta1) {
            console.log("Respuesta1" + " " + respuesta1._bodyInit);
            console.dir(respuesta1);
            var condicion = respuesta1._bodyInit;
            ArregloNuevo = [];
            switch(condicion) {
                    case "Pasillo":                    
                        ls_pasillo('pasillo',ls_pasillo.get('pasillo')+1);
                        console.log("pasillo");
                    break;
                    case "L1207":
                        ls_l1207('l1207',ls_l1207.get('l1207')+1);
                        console.log("l1207");
                    break;
                    case "L1208":
                        ls_l1208('l1208',ls_l1208.get('l1208')+1);
                        console.log("l1208");
                    break;
                    case "L1209":
                        ls_l1209('l1209',ls_l1209.get('l1209')+1);
                        console.log("l1209");
                    break;
                    case "L1210":
                        ls_l1210('l1210',ls_l1210.get('l1210')+1);
                        console.log("l1210");
                    break;
                    case "L1211":
                        ls_l1211('l1211',ls_l1211.get('l1211')+1);
                        console.log("l1211");
                    break;
                    case "L1212":
                        ls_l1212('l1212',ls_l1212.get('l1212')+1);
                        console.log("l1212");
                    break;
                    case "L1213": 
                        ls_l1213('l1213',ls_l1213.get('l1213')+1);
                        console.log("l1213");
                    break;
                    default:
                        ls_ninguno('ninguno',ls_ninguno.get('ninguno')+1); 
                        console.log("ninguno");                                           
             }
    });
}, counter1);     
                intervalo = setInterval(function () { console.log(" " + " x: " + " " + data1.x + " " + " y: " + " " + data1.y + " " + " z: " + " " + data1.z); }, counter);
                intervalo1 = setInterval(function(){ArregloNuevo.push(objeto)},counter);                
}
function GetLocation(ls_pasillo,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_ninguno){
    var ls_respuesta = require('local-storage');
  //  var resultadoFinal;
    console.log("get location");
            if ((ls_pasillo.get('pasillo') > ls_l1207.get('l1207')) && (ls_pasillo.get('pasillo') > ls_l1208.get('l1208')) && (ls_pasillo.get('pasillo') > ls_l1209.get('l1209')) && (ls_pasillo.get('pasillo') > ls_l1210.get('l1210')) && (ls_pasillo.get('pasillo') > ls_l1211.get('l1211')) &&
               (ls_pasillo.get('pasillo') > ls_l1212.get('l1212')) && (ls_pasillo.get('pasillo') > ls_l1213.get('l1213')) && (ls_pasillo.get('pasillo') > ls_ninguno.get('ninguno'))) { 
                                            console.log("Estoy en: " + ls_pasillo.get('pasillo'));
                                            resultadoFinal = "Pasillo";   
                                            ls_respuesta('respuesta',resultadoFinal);
            } else if  ((ls_l1207.get('l1207') > ls_l1208.get('l1208')) && (ls_l1207.get('l1207') > ls_l1209.get('l1209')) && (ls_l1207.get('l1207') > ls_l1210.get('l1210')) && (ls_l1207.get('l1207') > ls_l1211.get('l1211')) && (ls_l1207.get('l1207') > ls_l1212.get('l1212')) && 
                       (ls_l1207.get('l1207') > ls_l1213.get('l1213')) && (ls_l1207.get('l1207') > ls_ninguno.get('ninguno')) && (ls_l1207.get('l1207') > ls_pasillo.get('pasillo')) &&
                       (ls_l1207.get('l1207') > (ls_l1208.get('l1208') + ls_l1209.get('l1209') + ls_l1210.get('l1210') + ls_l1211.get('l1211') + ls_l1212.get('l1212') + ls_l1213.get('l1213') + + ls_pasillo.get('pasillo') + ls_ninguno.get('ninguno')))){     
                                            console.log("Estoy en: " + ls_l1207.get('l1207'));
                                            resultadoFinal = "L1207";
                                            ls_respuesta('respuesta',resultadoFinal);
            } else if ((ls_l1208.get('l1208') > ls_pasillo.get('pasillo')) && (ls_l1208.get('l1208') > ls_l1207.get('l1207')) && (ls_l1208.get('l1208') > ls_l1209.get('l1209')) && (ls_l1208.get('l1208') > ls_l1210.get('l1210')) && (ls_l1208.get('l1208') > ls_l1211.get('l1211')) &&(ls_l1208.get('l1208') > ls_l1212.get('l1212')) && 
                      (ls_l1208.get('l1208') > ls_l1213.get('l1213')) && (ls_l1208.get('l1208') > ls_ninguno.get('ninguno'))) {                 
                                            console.log("Estoy en: " + ls_l1208.get('l1208'));
                                            resultadoFinal = "L1208";
                                            ls_respuesta('respuesta',resultadoFinal);
            } else if ((ls_l1209.get('l1209') > ls_pasillo.get('pasillo')) && (ls_l1209.get('l1209') > ls_l1207.get('l1207')) && (ls_l1209.get('l1209') > ls_l1208.get('l1208')) && (ls_l1209.get('l1209') > ls_l1210.get('l1210')) && (ls_l1209.get('l1209') > ls_l1211.get('l1211')) && (ls_l1209.get('l1209') > ls_l1212.get('l1212')) && 
                      (ls_l1209.get('l1209') > ls_l1213.get('l1213')) && (ls_l1209.get('l1209') > ls_ninguno.get('ninguno'))) {                               
                                            console.log("Estoy en: " + ls_l1209.get('l1209'));
                                            resultadoFinal = "L1209";
                                            ls_respuesta('respuesta',resultadoFinal);
            } else if ((ls_l1210.get('l1210') > ls_pasillo.get('pasillo')) && (ls_l1210.get('l1210') > ls_l1207.get('l1207')) && (ls_l1210.get('l1210') > ls_l1208.get('l1208')) && (ls_l1210.get('l1210') > ls_l1209.get('l1209')) && (ls_l1210.get('l1210') > ls_l1211.get('l1211')) && 
                      (ls_l1210.get('l1210') > ls_l1212.get('l1212')) && (ls_l1210.get('l1210') > ls_l1213.get('l1213')) && (ls_l1210.get('l1210') > ls_ninguno.get('ninguno'))) {
                                            console.log("Estoy en: " + ls_l1210.get('l1210'));
                                            resultadoFinal = "L1210";
                                            ls_respuesta('respuesta',resultadoFinal);
            } else if ((ls_l1211.get('l1211') > ls_pasillo.get('pasillo')) && (ls_l1211.get('l1211') > ls_l1207.get('l1207')) && (ls_l1211.get('l1211') > ls_l1208.get('l1208')) && (ls_l1211.get('l1211') > ls_l1209.get('l1209')) && (ls_l1211.get('l1211') > ls_l1210.get('l1210')) && (ls_l1211.get('l1211') > ls_l1212.get('l1212')) && 
                      (ls_l1211.get('l1211') > ls_l1213.get('l1213')) && (ls_l1211.get('l1211') > ls_ninguno.get('ninguno'))) {
                                            console.log("Estoy en: " + ls_l1211.get('l1211'));
                                            resultadoFinal = "L1211";
                                            ls_respuesta('respuesta',resultadoFinal);
            } else if ((ls_l1212.get('l1212') > ls_pasillo.get('pasillo')) && (ls_l1212.get('l1212') > ls_l1207.get('l1207')) && (ls_l1212.get('l1212') > ls_l1208.get('l1208')) && (ls_l1212.get('l1212') > ls_l1209.get('l1209')) && (ls_l1212.get('l1212') > ls_l1210.get('l1210')) && (ls_l1212.get('l1212') > ls_l1211.get('l1211')) &&
                      (ls_l1212.get('l1212') > ls_l1213.get('l1213')) && (ls_l1212.get('l1212') > ls_ninguno.get('ninguno'))) {
                                            console.log("Estoy en: " + ls_l1212.get('l1212'));
                                            resultadoFinal = "L1212";
                                            ls_respuesta('respuesta',resultadoFinal);
            } else if ((ls_l1213.get('l1213') > ls_pasillo.get('pasillo')) && (ls_l1213.get('l1213') > ls_l1207.get('l1207')) && (ls_l1213.get('l1213') > ls_l1208.get('l1208')) && (ls_l1213.get('l1213') > ls_l1209.get('l1209')) && (ls_l1213.get('l1213') > ls_l1210.get('l1210')) && (ls_l1213.get('l1213') > ls_l1211.get('l1211')) &&
                      (ls_l1213.get('l1213') > ls_l1212.get('l1212')) && (ls_l1213.get('l1213') > ls_ninguno.get('ninguno'))) {
                                            console.log("Estoy en: " + ls_l1213.get('l1213'));
                                            resultadoFinal = "L1213";
                                            ls_respuesta('respuesta',resultadoFinal);
            } else if ((ls_ninguno.get('ninguno') > ls_pasillo.get('pasillo')) && (ls_ninguno.get('ninguno') > ls_l1207.get('l1207')) && (ls_ninguno.get('ninguno') > ls_l1208.get('l1208')) && (ls_ninguno.get('ninguno') > ls_l1209.get('l1209')) && (ls_ninguno.get('ninguno') > ls_l1210.get('l1210')) && 
                      (ls_ninguno.get('ninguno') > ls_l1211.get('l1211')) && (ls_ninguno.get('ninguno') > ls_l1212.get('l1212')) && (ls_ninguno.get('ninguno') > ls_l1213.get('l1213'))){                                           
                                            console.log("Estoy en: " + ls_ninguno.get('ninguno'));
                                            resultadoFinal = "Ninguno";
                                            ls_respuesta('respuesta',resultadoFinal);
            }

    return resultadoFinal;
}
function LimpiarLocalStorage(ls_salon,ls_lugar,ls_l1207,ls_l1208,ls_l1209,ls_l1210,ls_l1211,ls_l1212,ls_l1213,ls_pasillo,ls_ninguno,ls_magnetometro,ls_horaInicio,ls_horaFin,ls_minutosClase,ls_idHorario,diaHorario,hora_inicio,min_hora_inicio,hora_fin,min_hora_fin,idHorario,horaClase,horaFin){
    console.log("Limpiando local storage");
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
    ls_idHorario('idHorario',null);
    diaHorario = null;
    hora_inicio = 0;
    min_hora_inicio =0;
    hora_fin = 0;
    min_hora_fin = 0;
    idHorario = 0;
    horaClase = null;
    horaFin = null;    
}
function getDeleteIntent(context) {
        var intent = new android.content.Intent(context, java.lang.Class.forName("com.tns.broadcastreceivers.NotificationEventReceiver"));
        intent.setAction("ACTION_DELETE_NOTIFICATION");
        return android.app.PendingIntent.getBroadcast(context, 0, intent, android.app.PendingIntent.FLAG_UPDATE_CURRENT);
}
function hasSystemFeature1 (feature) {
    var application = require("application");
    var packageManager = application.android.context.getPackageManager();
    var pruebaMagnetometro = packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_SENSOR_COMPASS);
    var pruebaGPS = packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_LOCATION_GPS);
    var activity = application.android.foregroundActivity;
    var sensorManager = activity.getSystemService(android.content.Context.SENSOR_SERVICE);
    var magnetometerSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_MAGNETIC_FIELD);
    var magnetometerSensorVersion = magnetometerSensor.getVersion();
    console.log("version "+ magnetometerSensorVersion);
    if (feature == 'l_gps')
    {
        return pruebaGPS;
    } else if (feature == 'l_magnetometro' && magnetometerSensorVersion == 1){
        return pruebaMagnetometro;
    } else if ((feature == 'l_magnetometro' && magnetometerSensorVersion != 1)){
        pruebaMagnetometro = false;
        return pruebaMagnetometro;
    }
    return false;
}
function handleErrors(response) {
    if (!response.ok) {
        console.log("HANDLE ERROR");
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
function sendNotification(mensajeTitulo, mensaje, utils){
    var context = utils.ad.getApplicationContext();
    var builder = new android.app.Notification.Builder(context);
        builder.setContentTitle(mensajeTitulo)
               .setAutoCancel(true)                                                
               .setContentText(mensaje)
               .setVibrate([100, 200, 100])
               .setSmallIcon(android.R.drawable.btn_star_big_on);
    // will open main NativeScript activity when the notification is pressed
    var mainIntent = new android.content.Intent(context, java.lang.Class.forName("com.tns.NativeScriptActivity")); 
    var pendingIntent = android.app.PendingIntent.getActivity(context,
                        1,
                        mainIntent,
                        android.app.PendingIntent.FLAG_UPDATE_CURRENT);
                        builder.setContentIntent(pendingIntent);
                        builder.setDeleteIntent(getDeleteIntent(context));
                        var manager = context.getSystemService(android.content.Context.NOTIFICATION_SERVICE);
                        manager.notify(1, builder.build());

}
function ubicacion(ArregloNuevo){    
    var config = require("../shared/config");
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
function inasistencia(idHor,fechaActual){    
    var config = require("../shared/config");
    console.log("POST de inasistencia entro");
    return fetch(config.apiUrl + "asistencias" , { 
        method: "POST",
        body: JSON.stringify({
            fecha: fechaActual.getDate() + "/" + ((fechaActual.getMonth()) + 1) + "/" + fechaActual.getFullYear(),
            estado: false,
            tipo: "Inasistencia",
            hor_id: idHor,
            jus_id: 0,
            observacion: "" 
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
        
}
function insertarNotificacion(idPro,mensajito){    
    var config = require("../shared/config");
    console.log("POST de insertar notificacion entro");
    return fetch(config.apiUrl + "profesores/notificaciones/notificacion", { 
        method: "POST",
        body: JSON.stringify({
            usu_id: idPro,
            mensaje: mensajito						
        }),
        headers: {            
            "Content-Type": "application/json"
        }
    })
    .then(handleErrors)
    .then(function(response) {
        return response.json();
    })        
}
function asistenciaAutomatica(idHor,fechaActual){    
    var config = require("../shared/config");
    console.log("POST de asistencia automatica entro");
    return fetch(config.apiUrl + "asistencias" , { 
        method: "POST",
        body: JSON.stringify({
            fecha: fechaActual.getDate() + "/" + ((fechaActual.getMonth()) + 1) + "/" + fechaActual.getFullYear(),
            estado: true,
            tipo: "Automática",
            hor_id: idHor,
            jus_id: 0,
            observacion: "" 
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
        
}