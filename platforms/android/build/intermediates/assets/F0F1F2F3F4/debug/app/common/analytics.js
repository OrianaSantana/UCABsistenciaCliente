"use strict";
var Analytics = require("nativescript-telerik-analytics");
var enabled = false;
function start() {
    var packageJson = require("../package.json");
    if (packageJson.analyticsAppId) {
        var Analytics = require("nativescript-telerik-analytics");
        Analytics.init({
            appId: packageJson.analyticsAppId,
            logger: {
                info: function (msg) { return console.info("Analytics: " + msg); },
                error: function (msg) { return console.error("Analytics: " + msg); }
            }
        });
        Analytics.start();
        enabled = true;
    }
}
exports.start = start;
function trackEvent(feature) {
    if (!enabled) {
        return;
    }
    Analytics.trackEvent(feature);
}
exports.trackEvent = trackEvent;
function trackTimingRaw(feature, time) {
    if (!enabled) {
        return;
    }
    Analytics.trackTimingRaw(feature, time);
}
exports.trackTimingRaw = trackTimingRaw;
function trackTimingStart(feature) {
    if (!enabled) {
        return;
    }
    return Analytics.trackTimingStart(feature);
}
exports.trackTimingStart = trackTimingStart;
function trackException(e, context) {
    if (!enabled) {
        return;
    }
    Analytics.trackException(e, context);
}
exports.trackException = trackException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5hbHl0aWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUMxRCxJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7QUFFN0I7SUFDSSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM3QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUMxRCxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ1gsS0FBSyxFQUFFLFdBQVcsQ0FBQyxjQUFjO1lBQ2pDLE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsRUFBakMsQ0FBaUM7Z0JBQzlDLEtBQUssRUFBRSxVQUFBLEdBQUcsSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxFQUFsQyxDQUFrQzthQUNuRDtTQUNKLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7QUFDTCxDQUFDO0FBZkQsc0JBZUM7QUFFRCxvQkFBMkIsT0FBZTtJQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLENBQUM7SUFDWCxDQUFDO0lBQ0QsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBTEQsZ0NBS0M7QUFFRCx3QkFBK0IsT0FBZSxFQUFFLElBQVk7SUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUNELFNBQVMsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFMRCx3Q0FLQztBQUVELDBCQUFpQyxPQUFlO0lBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNYLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFMRCw0Q0FLQztBQUVELHdCQUErQixDQUFRLEVBQUUsT0FBZTtJQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLENBQUM7SUFDWCxDQUFDO0lBQ0QsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUxELHdDQUtDIn0=