"use strict";
exports.__esModule = true;
exports.flattenInputToString = function (jsonSource, separator) {
    var flatMap = '';
    var dive = function (input, name) {
        if (typeof input !== 'object') {
            flatMap += "$" + name + " = '" + input + "';\n";
            return;
        }
        Object.keys(input).forEach(function (key) {
            var concatName = name === '' ? key : "" + name + separator + key;
            return dive(input[key], concatName);
        });
    };
    if (typeof jsonSource === 'object') {
        dive(jsonSource, '');
    }
    return flatMap;
};
//# sourceMappingURL=index.js.map