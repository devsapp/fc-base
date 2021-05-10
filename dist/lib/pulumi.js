"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPulumiImportFlags = exports.genPulumiComponentProp = void 0;
function genPulumiComponentProp(stackId, region, pulumiStackDirOfService) {
    var prop = Object.assign({}, {
        region: region,
        projectName: stackId,
        stackName: stackId,
        workDir: pulumiStackDirOfService,
        runtime: 'nodejs',
        cloudPlatform: 'alicloud',
    });
    return prop;
}
exports.genPulumiComponentProp = genPulumiComponentProp;
function genPulumiImportFlags(isProtect, stackID, parentUrn) {
    var isProtectFlag = isProtect ? '--protect=true' : '--protect=false';
    var stackFlag = "--stack " + stackID;
    var parentFlag = parentUrn ? "--parent p=" + parentUrn : '';
    return isProtectFlag + " " + stackFlag + " " + parentFlag;
}
exports.genPulumiImportFlags = genPulumiImportFlags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVsdW1pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9wdWx1bWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsU0FBZ0Isc0JBQXNCLENBQUMsT0FBZSxFQUFFLE1BQWMsRUFBRSx1QkFBK0I7SUFDckcsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7UUFDN0IsTUFBTSxRQUFBO1FBQ04sV0FBVyxFQUFFLE9BQU87UUFDcEIsU0FBUyxFQUFFLE9BQU87UUFDbEIsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxPQUFPLEVBQUUsUUFBUTtRQUNqQixhQUFhLEVBQUUsVUFBVTtLQUMxQixDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFWRCx3REFVQztBQUVELFNBQWdCLG9CQUFvQixDQUFDLFNBQWtCLEVBQUUsT0FBZSxFQUFFLFNBQWlCO0lBQ3pGLElBQU0sYUFBYSxHQUFXLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0lBQy9FLElBQU0sU0FBUyxHQUFHLGFBQVcsT0FBUyxDQUFDO0lBQ3ZDLElBQU0sVUFBVSxHQUFXLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWMsU0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEUsT0FBVSxhQUFhLFNBQUksU0FBUyxTQUFJLFVBQVksQ0FBQztBQUN2RCxDQUFDO0FBTEQsb0RBS0MifQ==