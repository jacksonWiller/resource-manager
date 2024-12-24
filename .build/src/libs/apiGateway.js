"use strict";
exports.__esModule = true;
exports.formatJSONResponse = void 0;
var formatJSONResponse = function (response) {
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};
exports.formatJSONResponse = formatJSONResponse;
