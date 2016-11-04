var _ = require('lodash');
var QuickAction = require('./quickAction');

class QuickActions {
    /**
     * @param initialState
     * @param actionsMap
     * @param options {
     *                      strict: false,
      *                     namespace: ''
     *                 }
     */
    constructor(initialState, actionsMap, options = {}) {

        this.initialState = ()=>initialState;

        this.reducers = {};
        this.actions = {};

        _.map(actionsMap, (action, actionName)=> {
            const quickAction = new QuickAction(actionName, action, options);
            const actionType = quickAction.getActionType();
            this.actions[actionType] = quickAction;
            this.reducers[actionType] = quickAction.toReducer();
        });

    }

    toReducer() {
        return (state = this.initialState(), action) => {
            const reducer = this.reducers[action.type];
            if (reducer) {
                return reducer(state, action);
            }

            return state;
        }
    }

    toActions() {
        return _.reduce(this.actions, (memo, quickAction)=> {
            memo[quickAction.actionName] = quickAction.toAction();
            return memo;
        }, {})
    }
}


module.exports = QuickActions;