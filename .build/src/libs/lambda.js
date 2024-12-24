"use strict";
exports.__esModule = true;
exports.middyfy = void 0;
var core_1 = require("@middy/core");
var http_json_body_parser_1 = require("@middy/http-json-body-parser");
var middyfy = function (handler) {
    return core_1["default"](handler).use(http_json_body_parser_1["default"]());
};
exports.middyfy = middyfy;
