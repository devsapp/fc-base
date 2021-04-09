"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfLogTriggerConfig = void 0;
function instanceOfLogTriggerConfig(data) {
    return 'jobConfig' in data && 'logConfig' in data && 'sourceConfig' in data && 'enable' in data;
}
exports.instanceOfLogTriggerConfig = instanceOfLogTriggerConfig;
// export function transformLogConfig(logConfig: LogConfig) {
//   if (logConfig) {
//     return {
//       project: logConfig.Project || '',
//       logstore: logConfig.LogStore || ''
//     }
//   }
//   return null;
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBZ0JBLFNBQWdCLDBCQUEwQixDQUFDLElBQVM7SUFDbEQsT0FBTyxXQUFXLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksY0FBYyxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDO0FBQ2xHLENBQUM7QUFGRCxnRUFFQztBQVdELDZEQUE2RDtBQUM3RCxxQkFBcUI7QUFDckIsZUFBZTtBQUNmLDBDQUEwQztBQUMxQywyQ0FBMkM7QUFDM0MsUUFBUTtBQUNSLE1BQU07QUFDTixpQkFBaUI7QUFDakIsSUFBSSJ9