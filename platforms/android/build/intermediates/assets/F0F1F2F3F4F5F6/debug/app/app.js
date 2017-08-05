var application = require("application");
var ls_horario = require('local-storage');
var ls_profesor = require('local-storage');
var ls_correo = require('local-storage');
var tnsOAuthModule = require('nativescript-oauth');

if ((ls_profesor.get('profesor') != null) && (ls_profesor.get('id') != null) && (ls_horario.get('horario_profesor') !=null) && (ls_correo.get('correo') !=null)) {

console.log("locals llenas");
console.log("local profesor" + " " + ls_profesor.get('profesor'));
console.log("local id" + " " + ls_profesor.get('id'));
console.log("local correo" + " " + ls_correo.get('correo'));
console.log("local horario" + " " + ls_horario.get('horario_profesor'));

    application.start({ moduleName: "views/Menu/home/home" });
  } else {
console.log("locals vacias");
console.log("local profesor" + " " + ls_profesor.get('profesor'));
console.log("local id" + " " + ls_profesor.get('id'));
console.log("local correo" + " " + ls_correo.get('correo'));
console.log("local horario" + " " + ls_horario.get('horario_profesor'));

var linkedInInitOptions = tnsOAuthModule.ITnsOAuthOptionsLinkedIn = {
    clientId: '77k97y8ts52j32',
    clientSecret: 'PQRh7vF619ArEBBV',
    redirectUri: 'https://ucabsistencia.auth0.com/login/callback',
    scope: ['r_basicprofile', 'r_emailaddress'] 
};
 
tnsOAuthModule.initLinkedIn(linkedInInitOptions);

    application.start({ moduleName: "views/InicioSesion/InicioSesion" });
  }

//application.start({ moduleName: "Menu/home/home" });
