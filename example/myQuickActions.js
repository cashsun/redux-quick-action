//example/myQuickActions.js
import QuickActions from 'redux-quick-action';

const initialState = {
   id: 'foo'
};

const actionMap = {
    /**
     * write your quick actions similar to the way you write reducers
     * i.e. a function takes state and ...(rest of params), returns a new state
     *
     * @param state previous state
     * @param username first param for the action to be generated
     * @param userid second param for the action to be generated
     * @returns {*} next state
     */
    setUser(state, username, userid) {
        return Object.assign({}, state, {
            username,
            userid
        })
    },

    /**
     * Your action might not take any param
     *
     * @param state
     * @returns {*} next state
     */
    startLoading(state) {
        return Object.assign({}, state, {
            isLoading: true
        })
    },

    /**
     * you can modify your state (not recommended) and reducer will throw exception when in strict mode,
     * @param state
     */
    finishLoading(state) {
        return Object.assign(state, {
            isLoading: false
        })
    }

};

//quick actions in strict mode
export default new QuickActions(initialState, actionMap, true);