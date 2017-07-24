"use strict";
var common = require("./linear-gradient-common");
global.moduleMerge(common, exports);
function drawBackground(view, colors, orientation) {
    var nativeView = view._nativeView;
    if (!nativeView) {
        throw new Error("Native view is not created yet!");
    }
    var backgroundDrawable = nativeView.getBackground();
    if (!(backgroundDrawable instanceof android.graphics.drawable.GradientDrawable)) {
        backgroundDrawable = new android.graphics.drawable.GradientDrawable();
        nativeView.setBackgroundDrawable(backgroundDrawable);
    }
    var LINEAR_GRADIENT = 0;
    var nativeColors = new Array();
    colors.forEach(function (color) {
        nativeColors.push(color.android);
    });
    backgroundDrawable.setColors(nativeColors);
    backgroundDrawable.setGradientType(LINEAR_GRADIENT);
    var androidOrientation = getAndroidOrientation(orientation);
    if (androidOrientation) {
        backgroundDrawable.setOrientation(androidOrientation);
    }
}
exports.drawBackground = drawBackground;
function getAndroidOrientation(orientation) {
    switch (orientation) {
        case common.Orientation.TopLeft_BottomRight:
            return android.graphics.drawable.GradientDrawable.Orientation.TL_BR;
        case common.Orientation.Left_Right:
            return android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT;
        case common.Orientation.BottomLeft_TopRight:
            return android.graphics.drawable.GradientDrawable.Orientation.BL_TR;
        case common.Orientation.Bottom_Top:
            return android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP;
        case common.Orientation.BottomRight_TopLeft:
            return android.graphics.drawable.GradientDrawable.Orientation.BR_TL;
        case common.Orientation.Right_Left:
            return android.graphics.drawable.GradientDrawable.Orientation.RIGHT_LEFT;
        case common.Orientation.TopRight_BottomLeft:
            return android.graphics.drawable.GradientDrawable.Orientation.TR_BL;
        case common.Orientation.Top_Bottom:
            return android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLWdyYWRpZW50LmFuZHJvaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW5lYXItZ3JhZGllbnQuYW5kcm9pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsaURBQW1EO0FBRW5ELE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXBDLHdCQUErQixJQUFVLEVBQUUsTUFBb0IsRUFBRSxXQUFnQztJQUM3RixJQUFJLFVBQVUsR0FBUyxJQUFLLENBQUMsV0FBVyxDQUFDO0lBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQ2hCLENBQUM7UUFDRyxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELElBQUksa0JBQWtCLEdBQUcsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3BELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsWUFBWSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RSxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDdEUsVUFBVSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztJQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFZO1FBQ2hDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzNDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNwRCxJQUFJLGtCQUFrQixHQUFHLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVELEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUEsQ0FBQztRQUNwQixrQkFBa0IsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0FBQ0wsQ0FBQztBQXhCRCx3Q0F3QkM7QUFFRCwrQkFBK0IsV0FBZ0M7SUFDM0QsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLE1BQU0sQ0FBQyxXQUFXLENBQUMsbUJBQW1CO1lBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ3hFLEtBQUssTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVO1lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQzdFLEtBQUssTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUI7WUFDdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDeEUsS0FBSyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVU7WUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDN0UsS0FBSyxNQUFNLENBQUMsV0FBVyxDQUFDLG1CQUFtQjtZQUN2QyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUN4RSxLQUFLLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVTtZQUM5QixNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUM3RSxLQUFLLE1BQU0sQ0FBQyxXQUFXLENBQUMsbUJBQW1CO1lBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ3hFLEtBQUssTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVO1lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQ2pGLENBQUM7QUFDTCxDQUFDIn0=