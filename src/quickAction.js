var shortid = require('shortid');
var deepfreeze = require('deep-freeze');

class QuickAction {
    constructor(actionName, quickAction, options = {}) {

        const namespace = (options.namespace && options.namespace + '/') || '';
        this.type = `${namespace}${actionName}/${shortid.generate()}`;
        this.quickAction = quickAction;
        this.actionName = actionName;
        this.strictMode = options.strict;

    }

    getActionType() {
        return this.type
    }

    toAction() {
        return (...payload)=> {
            return {
                type: this.type,
                payload
            }

        }
    }

    toReducer() {
        return (state, action)=> {
            if (this.strictMode === true) {
                deepfreeze(state)
            }
            return this.quickAction.apply(this, [state].concat(action.payload));
        }
    }

}


module.exports = QuickAction;