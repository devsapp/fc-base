"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgressBar = void 0;
var colors_1 = require("colors");
var progress_1 = __importDefault(require("progress"));
function createProgressBar(format, options) {
    var opts = Object.assign({
        complete: colors_1.green('█'),
        incomplete: colors_1.white('█'),
        width: 20,
        clear: true,
    }, options);
    var bar = new progress_1.default(format, opts);
    var old = bar.tick;
    var loadingChars = ['⣴', '⣆', '⢻', '⢪', '⢫'];
    bar.tick = function (len, tokens) {
        var newTokens = Object.assign({
            loading: loadingChars[Math.random() * 5],
        }, tokens);
        old.call(bar, len, newTokens);
    };
    return bar;
}
exports.createProgressBar = createProgressBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUFzQztBQUN0QyxzREFBbUM7QUFFbkMsU0FBZ0IsaUJBQWlCLENBQUMsTUFBYyxFQUFFLE9BQWE7SUFDN0QsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN6QixRQUFRLEVBQUUsY0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNwQixVQUFVLEVBQUUsY0FBSyxDQUFDLEdBQUcsQ0FBQztRQUN0QixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxJQUFJO0tBQ1osRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNaLElBQU0sR0FBRyxHQUFHLElBQUksa0JBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNyQixJQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxHQUFHLENBQUMsSUFBSSxHQUFHLFVBQUMsR0FBWSxFQUFFLE1BQVk7UUFDcEMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM5QixPQUFPLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDekMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNYLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFDRixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFqQkQsOENBaUJDIn0=