var Observable = require("data/observable").Observable;
var magnetometer = require("nativescript-accelerometer");
var file_system_1 = require("file-system");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var ls_profesor = require('local-storage');
var fetchModule = require("fetch");
var config = require("../../../shared/config");


function createViewModel() { 
    var viewModel = new Observable();    

    return viewModel;
}

exports.createViewModel = createViewModel;
