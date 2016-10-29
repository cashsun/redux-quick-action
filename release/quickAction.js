'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var shortid = require('shortid');

var QuickAction = function () {
    function QuickAction(actionName, quickAction) {
        _classCallCheck(this, QuickAction);

        this.type = actionName + '-' + shortid.generate();
        this.quickAction = quickAction;
        this.actionName = actionName;
    }

    _createClass(QuickAction, [{
        key: 'getActionType',
        value: function getActionType() {
            return this.type;
        }
    }, {
        key: 'toAction',
        value: function toAction() {
            var _this = this;

            return function () {
                for (var _len = arguments.length, payload = Array(_len), _key = 0; _key < _len; _key++) {
                    payload[_key] = arguments[_key];
                }

                return {
                    type: _this.type,
                    payload: payload
                };
            };
        }
    }, {
        key: 'toReducer',
        value: function toReducer() {
            var _this2 = this;

            return function (state, action) {
                return _this2.quickAction.apply(_this2, [state].concat(action.payload));
            };
        }
    }]);

    return QuickAction;
}();

module.exports = QuickAction;