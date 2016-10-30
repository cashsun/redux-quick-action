var shortid = require('shortid');
var deepfreeze = require('deep-freeze');

class QuickAction {
    constructor(actionName, quickAction, safeMode = false) {
        this.type = `${actionName}-${shortid.generate()}`;
        this.quickAction = quickAction;
        this.actionName = actionName;
        this.safeMode = safeMode;
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
            if(this.safeMode === true){
                deepfreeze(state)
            }
            return this.quickAction.apply(this, [state].concat(action.payload));
        }
    }

}


module.exports = QuickAction;