'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var QuickAction = require('./quickAction');

var QuickActions = function () {
    /**
     * @param initialState
     * @param actionsMap
     * @param options {
     *                      strict: false,
      *                     namespace: ''
     *                 }
     */
    function QuickActions(initialState, actionsMap) {
        var _this = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, QuickActions);

        this.initialState = function () {
            return initialState;
        };

        this.reducers = {};
        this.actions = {};

        _.map(actionsMap, function (action, actionName) {
            var quickAction = new QuickAction(actionName, action, options);
            var actionType = quickAction.getActionType();
            _this.actions[actionType] = quickAction;
            _this.reducers[actionType] = quickAction.toReducer();
        });
    }

    _createClass(QuickActions, [{
        key: 'toReducer',
        value: function toReducer() {
            var _this2 = this;

            return function () {
                var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.initialState();
                var action = arguments[1];

                var reducer = _this2.reducers[action.type];
                if (reducer) {
                    return reducer(state, action);
                }

                return state;
            };
        }
    }, {
        key: 'toActions',
        value: function toActions() {
            return _.reduce(this.actions, function (memo, quickAction) {
                memo[quickAction.actionName] = quickAction.toAction();
                return memo;
            }, {});
        }
    }]);

    return QuickActions;
}();

module.exports = QuickActions;