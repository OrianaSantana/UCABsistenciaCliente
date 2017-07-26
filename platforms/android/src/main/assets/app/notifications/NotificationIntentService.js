com.pip3r4o.android.app.IntentService.extend("com.tns.notifications.NotificationIntentService", {
    onHandleIntent: function (intent) {
        var action = intent.getAction();
        if ("ACTION_START" == action) {
            processStartNotification();
        }

        android.support.v4.content.WakefulBroadcastReceiver.completeWakefulIntent(intent);
    }
});


function processStartNotification() {
var ls_horario = require('local-storage');
var ls_salon = require('local-storage');
var ls_gps = require('local-storage');
var ls_magnetometro = require('local-storage');
var geolocation = require("nativescript-geolocation");
var horario = ls_horario.get('horario_profesor');
var dia;
var diaHorario;
var horaAndroid = java.lang.System.currentTimeMillis();
var fechaAndroidReal = new Date(horaAndroid);
var diaSemana = fechaAndroidReal.getDay();
var horaFormato;
var minutoFormato;
var magnetometer;
var gps;
var d;


if (fechaAndroidReal.getHours() == 1 || fechaAndroidReal.getHours() == 2 || fechaAndroidReal.getHours() == 3 
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
var horaClase;

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
}
        console.log("Hora REAL ANDROID" + " " + horaActual);
        console.log("fecha y dia de hora android" + " " + diaSemana + " " + fechaAndroidReal.getDate() + "/" + 
        ((fechaAndroidReal.getMonth()) + 1) + "/" + fechaAndroidReal.getFullYear());
        
//Se comparan las horas
if (ls_salon.get('salon') == null && ls_gps.get('gps') == null && ls_magnetometro.get('magnetometro') == null) {
  for (i=0; i< horario.length; i++){ 
         diaHorario = horario[i].hor_dia;
         hora_inicio = horario[i].hor_hora_inicio.substr(11,2);
         min_hora_inicio = horario[i].hor_hora_inicio.substr(14,2);

        if (diaHorario == dia) {
           horaClase = hora_inicio + ":" + min_hora_inicio;
           if (horaActual == horaClase) {
             salonClase = horario[i].hor_salon;
             ls_salon('salon',salonClase);
             console.log("Su clase es en el salon:" + " " + salonClase);

                //Se consulta si el tlf tiene gps
                gps = hasSystemFeature('android.hardware.location.gps');
                console.log("Su dispositivo tiene gps?:" + " " + gps);

                if (gps) {
                //Se enciende el gps
                  if (!geolocation.isEnabled()) {
                     geolocation.enableLocationRequest();
                     console.log("habilitando gps");

                    //Aqui se hace automatico el llamado a las coordenadas del GPS  
                    var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
                    then(function(loc) {
                    if (loc) {
                                            
                     console.log("tus coordenadas" + loc.latitude + " " + loc.longitude );

                    var lat1 = loc.latitude;
                    var lon1 = (loc.longitude);
                    var lat2 = 10.464803656000619;
                    var lon2 = (-66.86167079430855);

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

                console.log("Esta es la distancia del radio" + " " + d);

                //Se compara la distancia obtenida con la tolerancia en mts
                if (d <= 100) {
                 console.log("Esta en la UCAB/CASA");
                 ls_gps('gps',"UCAB");

                //Se consulta si el tlf tiene magnetometro
               if (ls_magnetometro.get('magnetometro') == null) {
                 magnetometer = hasSystemFeature('android.hardware.sensor.compass');                         
                 console.log("Su dispositivo tiene magnetometro?:" + " " + magnetometer);
                 ls_magnetometro('magnetometro',magnetometer);
               } else {
                   if (ls_magnetometro.get('magnetometro') == true) {
                       console.log("Su dispositivo tiene magnetometro");
                       //Aqui se toman las mediciones
                      
                    } else {
                       console.log("Su dispositivo no tiene magnetometro");
                        //AQUI SE ENVIA NOTIFICACION
                        var utils = require("utils/utils");
                        var context = utils.ad.getApplicationContext();

                        var builder = new android.app.Notification.Builder(context);
                        builder.setContentTitle("Falla de hardware")
                        .setAutoCancel(true)
                                               
                        .setContentText("Reporte Asistencia Manual")
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
               }
                
                } else {
                    console.log("No esta en la UCAB/CASA");
                    //Se debe inicializar el timmer de 30 min
                        }   
                    }
                                
                    }, function(e){
                        console.log("Error: " + e.message);
                        });

                    } else if (geolocation.isEnabled() == true){
                       //ESTE ES EL ELSE DE SI EL GPS YA ESTA ENCENDIDO
                       console.log("El gps esta encendido");
                      //Aqui se hace automatico el llamado a las coordenadas del GPS  
                    var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
                    then(function(loc) {
                    if (loc) {
                                            
                     console.log("tus coordenadas" + loc.latitude + " " + loc.longitude );

                    var lat1 = loc.latitude;
                    var lon1 = (loc.longitude);
                    var lat2 = 10.464803656000619;
                    var lon2 = (-66.86167079430855);

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

                console.log("Esta es la distancia del radio" + " " + d);

                //Se compara la distancia obtenida con la tolerancia en mts
                if (d <= 100) {
                 console.log("Esta en la UCAB/CASA");
                  ls_gps('gps',"UCAB");

             if (ls_magnetometro.get('magnetometro') == null) {
                //Se consulta si el tlf tiene magnetometro
                 magnetometer = hasSystemFeature('android.hardware.sensor.compass');      
                                      
                 console.log("Su dispositivo tiene magnetometro?:" + " " + magnetometer);
                 ls_magnetometro('magnetometro',magnetometer);
             } else {

                   if (ls_magnetometro.get('magnetometro') == true) {
                       console.log("Su dispositivo tiene magnetometro");
                       //Aqui se toman las mediciones
                    } else {
                       console.log("Su dispositivo no tiene magnetometro");
                        //AQUI SE ENVIA NOTIFICACION
                        var utils = require("utils/utils");
                        var context = utils.ad.getApplicationContext();

                        var builder = new android.app.Notification.Builder(context);
                        builder.setContentTitle("Falla de hardware")
                        .setAutoCancel(true)
                                               
                        .setContentText("Reporte Asistencia Manual")
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
              }
                } else {
                    console.log("No esta en la UCAB/CASA");
                     ls_gps('gps',null);
                    //Se debe inicializar el timmer de 30 min
                        }   
                    }
                                
                    }, function(e){
                        console.log("Error: " + e.message);
                        });
                    } 
                } else {
                  console.log("Su dispositivo no tiene gps");
                //AQUI SE ENVIA NOTIFICACION
                var utils = require("utils/utils");
                var context = utils.ad.getApplicationContext();

                var builder = new android.app.Notification.Builder(context);
                builder.setContentTitle("Falla de hardware")
                .setAutoCancel(true)
                                    
                .setContentText("Firme Asistencia en escuela")
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
                       
            } else {
            console.log("Las horas no son iguales");
                    }
              
        } else {
            console.log("Los dias no son iguales");
        }

        };
} else if (ls_salon.get('salon') != null && ls_gps.get('gps') == "UCAB" && ls_magnetometro != null) {

    if (ls_magnetometro.get('magnetometro') == true) {
        console.log("Su dispositivo tiene magnetometro");
        //Aqui se toman las mediciones
        } else {
        console.log("Su dispositivo no tiene magnetometro");
        //AQUI SE ENVIA NOTIFICACION
        var utils = require("utils/utils");
        var context = utils.ad.getApplicationContext();

        var builder = new android.app.Notification.Builder(context);
         builder.setContentTitle("Falla de hardware")
        .setAutoCancel(true)
                                               
        .setContentText("Reporte Asistencia Manual")
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

}        

//AQUI SE ENVIA NOTIFICACION
    /*var utils = require("utils/utils");
    var context = utils.ad.getApplicationContext();

    var builder = new android.app.Notification.Builder(context);
    builder.setContentTitle("Scheduled Notification")
        .setAutoCancel(true)
        .setContentText("This notification has been triggered by Notification Service")
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
    manager.notify(1, builder.build()); */
}

function getDeleteIntent(context) {
        var intent = new android.content.Intent(context, java.lang.Class.forName("com.tns.broadcastreceivers.NotificationEventReceiver"));
        intent.setAction("ACTION_DELETE_NOTIFICATION");
        return android.app.PendingIntent.getBroadcast(context, 0, intent, android.app.PendingIntent.FLAG_UPDATE_CURRENT);
}

function hasSystemFeature (feature) {
var application = require("application");
var hardwareDisponible;
var packageManager = application.android.context.getPackageManager();
hardwareDisponible = packageManager.getSystemAvailableFeatures();

         for (i=0; i< hardwareDisponible.length; i++){ 
              if (hardwareDisponible[i].name == feature){
                  return true;
              }
         }
return false;
}
