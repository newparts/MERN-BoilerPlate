"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _user_reducers = _interopRequireDefault(require("./user_reducers"));

var _chat_reducers = _interopRequireDefault(require("./chat_reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({
  user: _user_reducers["default"],
  chats: _chat_reducers["default"]
});
var _default = rootReducer;
exports["default"] = _default;