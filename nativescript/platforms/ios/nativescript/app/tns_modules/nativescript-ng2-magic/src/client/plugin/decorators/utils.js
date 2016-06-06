"use strict";
// angular
var core_1 = require('@angular/core');
// app
var magic_service_1 = require('../services/magic.service');
var _reflect = Reflect;
var MagicDecoratorUtils = (function () {
    function MagicDecoratorUtils() {
    }
    MagicDecoratorUtils.getMetadata = function (metadata, customDecoratorMetadata) {
        if (metadata === void 0) { metadata = {}; }
        if (metadata.templateUrl) {
            // correct view for platform target
            metadata.templateUrl = magic_service_1.MagicService.TEMPLATE_URL(metadata.templateUrl);
        }
        return metadata;
    };
    MagicDecoratorUtils.annotateComponent = function (cls, metadata, customDecoratorMetadata) {
        if (metadata === void 0) { metadata = {}; }
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        annotations.push(new core_1.Component(MagicDecoratorUtils.getMetadata(metadata, customDecoratorMetadata)));
        _reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    };
    return MagicDecoratorUtils;
}());
exports.MagicDecoratorUtils = MagicDecoratorUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTtBQUNWLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUV4QyxNQUFNO0FBQ04sOEJBQTJCLDJCQUEyQixDQUFDLENBQUE7QUFHdkQsSUFBTSxRQUFRLEdBQVEsT0FBTyxDQUFDO0FBRTlCO0lBQUE7SUFpQkEsQ0FBQztJQWhCZSwrQkFBVyxHQUF6QixVQUEwQixRQUFrQixFQUFFLHVCQUE2QjtRQUFqRCx3QkFBa0IsR0FBbEIsYUFBa0I7UUFFMUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDekIsbUNBQW1DO1lBQ25DLFFBQVEsQ0FBQyxXQUFXLEdBQUcsNEJBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFYSxxQ0FBaUIsR0FBL0IsVUFBZ0MsR0FBUSxFQUFFLFFBQWtCLEVBQUUsdUJBQTZCO1FBQWpELHdCQUFrQixHQUFsQixhQUFrQjtRQUMxRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakUsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFTLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksMkJBQW1CLHNCQWlCL0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFuZ3VsYXJcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gYXBwXG5pbXBvcnQge01hZ2ljU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvbWFnaWMuc2VydmljZSc7XG5cbmRlY2xhcmUgdmFyIFJlZmxlY3Q6IGFueTtcbmNvbnN0IF9yZWZsZWN0OiBhbnkgPSBSZWZsZWN0O1xuXG5leHBvcnQgY2xhc3MgTWFnaWNEZWNvcmF0b3JVdGlscyB7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWV0YWRhdGEobWV0YWRhdGE6IGFueSA9IHt9LCBjdXN0b21EZWNvcmF0b3JNZXRhZGF0YT86IGFueSkge1xuXG4gICAgaWYgKG1ldGFkYXRhLnRlbXBsYXRlVXJsKSB7XG4gICAgICAvLyBjb3JyZWN0IHZpZXcgZm9yIHBsYXRmb3JtIHRhcmdldFxuICAgICAgbWV0YWRhdGEudGVtcGxhdGVVcmwgPSBNYWdpY1NlcnZpY2UuVEVNUExBVEVfVVJMKG1ldGFkYXRhLnRlbXBsYXRlVXJsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFubm90YXRlQ29tcG9uZW50KGNsczogYW55LCBtZXRhZGF0YTogYW55ID0ge30sIGN1c3RvbURlY29yYXRvck1ldGFkYXRhPzogYW55KSB7XG4gICAgbGV0IGFubm90YXRpb25zID0gX3JlZmxlY3QuZ2V0TWV0YWRhdGEoJ2Fubm90YXRpb25zJywgY2xzKSB8fCBbXTtcbiAgICBhbm5vdGF0aW9ucy5wdXNoKG5ldyBDb21wb25lbnQoTWFnaWNEZWNvcmF0b3JVdGlscy5nZXRNZXRhZGF0YShtZXRhZGF0YSwgY3VzdG9tRGVjb3JhdG9yTWV0YWRhdGEpKSk7XG4gICAgX3JlZmxlY3QuZGVmaW5lTWV0YWRhdGEoJ2Fubm90YXRpb25zJywgYW5ub3RhdGlvbnMsIGNscyk7XG4gICAgcmV0dXJuIGNscztcbiAgfVxufVxuIl19