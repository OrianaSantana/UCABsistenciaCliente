"use strict";
var color_1 = require("color");
function loadedGuard(args, cb) {
    return function () {
        if (args.android || args.ios) {
            return cb.apply(this, arguments);
        }
        return undefined;
    };
}
exports.loadedGuard = loadedGuard;
function grayTouch(args) {
    var viewObject = args.object;
    switch (args.action) {
        case "up":
            if (!(--viewObject.gesturePoints)) {
                viewObject.animate({
                    // Get gray fast!
                    backgroundColor: new color_1.Color(0xFFEEEEEE),
                    duration: 1
                }).then(loadedGuard(viewObject, function () { return viewObject.animate({
                    backgroundColor: new color_1.Color(0xFFFFFFFF),
                    duration: 300
                }); }));
            }
            break;
        case "down":
            viewObject.gesturePoints = (viewObject.gesturePoints || 0) + 1;
            viewObject.backgroundColor = new color_1.Color(0xFFEEEEEE);
            break;
        case "cancel":
            viewObject.gesturePoints = 0;
            viewObject.animate({
                backgroundColor: new color_1.Color(0xFFFFFFFF),
                duration: 300
            });
            break;
    }
}
exports.grayTouch = grayTouch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLCtCQUE4QjtBQUU5QixxQkFBaUQsSUFBVSxFQUFFLEVBQU07SUFDL0QsTUFBTSxDQUFPO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQVksRUFBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQVBELGtDQU9DO0FBRUQsbUJBQTBCLElBQTJCO0lBQ2pELElBQUksVUFBVSxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbEMsTUFBTSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakIsS0FBSyxJQUFJO1lBQ0wsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsVUFBVSxDQUFDLE9BQU8sQ0FBQztvQkFDZixpQkFBaUI7b0JBQ2pCLGVBQWUsRUFBRSxJQUFJLGFBQUssQ0FBQyxVQUFVLENBQUM7b0JBQ3RDLFFBQVEsRUFBRSxDQUFDO2lCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsVUFBVSxDQUFDLE9BQU8sQ0FBQztvQkFDckQsZUFBZSxFQUFFLElBQUksYUFBSyxDQUFDLFVBQVUsQ0FBQztvQkFDdEMsUUFBUSxFQUFFLEdBQUc7aUJBQ2hCLENBQUMsRUFIb0MsQ0FHcEMsQ0FBQyxDQUFDLENBQUM7WUFDVCxDQUFDO1lBQ0QsS0FBSyxDQUFDO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsVUFBVSxDQUFDLGFBQWEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELFVBQVUsQ0FBQyxlQUFlLEdBQUcsSUFBSSxhQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsS0FBSyxDQUFDO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsVUFBVSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDN0IsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDZixlQUFlLEVBQUUsSUFBSSxhQUFLLENBQUMsVUFBVSxDQUFDO2dCQUN0QyxRQUFRLEVBQUUsR0FBRzthQUNoQixDQUFDLENBQUM7WUFDSCxLQUFLLENBQUM7SUFDZCxDQUFDO0FBQ0wsQ0FBQztBQTNCRCw4QkEyQkMifQ==