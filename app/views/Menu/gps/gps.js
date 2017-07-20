//"use strict";
var geolocation = require("nativescript-geolocation");
var BasePage = require("../../../shared/Menu-view-model");
var fs = require("file-system");
var frame = require("ui/frame");
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");

var GpsPage = function() {};
GpsPage.prototype = new GpsPage();
GpsPage.prototype.constructor = GpsPage;

var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ViewModel.prototype, "locations", {
        get: function () {
            if (!this._locations) {
                this._locations = new observable_array_1.ObservableArray();
            }
            return this._locations;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(ViewModel.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function(value) {
            if (this._status !== value) {
                this._status = value;
                this.notifyPropertyChange("status", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return ViewModel;
})(observable_1.Observable);
exports.ViewModel = ViewModel;

var page;
var model = new ViewModel();

GpsPage.prototype.contentLoaded = function(args) {
	page = args.object;
	page.bindingContext = model;
}

GpsPage.prototype.enableLocationTap = function(args) {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
        console.log("habilitando" + " " +  geolocation.enableLocationRequest());

        //Aqui se hace automatico el llamado a las coordenadas del GPS
    
var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
	then(function(loc) {
		if (loc) {
			model.locations.push(loc);
            console.log("tus coordenadas" + loc.latitude + " " + loc.longitude );

    var lat1 = loc.latitude;
    var lon1 = (loc.longitude);
    var lat2 = 10.464824097361868;
    var lon2 = (-66.97446489182153);

        ////////////////////DISTANCIA EUCLIDIANA

//var resta1 = ((10.464824097361868-10.464569569361256) * (10.464824097361868-10.464569569361256));
//var resta2 = (((-66.97446489182153)-(-66.9750851526562)) * ((-66.97446489182153)-(-66.9750851526562)));

//var distanciaE = Math.sqrt(resta1 + resta2);

//console.log("Esta es la distancia" + " " + (distanciaE)*100000);

/////////////DISTANCIA RADIAL

var R = 6371e3; // metres
console.log("R" + " " + R);
var e = (lat1) * (Math.PI/180); //var φ1 = lat1.toRadians();
console.log("e" + " "+ e);
var f = (lat2) * (Math.PI/180); //var φ2 = lat2.toRadians();
console.log("f" + " " + f);
var g = (lat2-lat1) * (Math.PI/180); //(lat2-lat1).toRadians();
console.log("g" + " " + g);
var h = (lon2-lon1) * (Math.PI/180); //(lon2-lon1).toRadians();
console.log("h" + " "+ h);

    //var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        //Math.cos(φ1) * Math.cos(φ2) *
       // Math.sin(Δλ/2) * Math.sin(Δλ/2);

var a = (Math.sin(g/2)) * (Math.sin(g/2)) + 
        (Math.cos(e)) * (Math.cos(f)) *
        (Math.sin(h/2)) * (Math.sin(h/2));
    console.log("a" + " " + a);    

var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
console.log("c" + " "+c );

var d = R * c;

console.log("Esta es la distancia del radio" + " " + d);

         
		}
  
	}, function(e){
		console.log("Error: " + e.message);
	});


    }
}
//exports.enableLocationTap = enableLocationTap;

GpsPage.prototype.buttonGetLocationTap = function(args) {
	var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
	then(function(loc) {
		if (loc) {
			model.locations.push(loc);
            
    var lat1 = loc.latitude;
    var lon1 = (loc.longitude);
    var lat2 = 10.464824097361868;
    var lon2 = (-66.97446489182153);

        ////////////////////DISTANCIA EUCLIDIANA

//var resta1 = ((10.464824097361868-10.464569569361256) * (10.464824097361868-10.464569569361256));
//var resta2 = (((-66.97446489182153)-(-66.9750851526562)) * ((-66.97446489182153)-(-66.9750851526562)));

//var distanciaE = Math.sqrt(resta1 + resta2);

//console.log("Esta es la distancia" + " " + (distanciaE)*100000);

/////////////DISTANCIA RADIAL

var R = 6371e3; // metres
console.log("R" + " " + R);
var e = (lat1) * (Math.PI/180); //var φ1 = lat1.toRadians();
console.log("e" + " "+ e);
var f = (lat2) * (Math.PI/180); //var φ2 = lat2.toRadians();
console.log("f" + " " + f);
var g = (lat2-lat1) * (Math.PI/180); //(lat2-lat1).toRadians();
console.log("g" + " " + g);
var h = (lon2-lon1) * (Math.PI/180); //(lon2-lon1).toRadians();
console.log("h" + " "+ h);

    //var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        //Math.cos(φ1) * Math.cos(φ2) *
       // Math.sin(Δλ/2) * Math.sin(Δλ/2);

var a = (Math.sin(g/2)) * (Math.sin(g/2)) + 
        (Math.cos(e)) * (Math.cos(f)) *
        (Math.sin(h/2)) * (Math.sin(h/2));
    console.log("a" + " " + a);    

var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
console.log("c" + " "+c );

var d = R * c;

console.log("Esta es la distancia del radio" + " " + d);

         
		}
  
	}, function(e){
		console.log("Error: " + e.message);
	});


}
//exports.buttonGetLocationTap = buttonGetLocationTap;

var watchId;

GpsPage.prototype.buttonStartTap = function(args) {
	watchId = geolocation.watchLocation(
	function (loc) {
		if (loc) {
			model.locations.push(loc);
            console.log("esta es tu coordenada" + " " + loc);
		}
	}, 
	function(e){
		console.log("Error: " + e.message);
	}, 
	{desiredAccuracy: 3, updateDistance: 10, updateTime: 1000 * 20}); // should update every 20 sec according to google documentation this is not so sure.
}
//exports.buttonStartTap = buttonStartTap;

GpsPage.prototype.buttonStopTap = function(args) {
	if (watchId) {
		geolocation.clearWatch(watchId);
	}
}
//exports.buttonStopTap = buttonStopTap;

module.exports = new GpsPage();
