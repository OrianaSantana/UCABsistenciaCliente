"use strict";
var exampleInfoPageVM = require("../view-models/example-info-page-view-model");
var frame = require("ui/frame");
var platform = require("platform");
var analytics = require("./analytics");
var isIOS = platform.device.os === platform.platformNames.ios;
var isAndroid = platform.device.os === platform.platformNames.android;
function traceNavigateTo(to, context) {
    var eventText = "Navigate to: " + to + (context ? " (" + context + ")" : "");
    console.log("Track: " + eventText);
    analytics.trackEvent(eventText);
    return to;
}
function navigateToExampleGroup(context) {
    // prof.start("group");
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: traceNavigateTo("views/group-page/group-page"),
    });
}
exports.navigateToExampleGroup = navigateToExampleGroup;
function navigateToExample(example, siblings) {
    // prof.start("example");
    // prof.startCPUProfile("example");
    var navContext = {
        shouldNavigateToInfoOnBack: true,
        example: example,
        siblings: siblings
    };
    frame.topmost().navigate({
        animated: true,
        moduleName: traceNavigateTo(navContext.example.path),
        context: navContext
    });
}
exports.navigateToExample = navigateToExample;
function navigateToNextExample(current) {
    var index = current.siblings.indexOf(current.example);
    ++index;
    if (index >= current.siblings.length) {
        index = 0;
    }
    var navContext = {
        shouldNavigateToInfoOnBack: true,
        example: current.siblings[index],
        siblings: current.siblings
    };
    frame.topmost().navigate({
        animated: true,
        moduleName: traceNavigateTo(navContext.example.path),
        context: navContext
    });
}
exports.navigateToNextExample = navigateToNextExample;
function navigateToPrevExample(current) {
    var index = current.siblings.indexOf(current.example);
    --index;
    if (index < 0) {
        index = current.siblings.length - 1;
    }
    var navContext = {
        shouldNavigateToInfoOnBack: true,
        example: current.siblings[index],
        siblings: current.siblings
    };
    frame.topmost().navigate({
        animated: true,
        moduleName: traceNavigateTo(navContext.example.path),
        context: navContext
    });
}
exports.navigateToPrevExample = navigateToPrevExample;
function navigateToExampleInfo(context) {
    var infoContext = new exampleInfoPageVM.ExampleInfoPageViewModel(context.example);
    frame.topmost().navigate({
        animated: true,
        context: infoContext,
        moduleName: traceNavigateTo("views/example-info-page", infoContext.currentExample.path)
    });
}
exports.navigateToExampleInfo = navigateToExampleInfo;
function navigateToCode(context) {
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: traceNavigateTo("views/code-page", context.path),
    });
}
exports.navigateToCode = navigateToCode;
function navigateToGroupInfo(context) {
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: traceNavigateTo("views/group-info-page", context.title),
    });
}
exports.navigateToGroupInfo = navigateToGroupInfo;
function navigateToHome() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/main-page/main-page") {
        frame.topmost().navigate(traceNavigateTo("views/main-page/main-page"));
    }
}
exports.navigateToHome = navigateToHome;
function navigateToAbout() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/about/about") {
        frame.topmost().navigate(traceNavigateTo("views/about/about"));
    }
}
exports.navigateToAbout = navigateToAbout;
function navigateBack() {
    frame.goBack();
}
exports.navigateBack = navigateBack;
function navigateBackWithContext(context) {
    var topmostFrame = frame.topmost();
    var backstackEntry = topmostFrame.backStack[topmostFrame.backStack.length - 1];
    backstackEntry.entry.context = context;
    topmostFrame.goBack(backstackEntry);
}
exports.navigateBackWithContext = navigateBackWithContext;
function navigateBackFromExample() {
    var topmostFrame = frame.topmost();
    var stack = topmostFrame.backStack;
    for (var top = stack.length - 1; top >= 0; --top) {
        var backStackEntry = stack[top];
        if (!/^examples\//.test(backStackEntry.entry.moduleName)) {
            topmostFrame.goBack(backStackEntry);
            break;
        }
    }
}
exports.navigateBackFromExample = navigateBackFromExample;
function openLink(view) {
    var url = view.tag;
    if (url) {
        if (isIOS) {
            var nsUrl = NSURL.URLWithString(url);
            var sharedApp = UIApplication.sharedApplication();
            if (sharedApp.canOpenURL(nsUrl)) {
                sharedApp.openURL(nsUrl);
            }
        }
        else if (isAndroid) {
            var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url));
            var activity = frame.topmost().android.activity;
            activity.startActivity(android.content.Intent.createChooser(intent, "share"));
        }
    }
}
exports.openLink = openLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF2aWdhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSwrRUFBa0Y7QUFDbEYsZ0NBQW1DO0FBRW5DLG1DQUFzQztBQUV0Qyx1Q0FBeUM7QUFFekMsSUFBSSxLQUFLLEdBQVksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7QUFDdkUsSUFBSSxTQUFTLEdBQVksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7QUFFL0UseUJBQXlCLEVBQVUsRUFBRSxPQUFnQjtJQUNqRCxJQUFJLFNBQVMsR0FBRyxlQUFlLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ25DLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFFRCxnQ0FBdUMsT0FBbUM7SUFDdEUsdUJBQXVCO0lBRXZCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDckIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsT0FBTztRQUNoQixVQUFVLEVBQUUsZUFBZSxDQUFDLDZCQUE2QixDQUFDO0tBQzdELENBQUMsQ0FBQTtBQUNOLENBQUM7QUFSRCx3REFRQztBQUVELDJCQUFrQyxPQUEyQixFQUFFLFFBQThCO0lBQ3pGLHlCQUF5QjtJQUN6QixtQ0FBbUM7SUFFbkMsSUFBSSxVQUFVLEdBQStDO1FBQ3pELDBCQUEwQixFQUFFLElBQUk7UUFDaEMsT0FBTyxFQUFFLE9BQU87UUFDaEIsUUFBUSxFQUFFLFFB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