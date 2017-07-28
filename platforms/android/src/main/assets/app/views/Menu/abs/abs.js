var createViewModel = require("./abs-view-model").createViewModel;
var BasePage = require("../../../shared/Menu-view-model");

var AbsPage = function() {};
AbsPage.prototype = new BasePage();
AbsPage.prototype.constructor = AbsPage;

AbsPage.prototype.contentLoaded = function(args) {
    console.log("Content abs");
	var page = args.object;
    abs = createViewModel();
    page.bindingContext = abs;
}


module.exports = new AbsPage();