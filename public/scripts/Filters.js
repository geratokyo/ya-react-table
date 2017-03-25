/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Filters = (function (_super) {
    __extends(Filters, _super);
    function Filters(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = _this.onChange.bind(_this);
        _this.state = {
            active: {}
        };
        return _this;
    }
    Filters.prototype.onChange = function (e) {
        var el = e.currentTarget, af = this.state.active;
        if (el.value !== "") {
            af[el.getAttribute('data-filter') + ""] = el.value;
        }
        else {
            delete af[el.getAttribute('data-filter')];
        }
        this.props.callback(_(this.props.data).filter(function (d) {
            var status = _(af).map(function (f, k) {
                return d[k] == f;
            }).value();
            return !/false/i.test(status.join(''));
        }).value());
        this.setState({
            active: af
        });
    };
    Filters.prototype.render = function () {
        var _this = this;
        var data = this.props.data.slice(1), head = this.props.data[0];
        return (React.createElement("div", { className: "table-filters" }, this.props.by.map(function (i) {
            return (React.createElement("select", { onChange: _this.onChange, "data-filter": i, key: i },
                React.createElement("option", { value: "" }, head[i]),
                _(_.uniqBy(data, i)).map(function (d, l) {
                    return (React.createElement("option", { value: d[i], key: l }, d[i]));
                }).value()));
        })));
    };
    return Filters;
}(React.Component));
exports.Filters = Filters;
if (window && document) {
    (function (yaReact, W, D) {
        yaReact.Filters = Filters;
    }(window.yaReact = window.yaReact || {}, window, document));
}


/***/ })
/******/ ]);
//# sourceMappingURL=Filters.js.map