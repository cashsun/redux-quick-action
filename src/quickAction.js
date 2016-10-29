var shortid = require('shortid');

class QuickAction {
    constructor(actionName, quickAction) {
        this.type = `${actionName}-${shortid.generate()}`;
        this.quickAction = quickAction;
        this.actionName = actionName;
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
            return this.quickAction.apply(this, [state].concat(action.payload));
        }
    }

}


module.exports = QuickAction;