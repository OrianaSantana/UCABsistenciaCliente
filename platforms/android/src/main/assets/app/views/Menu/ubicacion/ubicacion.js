var createViewModel = require("./ubicacion-view-model").createViewModel;
var Observable = require("data/observable").Observable;
var BasePage = require("../../../shared/Menu-view-model");
var frameModule = require("ui/frame");


var UbicacionPage = function() {};
UbicacionPage.prototype = new BasePage();
UbicacionPage.prototype.constructor = UbicacionPage;

//var file_system_1 = require("file-system");
var miObjeto = function (vx, vy, vz) {
    this.vx = vx || '';
    this.vy = vy || '';
    this.vz = vz || '';
};
  
  UbicacionPage.prototype.contentLoaded = function(args) {
  console.log("Content ubicacion");
	var page = args.object;
 // ubicacion = createViewModel();
  page.bindingContext = createViewModel();

}


module.exports = new UbicacionPage();
