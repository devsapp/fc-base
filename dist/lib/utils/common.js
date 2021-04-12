"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIndexInArray = void 0;
function findIndexInArray(targetObj, objArr, keyName) {
    objArr.forEach(function (element, index) {
        if (element[keyName] === targetObj[keyName]) {
            return index;
        }
    });
    return -1;
}
exports.findIndexInArray = findIndexInArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91dGlscy9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsU0FBZ0IsZ0JBQWdCLENBQUMsU0FBd0IsRUFBRSxNQUF1QixFQUFFLE9BQWU7SUFDakcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxLQUFLO1FBQzVCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMzQyxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQztBQVBELDRDQU9DIn0=