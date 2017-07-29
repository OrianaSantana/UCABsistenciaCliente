function getStartPendingIntent(context) {
    var intent = new android.content.Intent(context, java.lang.Class.forName("com.tns.broadcastreceivers.NotificationEventReceiver"));
    intent.setAction("ACTION_START_NOTIFICATION_SERVICE");
    return android.app.PendingIntent.getBroadcast(context, 0, intent, android.app.PendingIntent.FLAG_UPDATE_CURRENT);
}

function stopAlarm() {
console.log("Se cancelo la alarma");
alarmManager.cancel(alarmIntent);
}

module.exports.stopAlarm = stopAlarm;

var alarmManager;
var alarmIntent;

function setupAlarm(context) {
var horaActivar = new Date(java.lang.System.currentTimeMillis());
horaActivar.setHours(15);
horaActivar.setMinutes(25);
console.log("esta es la hora para activar" + " " + horaActivar.getTime() + " " + horaActivar.getHours() + ":" + horaActivar.getMinutes()); 
    console.log("Se inicio alarma");
    alarmManager = context.getSystemService(android.content.Context.ALARM_SERVICE);
    alarmIntent = getStartPendingIntent(context);
    alarmManager.setRepeating(android.app.AlarmManager.RTC_WAKEUP,
        java.lang.System.currentTimeMillis() /*horaActivar.getTime()*/,
        1000 * 60 * 3, // <- every 5 minutes // 1000 * 60 * 60 * 24, /* alarm will send the `alarmIntent` object every 24h */
        alarmIntent);  
}

module.exports.setupAlarm = setupAlarm;