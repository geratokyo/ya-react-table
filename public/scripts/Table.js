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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */,
/* 2 */
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
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        var _this = _super.call(this, props) || this;
        _this.orderData = _this.orderData.bind(_this);
        _this.onResize = _this.onResize.bind(_this);
        _this.onParentScroll = _this.onParentScroll.bind(_this);
        _this.state = {
            head: props.hasHeaders ? props.data[0] : null,
            data: _this.originalData = props.hasHeaders ? props.data.slice(1) : props.data,
            order: false,
            orderBy: '',
        };
        return _this;
    }
    Table.prototype.orderData = function (e) {
        if (!this.props.enableSort)
            return;
        var state = this.state, el = e.target, index = el.getAttribute("data-index"), data = state.data, order = state.order;
        if (state.orderBy != index) {
            data = _(state.data).orderBy(function (e) {
                return e[index];
            }).value();
            order = false;
        }
        else {
            data = _.reverse(data);
            order = !order;
        }
        this.setState(function (prevState, props) { return ({
            data: data,
            order: order,
            orderBy: index,
        }); });
    };
    Table.prototype.componentDidMount = function () {
        this.el = this.refs['table'];
        this.parentEl = this.el.parentElement;
        this.tableHolderEl = this.refs['table-holder'];
        this.tableBodyEl = this.refs['table-body'];
        this.tableHeadEl = this.refs['table-head'];
        this.onResize();
        this.props.stickyHeaders && (this.props.stickyTo ? this.props.stickyTo : window).addEventListener('scroll', this.onParentScroll);
        this.el.addEventListener('resize', this.onResize);
    };
    Table.prototype.componentDidUpdate = function (nextProps) {
        if (nextProps.data !== this.props.data) {
        }
    };
    Table.prototype.onResize = function () {
        if (this.props.stickyHeaders) {
            var bodyCells = this.tableBodyEl.querySelectorAll('.table-head .cell'), headCells = this.tableHeadEl.querySelectorAll('.table-head .cell');
            this.tableHeadEl.style.width = this.tableBodyEl.offsetWidth + 'px';
            for (var i = 0; i < bodyCells.length; i++) {
                headCells[i].style.width = bodyCells[i].offsetWidth + 'px';
            }
        }
    };
    Table.prototype.onParentScroll = function (e) {
        var bb = this.el.getBoundingClientRect(), hh = this.tableHeadEl.getBoundingClientRect(), p = this.props.stickyTo ? this.props.stickyTo : document.body;
        this.tableHeadEl.style.top = (bb.top - p.offsetTop < 0 ? p.offsetTop - bb.top : 0) + 'px';
    };
    Table.prototype.formatter = function (e, key) {
        return this.props.formatter &&
            this.props.dataTypes &&
            this.props.dataTypes[key] ? this.props.formatter(e, this.props.dataTypes[key]) : e;
    };
    Table.prototype.renderHead = function () {
        var _this = this;
        var head = this.state.head;
        return (React.createElement("div", { className: "table-head" },
            React.createElement("div", { className: "row" }, head && _(head).map(function (cell, i) {
                return (React.createElement("div", { className: "cell", key: i, "data-index": i, "data-active": i == _this.state.orderBy, onClick: _this.orderData }, cell));
            }).value())));
    };
    Table.prototype.render = function () {
        var _this = this;
        var props = this.props, state = this.state, data = state.data, colWidth = 100 / _.size(state.head), clz = props.className || "", tableSettings = [props.style ? props.style : "", props.enableHover ? "hover" : ""].join(" ");
        return (React.createElement("div", { ref: "table", className: "table-component " + clz, "data-style": props.style, "data-enable-sort": props.enableSort, "data-enable-hover": props.enableHover, "data-sticky": props.stickyHeaders, "data-responsive": props.responsive, "data-order": this.state.order, "data-order-by": this.state.orderBy },
            React.createElement("div", { ref: "table-holder", className: "table-holder" },
                props.stickyHeaders && state.head &&
                    React.createElement("div", { ref: "table-head", className: "table th " }, this.renderHead()),
                React.createElement("div", { ref: "table-body", className: "table tb " },
                    state.head && this.renderHead(),
                    React.createElement("div", { className: "table-body" }, data && data.map(function (row, i) {
                        return (React.createElement("div", { className: "row", key: i }, _(row).map(function (cell, e) {
                            return (React.createElement("div", { className: "cell", key: e }, _this.formatter(cell, e)));
                        }).value()));
                    }))))));
    };
    return Table;
}(React.Component));
exports.Table = Table;
if (window && document) {
    (function (yaReact, W, D) {
        yaReact.Table = Table;
    }(window.yaReact = window.yaReact || {}, window, document));
}


/***/ })
/******/ ]);
//# sourceMappingURL=Table.js.map