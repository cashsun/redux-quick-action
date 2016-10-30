# redux-quick-action
Redux action wrapper that hides reducer implementation details

Redux was designed in a very modular way, as a result developers are given full access to reducers and action types.  It could be fairly [tedious](https://github.com/reactjs/redux/blob/master/examples/todos-flow/src/types/index.js) to setup an action [flow](https://cdn-images-1.medium.com/max/800/1*rictDFcDHCvOacMUaWxZEQ.png). redux-quick-action helps abstract type strings, switch statements in reducers and many other implementation details away from you.

★ Action type strings ("LOG_IN", "SET_USER" etc.) are auto-generated and guaranteed unique (using [shortid](https://www.npmjs.com/package/shortid))

★ Write actions like the way you write reducers (see example below) and use them straight away

★ Build your aync actions on top of quick actions

**ATTENTION**: this module is essentially forcing a many(actions) to 1 (reducer) model, which is only a subset of what redux offers (many to many). The many to many model was by design to allow actions to cause "side effects" when different reducers handles same action event, which is in some cases what people want to avoid or use combo actions (see below) instead.

Nontheless, quickActions should be treated as the *smallest building blocks* for more complex actions and each only responsible for change on one state tree.

***a combo action that has side effects***
```javascript
import { action1, action2 } from 'quickActions1';
import { actionB } from 'quickActions2';

function doTwoThings(){
   action1();
   
   promise.then(()=>{
      action2();
   }).fail(actionB);
  
}

export { doTwoThings }

```


Install as an [npm module](https://www.npmjs.com/package/redux-quick-action)

```bash
npm i redux-quick-action -S
```

***API***
```javascript
import QuickActions from 'redux-quick-action';
const quickActions = new QuickActions(initialState, actionMap, isStrictMode = false);
```
> initialState: any. the initial state tree for the underlying reducer

> actionMap: map. see example below

> isStrictMode: bool. whether to throw exception when reducer modifies the current state. This is usually supposed to be covered by your unit tests, however why not have them built-in?


```javascript
quickActions.toActions();   
//returns redux simple actions i.e. ()=> {type: 'LOG_IN', payload}

quickActions.toReducer(); 
//returns redux reducer handles all the action types configured. 
//Default case returns current state, just like the default case in your reducer switch block.
```

***[example/myQuickActions.js](https://github.com/cashsun/redux-quick-action/blob/master/example/myQuickActions.js)***
```javascript
import QuickActions from 'redux-quick-action';

const initialState = {
   id: 'foo'
};

const actionMap = {
    /**
     * write your quick actions similar to the way you write reducers
     * i.e. a function takes state and ...(rest of params), returns a new state
     */
    setUser(state, username, userid) {
        return Object.assign({}, state, {
            username,
            userid
        })
    },

    /**
     * Your redux action might not take any param
     */
    startLoading(state) {
        return Object.assign({}, state, {
            isLoading: true
        })
    },

    /**
     * you can modify your state (not recommended) and reducer will throw exception when in strict mode,
     */
    finishLoading(state) {
        return Object.assign(state, {
            isLoading: false
        })
    }

};

//quick actions in strict mode
export default new QuickActions(initialState, actionMap, true);
```

***[example/myReducers.js](https://github.com/cashsun/redux-quick-action/blob/master/example/myReducers.js)***
```javascript
import myQuickActions from './myQuickActions';

//yes, that's it. no more reducers and actions types.
export default myQuickActions.toReducer();
```


***[example/myActions.js](https://github.com/cashsun/redux-quick-action/blob/master/example/myActions.js)***
```javascript
import myQuickActions from './myQuickActions';
import fetch from 'whatwg-fetch';

const { setUser, startLoading, finishLoading } = myQuickActions.toActions();

//writing more complex async actions using sync actions generated from your quick-actions.
function loadUser(userId) {
    startLoading(); //i.e. dispatch start loading redux event

    fetch(`/api/users/${userId}`)
        .then(response => {
            return response.json()
        })
        .then(user => {
            setUser(user.username, userId); //notice here you are using the generated actions, no need for state.
        })
        .finally(()=>{
            finishLoading(); //this will throw TypeError since we are in safe mode.
                            //change the quick action so that it does not modify the current state
        });
}

export {
    setUser,
    startLoading,
    finishLoading,
    loadUser
}
```

***[example/myStore.js](https://github.com/cashsun/redux-quick-action/blob/master/example/myStore.js)***
```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux';
import myReducers from './myReducers';


let myApp = combineReducers({
    user: myReducers,
    //article: articleReducers
    //...
});

export default createStore(myApp);
```
